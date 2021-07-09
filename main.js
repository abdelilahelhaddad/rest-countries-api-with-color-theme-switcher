//Theme switch button func

const themeSwitcher = document.querySelector(".themeSwitcher");
const navbar = document.querySelector(".navbar");
const homePage = document.querySelector(".homePage");

themeSwitcher.addEventListener("click", () => {
  navbar.classList.toggle("dark");
  homePage.classList.toggle("dark");
})

//Filter dropdown list func

const filterByCountries = document.querySelector(".filterByCountries");
const filterRegionItems = document.querySelector(".filterRegionItems");

filterByCountries.addEventListener("click", () => {
  filterRegionItems.classList.toggle("show");
})

/*===================
Fetch countries func
===================*/

const countries = document.querySelector(".countries");

//https://stackoverflow.com/questions/6784894/add-commas-or-spaces-to-group-every-three-digits

function commafy(num) {
  var str = num.toString().split(',');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join(',');
}

//Get data func

function fetchCountries(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const countryEL = document.createElement("div");
        countryEL.classList.add("country");
        countryEL.setAttribute("data-code", data[i].alpha3Code);
        countryEL.innerHTML = `
        <a href="detail.html">
        <div data-code="${data[i].alpha3Code}" class="countryImage">
          <img data-code="${data[i].alpha3Code}" src="${data[i].flag}" alt="">
        </div>
        <div data-code="${data[i].alpha3Code}" class="countryInfos">
          <h4 data-code="${data[i].alpha3Code}">${data[i].name}</h4>
          <h5 data-code="${data[i].alpha3Code}">Population: <span data-code="${data[i].alpha3Code}">${commafy(data[i].population)}</span></h5>
          <h5 data-code="${data[i].alpha3Code}">Region: <span data-code="${data[i].alpha3Code}">${data[i].region}</span></h5>
          <h5 data-code="${data[i].alpha3Code}">Capital: <span data-code="${data[i].alpha3Code}">${data[i].capital}</span></h5>
        </div>
        </a>
        `;
        //     
        countries.appendChild(countryEL);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

//Get all countries

document.addEventListener("DOMContentLoaded", () => {
  fetchCountries("https://restcountries.eu/rest/v2/all");
});

//Get countries based on region

filterRegionItems.addEventListener("click", (e) => {

  let region = e.target.getAttribute('data-region');
  fetchCountries(`https://restcountries.eu/rest/v2/region/${region}`);
});

//Search for a country

const searchInput = document.querySelector(".searchInput");

searchInput.addEventListener("keypress", (e) => {
  let searchInputValue = searchInput.value;
  if (e.key === 'Enter') {
    countries.innerHTML = "";
    fetchCountries(`https://restcountries.eu/rest/v2/name/${searchInputValue}`);
  }
});

searchInput.addEventListener("keyup", (e) => {
  let searchInputValue = searchInput.value;
  if (e.key === "Backspace" || e.key === "Delete" && searchInputValue.length === 0) {
    countries.innerHTML = "";
    fetchCountries("https://restcountries.eu/rest/v2/all");
  }
});

const allCountries = document.querySelector(".countries");
const country = document.querySelectorAll(".country");

function getCountryLanguages(languages) {
  let language = "";
  for (let i = 0; i < languages.length; i++) {
    language += languages[i].name + ", ";
  }
  language = language.slice(0, -2);
  return language
}

const countryDetails = document.querySelector(".countryDetails");

allCountries.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("country") || e.target.parentElement.parentElement.classList.contains("country") || e.target.parentElement.parentElement.parentElement.classList.contains("country") || e.target.classList.contains("country")) {
    const dataCode = e.target.getAttribute("data-code");
    //https://restcountries.eu/rest/v2/alpha/col

    fetch(`https://restcountries.eu/rest/v2/alpha/${dataCode}`)
      .then(response => response.json())
      .then(data => {
        const detailsEL = document.createElement("div");
        detailsEL.classList.add("detailCountry");
        detailsEL.innerHTML = `
          <div class="flag">
          <img src="${data.flag}" alt="">
        </div>
        <div class="details">
          <h2 class="countryName">${data.name}</h2>
          <div class="countryDetailsGroup">
            <div class="firstCountryDetails">
              <h5>Native Name: <span>${data.nativeName}</span></h5>
              <h5>Population: <span>${data.population}1</span></h5>
              <h5>Region: <span>${data.region}</span></h5>
              <h5>Sub Region: <span>${data.subregion}</span></h5>
              <h5>Capital: <span>${data.capital}</span></h5>
            </div>
            <div class="secondCountryDetails">
              <h5>Top Level Domain: <span>${data.topLevelDomain}</span></h5>
              <h5>Currencies: <span>${data.currencies[1]}</span></h5>
              <h5>Languages: <span>${getCountryLanguages(data.languages)}</span></h5>
            </div>
          </div>
          <div class="borderCountries">
            <h5>Border Countries: <span class="borderCountry">France</span><span
                class="borderCountry">Germany</span><span class="borderCountry">Netherlands</span></h5>
          </div>
        </div>
        `;
        countryDetails.appendChild(detailsEL);
      })
      .catch((err) => {
        console.log(err);
      })
  }
});