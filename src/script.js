function refreshWeather(response) {
  let temperatureElement = document.querySelector(
    "#weather-temperature-numerals"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class ="weather-icon" />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "37e9da10fet0ob8e3fe3769dc4fd8d70";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmitLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitLocation);

searchCity("London");

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function getForecast(city) {
  let apiKey = "37e9da10fet0ob8e3fe3769dc4fd8d70";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

getForecast("London");

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">Tues</div>
<img src ="${day.condition.icon_url}" class="weather-forecast-icon"/>
  <div class="weather-forecast-temperatures">
  <div class="weather-forecast-temperature">
  <strong>${Math.round(day.temperature.maximum)}º</strong>
  </div>
  <div class="weather-forecast-temperature">${Math.round(
    day.temperature.minimum
  )}º</div>
  </div>
  </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
