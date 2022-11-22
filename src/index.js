import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEL = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEL.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {
    if (inputEL.value.trim().length > 0) {
    //    console.log(inputEL.value.trim()); 
    //     console.log(inputEL.value.trim().length);
        
    fetchCountries(inputEL.value.trim()).then(data =>
     
        // console.log(data)
         renderCountries(data)
    );
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}

function renderCountries(countries) {
    // console.log(countries);
  let variable;
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 2) {
    variable = countries.map(
      country =>
        `<li><img src='${country.flags.svg}' width="40" > ${country.name.official}</li>`
    );
    countryList.innerHTML = variable.join('');
    countryInfo.innerHTML = '';
  } else if (countries.length === 1) {
    variable = countries.map(
      country =>
        `<h1><img src='${country.flags.svg}' width="40" > ${
          country.name.official
        }</h1><ul><li><b>Capital: </b>${country.capital.join(
          ', '
        )}</li><li><b>Population: </b>${
          country.population
        }</li><li><b>Languages: </b>${Object.values(country.languages).join(
          ', '
        )}</li></ul>`
    );
    countryInfo.innerHTML = variable.join('');
    countryList.innerHTML = '';
  }
}










