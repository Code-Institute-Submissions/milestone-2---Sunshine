let locationkey, searchLocation, searchLocationCountry;
const apiKey = 'Ufs32bf0WathXSbMJGU1qV9kBL6EMR9u';

let targetLocation = document.querySelector('#search-box').value;
let searchButton = document.querySelector('#search-button ');

searchButton.addEventListener('click', () => {
  if (targetLocation === '') {
    alert('Please enter a location');
  } else {
    getWeather(targetLocation);
  }
});

// function using the location entered in the search box to retrieve weather info from accuweather api
function getWeather(searchValue) {
  let locationData = fetch(
    `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}`
  );

  locationData
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
