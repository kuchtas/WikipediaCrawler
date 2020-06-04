"use strict"        // TODO - if not in wikipedia -> error | if no links -> error | if no input -> error

const submit = document.getElementById('submit');
submit.addEventListener('click', async (event) => {
    const start = document.getElementById('initialSubmition').value;
    const search = await fetch(`/search/word/${start}`)
        .catch(error => console.log(error));
    const searchJSON = await search.json();
    console.log(searchJSON);

    const keys = Object.keys(searchJSON.query.pages);
    let key = keys.splice(Math.floor(Math.random() * keys.length), 1);
    console.log(key);
    while (typeof searchJSON.query.pages[key].extract === 'undefined') {
        key = keys.splice(Math.floor(Math.random() * keys.length), 1);
        if (keys.length === 0) {
            console.log('No extracts'); // TODO smth when crawling finally is adedd
            return;
        }
    }
    const title = searchJSON.query.pages[key].title;
    const extract = searchJSON.query.pages[key].extract;

    const root = document.createElement('div');
    const articleTitle = document.createElement('h4');
    const articleExtract = document.createElement('p');

    articleTitle.textContent = title;
    articleExtract.textContent = extract;

    root.append(articleTitle, articleExtract);
    document.body.appendChild(root);

})
