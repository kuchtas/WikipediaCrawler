"use strict"
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
app.use(express.static('public'));
app.use(express.json());

app.get('/search/word/:word', async (request, response) => { // proxy to avoid CORS
    const word = request.params.word;
    const wikipediaURL = `https://en.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpssearch=${word}&prop=extracts&exintro=1&explaintext=1&redirects=1&format=json&gpslimit=30`;
    const search = await fetch(wikipediaURL);
    if (search.status >= 200 && search.status <= 299) {
        console.log(wikipediaURL);
        const searchJSON = await search.json();
        response.json(searchJSON);
    } else {
        console.log(search.status, search.statusText);
    }
});