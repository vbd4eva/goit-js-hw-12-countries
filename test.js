console.log('index.js');

let name = 'eesti';


const inputEl = document.querySelector('[name="search-country"]');

// console.log(inputEl);

inputEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.country.value;    
    fetchCountries(searchQuery);
});


function fetchCountries(searchQuery){ 
    const responce = fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
    responce.then(responce => responce.json()).then(data=>console.table(data));
}

