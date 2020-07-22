let locationKey, searchLocation, searchLocationCountry;
const apiKey = 'Ufs32bf0WathXSbMJGU1qV9kBL6EMR9u';

let targetLocation = document.querySelector('#search-box').value;
let searchButton = document.querySelector('#search-button ');

searchButton.addEventListener('click', () => {
  if (targetLocation === '') {
    alert('Please enter a location');
  } else {
    getLocationData(targetLocation);
  }
});

// function using the location entered in the search box to retrieve weather info from accuweather api
function getLocationData(searchValue) {
  let locationData = fetch(
    `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}`
  );

  locationData
    .then((response) => response.json())
    .then((data) => {
      locationKey = data[0].Key;
      searchLocationCountry = data[0].Country.ID;
    })
    .catch((err) => {
      console.log(err);
    });
}

function get5DayWeather(cityKey) {}
