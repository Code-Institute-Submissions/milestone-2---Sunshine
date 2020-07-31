let locationKey, searchLocation, searchLocationCountry;
const apiKey = 'IYZf2eTw9XH3uBNLkfINMWL3DycoMsYx';
let searchButton = document.querySelector('#search-button ');
let landingContainer = document.querySelector('#landing');

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
    `https://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchValue}`
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
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true&details=true`
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
  let ctaContainer = document.querySelector('.cta');
  let graphicContainer = document.querySelector('#graphic-container');
  let fullDetail = document.createElement('div');
  let fiveDay = document.createElement('div');
  let landingContainer = document.querySelector('#landing');
  // let weatherHeadline = weatherData.Headline;
  let weatherArray = weatherData.DailyForecasts;
  // let headlineDate = dayjs(weatherHeadline.EffectiveDate).format('D MMM YYYY');

  graphicContainer.style.display = 'none';
  ctaContainer.style.display = 'none';

  landingContainer.appendChild(fiveDay);
  fiveDay.classList.add('five-day');

  // console.log(weatherHeadline);
  // let headlineContent = `<h2>Headline for ${headlineDate}</h2><div class='headline-text'>${weatherHeadline.Text}</div>`;
  // headline.innerHTML = headlineContent;

  weatherArray.forEach((e) => {
    let {
      Date,
      Temperature,
      Temperature: { Minimum, Maximum },
      Day,
      Night,
    } = e;
    let daily = document.createElement('div');
    daily.classList.add('weather-item');
    let date = dayjs(e.Date).format('dddd D/M/YYYY');

    fiveDay.appendChild(daily);
    daily.innerHTML = `<div class="date">${date}</div>
            <div class="icon-description">
              <img src="/assets/img/icons/${Day.Icon}-s.png" alt="" class="icon" /><span class="description"
                >${Day.IconPhrase}</span
              >
            </div>
            <div class="precipitation"><h3>Precipitation</h3><p>${Day.PrecipitationIntensity} ${Day.PrecipitationType}</p></div>
            <div class="temp"><h3>Temperature</h3><p>Max: ${Maximum.Value}&#8451; Min: ${Minimum.Value}&#8451;</p></div>
            <button class="full-weather">More details</button>`;

    let moreDetails = daily.querySelector('.full-weather');
    moreDetails.addEventListener('click', () => {
      displayFull(e);
    });
  });
}

function displayFull(weatherObj) {
  console.log(weatherObj);
  let {
    Date,
    Temperature,
    Temperature: { Minimum, Maximum },
    Day,
    Night,
    Sun,
    Moon,
    HoursOfSun,
  } = weatherObj;
  let date = dayjs(weatherObj.Date).format('dddd D/M/YYYY');
  let fullDetail = document.createElement('div');
  landingContainer.prepend(fullDetail);
  fullDetail.classList.add('headline');

  fullDetail.innerHTML = `<div class="date">${date}</div>
            <div class="icon-description">
              <img src="/assets/img/icons/${
                Day.Icon
              }-s.png" alt="" class="icon" /><span class="description"
                >${Day.IconPhrase}</span
              >
            </div>
            <div class="precipitation"><h3>Precipitation</h3><p>${
              Day.PrecipitationIntensity
            } ${Day.PrecipitationType}</p></div>
            <div class="temp"><h3>Temperature</h3><p>Max: ${
              Maximum.Value
            }&#8451; Min: ${Minimum.Value}&#8451;</p></div>
            <div><h3>Sun</h3><div>Hours of Sun: ${HoursOfSun}</div><div>Sunrise: ${dayjs(
    Sun.Rise
  ).format('HH:mm')} Sunset: ${dayjs(Sun.Set).format(
    'HH:mm'
  )}</div></div><div></div><div></div><div></div>`;
}
