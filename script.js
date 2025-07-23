const apiKey = "0fd5d1d3b7e8e43d41b67f5239d8e906";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

async function updateWeather(city) {
  let resposne = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (resposne.status == 404) {
    document.querySelector(".error").style.display = "flex";
    document.querySelector(".details").style.display = "none";
    document.querySelector(".other-details").style.display = "none";
  } else {
    var data = await resposne.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "cloudy.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "storm_1375404.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "sun.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "snowing_692454.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".details").style.display = "flex";
    document.querySelector(".other-details").style.display = "flex";
  }
}
searchBtn.addEventListener("click", () => {
  updateWeather(searchBox.value);
  searchBox.value = "";
});
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    updateWeather(searchBox.value);
    searchBox.value = "";
  }
});
