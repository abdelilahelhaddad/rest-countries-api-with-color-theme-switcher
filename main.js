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

//Fetch all countries func

const countries = document.querySelector(".countries");

document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://restcountries.eu/rest/v2/all`)
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
          <h5>Population: <span>${data[i].population}</span></h5>
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
});