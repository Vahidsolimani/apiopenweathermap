const apiKey = "9076978db0a2106f5f023d21bb872e6e";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".inp");
const searchBtn = document.querySelector(".btn");

const weatherImg = document.querySelector(".weather-img");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".location-not-found").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".timezone").innerHTML = data.timezone + " : timezone";
    document.querySelector(".name").innerHTML = data.name + " : city";
    document.querySelector(".feels_like").innerHTML = data.main.feels_like + " : feels_like";
    document.querySelector(".temp_min").innerHTML = data.main.temp_min + " : temp-min";
    document.querySelector(".temp_max").innerHTML = data.main.temp_max + " : temp-max";
    document.querySelector(".description").innerHTML = data.weather[0].description + " : description ";

    // img selection
    if (data.weather[0].main === "Mist") {
      weatherImg.src = "img/mist.png";
    } else if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (data.weather[0].main === "Clouds") {
      weatherImg.src = "img/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/clear.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherImg.src = "img/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".location-not-found").style.display = "none";
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Display Tehran weather as default
window.onload = () => {
  checkWeather("Tehran");
};
