const filterByCountries = document.querySelector(".filterByCountries");
const filterRegionItems = document.querySelector(".filterRegionItems");

filterByCountries.addEventListener("click", () => {
  filterRegionItems.classList.toggle("show");
})