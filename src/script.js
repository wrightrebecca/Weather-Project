function refreshWeather(response) {
  let temperatureElement = document.querySelector(
    "#weather-temperature-numerals"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#location");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "37e9da10fet0ob8e3fe3769dc4fd8d70";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmitLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitLocation);
