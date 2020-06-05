"use strict"        // TODO - if not in wikipedia -> error | if no links -> error | if no input -> error
let header = new Headers({ 'Api-User-Agent': 'WebCrawlerBOT3000/0.0 (email@gmail.com)', "User-Agent": "WebCrawlerBOT3000/0.0 (email@gmail.com)" })

const submit = document.getElementById('submit');
submit.addEventListener('click', async (event) => {
    let word = document.getElementById('initialSubmition').value;
    word = word.split(" ").join("_");
    const howDeep = document.getElementById('howDeep').value || 2;

    const search = await fetch(`/search/word/${word}`, {
        method: 'GET',
        headers: header
    }).catch(error => console.log(error));
    const searchJSON = await search.json();

    let key = getKey(searchJSON.query.pages);

    addtoPage(searchJSON.query.pages[key]);

    for (let i = 0; i < howDeep; i++) {
        const links = await fetch(`/links/key/${key}`, {
            method: 'GET',
            headers: header
        }).catch(error => console.log(error));
        const linksJSON = await links.json();

        const keys = Object.keys(linksJSON.query.pages);
        do {
            key = keys[Math.floor(Math.random() * keys.length)];
        } while (key < 0)

        const search = await fetch(`/search/id/${key}`, {
            method: 'GET',
            headers: header
        }).catch(error => console.log(error));
        const searchJSON = await search.json();
        console.log(searchJSON);
        addtoPage(searchJSON.query.pages[key]);
    }
})

function addtoPage(page) {
    const root = document.createElement('div');
    const articleTitle = document.createElement('h4');
    const articleExtract = document.createElement('p');

    articleTitle.textContent = page.title;
    articleExtract.textContent = page.extract;

    root.append(articleTitle, articleExtract);
    document.body.appendChild(root);
}

function getKey(pages) {
    const keys = Object.keys(pages);
    let key = keys.splice(Math.floor(Math.random() * keys.length), 1);
    while (typeof pages[key].extract === 'undefined') {
        key = keys.splice(Math.floor(Math.random() * keys.length), 1);
        if (keys.length === 0) {
            console.log('No extracts'); // TODO 
            return;
        }
    }
    return key;
}