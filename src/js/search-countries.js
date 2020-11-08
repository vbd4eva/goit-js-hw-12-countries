// modules
import debounce from 'lodash.debounce';

import localStorageAPI from './local-storage.js';
import { options, alert } from './pnotify.js';
import fetchCountries from './fetchCountries.js'

//templates
import countriesListHtmlTpl from '../templates/countries-list.hbs';
import singleCountryTpl from '../templates/single-country.hbs';




//start
const refs = {
    search: document.querySelector('.find-country__search'),
    result: document.querySelector('.find-country__result'),    
}


refs.search.value = localStorageAPI.load('searchQuery');

refs.search.addEventListener('input', debounce((e) => { onSearch(refs.search.value) }, 500));
refs.search.closest('form').addEventListener('submit', (e) => {
    e.preventDefault();
    onSearch(refs.search.value);
});

function onSearch(searchQuery) {

    if (!searchQuery) return; 
    
    fetchCountries(searchQuery)
        .then(responseHeandler)
        .catch(error => {
            const alertTitle = `Country: "${refs.search.value}", - is not founded`;
            alert({...options,  title: alertTitle });
            console.log('CATH - Ошибка выполнения запроса' + error);
        });
    
    localStorageAPI.save('searchQuery', searchQuery);
}

function responseHeandler(response, overSize = 10) {
    console.dir(response);
    // console.dir(response);
    if (!response.length) { 
        refs.result.innerHTML = "";
        const alertTitle = `Country: "${refs.search.value}", - is not founded`;
        alert({...options,  title: alertTitle });
        console.log('Страна не найдена!');
        return;
    }

    //Если бекенд вернул массив с одной страной, в интерфейсе рендерится разметка с данными о стране: название, столица, население, языки и флаг.
    if (1 === response.length) {
        renderSingle(response);
        return;
    }

    //'больше 10ти = Если бекенд вернул больше чем 10 стран подошедших под критерий введенный пользователем, в интерфейсе отображается нотификация о том, что необходимо сделать запрос более специфичным. Для оповещений используй плагин pnotify(https://github.com/sciactive/pnotify).'
    if (overSize < response.length) {
        // console.log('больше 10ти = Если бекенд вернул больше чем 10 стран подошедших под критерий введенный пользователем, в интерфейсе отображается нотификация о том, что необходимо сделать запрос более специфичным. Для оповещений используй плагин pnotify(https://github.com/sciactive/pnotify).');
        renderAlert(response);
        return;
    }


    //Если бекенд вернул от 2-х до 10-х стран, под инпутом отображается список имен найденных стран.   
    renderList(response);

}

//
function renderList(response) {
    // console.log("Если бекенд вернул от 2-х до 10-х стран, под инпутом отображается список имен найденных стран.");
    // console.table(response);

    refs.result.innerHTML = countriesListHtmlTpl(response);
    refs.result.addEventListener('click', clickOnList);
}
function clickOnList(e) {

    if (!e.target.classList.contains('js-renderList-click')) return;
    const searchQuery = e.target.innerText;
    refs.search.value = e.target.innerText
    onSearch(searchQuery);
    refs.result.removeEventListener('click', clickOnList);
}
// 

//
function renderSingle(response) {
    console.log('Если бекенд вернул массив с одной страной!\n в интерфейсе рендерится разметка с данными о стране: название, столица, население, языки и флаг.');
    console.table(response);
    refs.result.innerHTML = singleCountryTpl(response[0]);
}
//

function renderAlert(response) {
    const newOptions = {
        title: "Please enter a more specific query!",
        text: `By "${refs.search.value}" is ${response.length} matches founded`
    };
    refs.result.innerHTML = "";
    alert({...options,  ...newOptions });
            
    console.log(response.length);
    console.log('больше 10ти = Если бекенд вернул больше чем 10 стран подошедших под критерий введенный пользователем, в интерфейсе отображается нотификация о том, что необходимо сделать запрос более специфичным. Для оповещений используй плагин pnotify(https://github.com/sciactive/pnotify).');

}






// class RenderHtmml(){ 
//     constructor({ alert, list, single }){
//         this.refs.alert = alert;
//         this.refs.list = list;
//         this.refs.single = single;
//      }
// }

// const renderHtml = new RenderHtmml();