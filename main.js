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
        countryEL.innerHTML = `
        <div class="countryImage">
          <img src="${data[i].flag}" alt="">
        </div>
        <div class="countryInfos">
          <h4>${data[i].name}</h4>
          <h5>Population: <span>${commafy(data[i].population)}</span></h5>
          <h5>Region: <span>${data[i].region}</span></h5>
          <h5>Capital: <span>${data[i].capital}</span></h5>
        </div>
        `;
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
  countries.innerHTML = "";
  let region = e.target.getAttribute('data-region');
  console.log(region);
  fetchCountries(`https://restcountries.eu/rest/v2/region/${region}`);
});