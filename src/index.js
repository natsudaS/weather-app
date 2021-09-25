
// default heading
let h1 = document.querySelector("h1");
let default_h1 = `This could be your City`;
h1.innerHTML = `${default_h1}`;

// default temperature span#temp
let tempOut = document.querySelector("#temp");
let default_tempOut = `...`;
tempOut.innerHTML = `${default_tempOut}`;

// getting date and time from system
function formatDate(now){
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  };
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  };
  
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekday = weekdays[now.getDay()];
  let months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `${weekday}, ${month} ${date}, ${year}  ${hour}:${minute}`;
}

//search engine
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city");
  let apiKey = "fd7614cc0bb56f0cedd6c8fc03304aad";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
  h1.innerHTML = `${inputCity.value}`;
  axios.get(apiURL).then(showTemp);
}

// get current location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fd7614cc0bb56f0cedd6c8fc03304aad";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  h1.innerHTML = `Your current location`;
  axios.get(apiURL).then(showTemp);
}

//call current location and show weather
function showCurrentLoca(event) {
  navigator.geolocation.getCurrentPosition(handlePosition)
};

// get temperature from system
function showTemp(response) {
  let curTemp = (response.data.main.temp);
  let celsiusTemp = Math.round(curTemp);
  console.log(celsiusTemp);
  let fahrenheitTemp = Math.round((curTemp * 9) / 5 + 32);
  console.log(fahrenheitTemp);
  tempOut.innerHTML = `${celsiusTemp} °C`;
};

/* convert to Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((curTemp * 9) / 5 + 32);
  tempOut.innerHTML = `${fahrenheitTemp}`;
} */

/* convert to Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = Math.round(curTemp);
  tempOut.innerHTML = `${celsiusTemp}`;
} */

// Show time and date
let currentDate = document.querySelector("#date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

// Start search engine
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

/* change to Fahreneit
let fahrenheitBtn = document.querySelector("#fahrenheit");
fahrenheitBtn.addEventListener("click", convertToFahrenheit);*/

/* change to Celsius
let celsiusBtn = document.querySelector("#celsius");
celsiusBtn.addEventListener("click", convertToCelsius);*/

// show weather for current location
let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", showCurrentLoca);