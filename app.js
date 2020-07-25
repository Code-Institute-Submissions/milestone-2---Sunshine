let locationKey, searchLocation, searchLocationCountry;
// let Headline, DailyForecasts;
const apiKey = 'IYZf2eTw9XH3uBNLkfINMWL3DycoMsYx';

let searchButton = document.querySelector('#search-button ');

searchButton.addEventListener('click', () => {
  let targetLocation = document.querySelector('#search-box').value;
  console.log(targetLocation);
  if (targetLocation != '') {
    getLocationData(targetLocation);
  } else {
    alert('Please enter a location');
  }
});

// function using the location entered in the search box to retrieve the location key
function getLocationData(searchValue) {
  let locationData = fetch(
    `http://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}`
  );

  locationData
    .then((response) => response.json())
    .then((data) => {
      locationKey = data[0].Key;
      searchLocationCountry = data[0].Country.ID;
      get5DayWeather(locationKey);
    })
    .catch((err) => {
      console.log(err);
    });
}

// uses the location key retrieved in the getLocationData function to send a request to the api for the 5 day weather report
function get5DayWeather(cityKey) {
  let fiveDayData = fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`
  );

  fiveDayData
    .then((response) => response.json())
    .then((data) => {
      display5DayWeatherData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function display5DayWeatherData(weatherData) {
  console.log(weatherData);
  document.querySelector('.cta').style.display = 'none';
  document.querySelector('#weather-img').style.display = 'none';
  let today = document.createElement('div');
  let landingContainer = document.querySelector('#landing');
  landingContainer.appendChild(today);
  today.classList.add('today');

  let weatherArray = weatherData.DailyForecasts;
  let weatherItem = ``;
}
