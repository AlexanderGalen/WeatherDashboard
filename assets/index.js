// https://api.openweathermap.org/data/2.5/uvi?appid=f2108749a11a4f9345d24d12d4e09457&lat=44.34&lon=10.99
const apiKey = "f2108749a11a4f9345d24d12d4e09457"

// define a function to get our data from the api in 4 stages, taking string cityName as an arg
async function getCityWeather(cityName) {

    let weatherAndForecastData = {
        cityName: cityName,
    };

    const baseURL = "https://api.openweathermap.org/data/2.5/";
    const iconBaseURL = "http://openweathermap.org/img/w/";

    // call api to get today's weather using input city name, and save lat and lon from that response
    let weatherResponse = await fetch(`${baseURL}weather?q=${cityName}&appid=${apiKey}&units=imperial`);
    let weatherData = await weatherResponse.json();
    let coords = weatherData.coord;

    // add whatever data we need to the object we're going to return from this function for later use
    weatherAndForecastData.date = moment.unix(weatherData.dt).format("M/D/YYYY");
    weatherAndForecastData.iconURL = `${iconBaseURL}${weatherData.weather[0].icon}.png`;
    weatherAndForecastData.temp = weatherData.main.temp;
    weatherAndForecastData.windspeed = weatherData.wind.speed;
    weatherAndForecastData.humidity = weatherData.main.humidity;
    
    // call api to get current uv index using lat and lon from previous request
    let uviResponse = await fetch(`${baseURL}uvi?appid=f2108749a11a4f9345d24d12d4e09457&lat=${coords.lat}&lon=${coords.lon}`);
    let uviData = await uviResponse.json();

    // add uv info to output object
    weatherAndForecastData.uvi = uviData.value;

    // call api to get 5 day forecast
    let forecastResponse = await fetch(`${baseURL}forecast?q=${cityName}&appid=${apiKey}&units=imperial&cnt=5`);
    let forecastData = await forecastResponse.json();

    let forecastArray = forecastData.list;

    // loop through array of data for 5 day forecast, storing each data we care about in a separate array element in our output object

    weatherAndForecastData.forecast = [];
    for (let i = 0; i < forecastArray.length; i++) {
        let dayForecast = forecastArray[i];
        console.log("day forecast")
        console.log(dayForecast);
        let outputDayForecast = {
            date : moment.unix(dayForecast.dt).format("M/D/YYYY"),
            iconURL : `${iconBaseURL}${dayForecast.weather[0].icon}.png`,
            temp : dayForecast.main.temp,
            windspeed : dayForecast.wind.speed,
            humidity : dayForecast.main.humidity,
        }
        console.log("formatted date");
        console.log(outputDayForecast.date);
        
        weatherAndForecastData.forecast.push(outputDayForecast);
        
    }

    // return our filled weather and forecast data object
    return weatherAndForecastData;

}  

// define a function to fill page with data from api, taking an object containg api data as an arg
function fillPage(weatherAndForecastData) {

    console.log(weatherAndForecastData)

    // fill today's weather section with data from api
    let cityNameEl = document.querySelector("#city-name");
    let currentDateEl = document.querySelector("#current-date");
    let currentIconEl = document.querySelector("#current-weather-icon");
    let currentWindEl = document.querySelector("#current-windspeed");
    let currentHumidityEl = document.querySelector("#current-humidity");
    let uvIndexEl = document.querySelector("#uv-index");

    cityNameEl.textContent = weatherAndForecastData.cityName;
    currentDateEl.textContent = weatherAndForecastData.date;
    currentIconEl.setAttribute("src", weatherAndForecastData.iconURL);
    currentWindEl.textContent = weatherAndForecastData.windspeed;
    currentHumidityEl.textContent = weatherAndForecastData.humidity;
    uvIndexEl.textContent = weatherAndForecastData.uvi;
    
    // get the group of 5 day forcast sections to loop through
    let forecastArray = weatherAndForecastData.forecast;

    for (let i = 0; i < forecastArray.length; i++) {
        let dayForecast = forecastArray[i];

        // get corresponding elements for each of these forecast days
        let forecastDateEl = document.querySelector(`#day-${i+1}-date`);
        let forecastIconEl = document.querySelector(`#day-${i+1}-weather-icon`);
        let forecastTempEl = document.querySelector(`#day-${i+1}-temp`);
        let forecastWindspeedEl = document.querySelector(`#day-${i+1}-windspeed`);
        let forecastHumidityEl = document.querySelector(`#day-${i+1}-humidity`);

        console.log(dayForecast);

        // update them to use data from forecastArray

        forecastDateEl.textContent = dayForecast.date;
        forecastIconEl.setAttribute("src", dayForecast.iconURL);
        forecastTempEl.textContent = dayForecast.temp;
        forecastWindspeedEl.textContent = dayForecast.windspeed;
        forecastHumidityEl.textContent = dayForecast.humidity;

        
        
    }

    // for each of them, get the matching data from the api and fill them

}

// define a function that takes a city name and then calls both our api request function and then our page fill function inside of it
async function displayCityWeather(cityName) {

    let weatherAndForecastData = await getCityWeather(cityName);
    fillPage(weatherAndForecastData);

}

// define function to add a city to localStorage
function addCity(cityName) {
    
    // first get existing savedCities so we don't overwrite them
    let savedCities = localStorage.getItem("savedCities") || [];
    // add searched city to the array
    savedCities.push(cityName);
    // save new array in localstorage
    localStorage.setItem("savedCities", savedCities);

}

// prefill our page with a default location of san diego
displayCityWeather("San Diego");
// also add san diego as a default saved city and load cities from localstorage
// addCity("san diego");
// loadSavedCities();


// function to get all saved cities from local storage and display them on the page
function loadSavedCities() {

    let savedCitiesEl = document.getElementById("saved-cities");

    // get saved cities from localstorage
    let savedCities = localStorage.getItem("savedCities") || [];
    // loop through all of them 
    for (let i = 0; i < savedCities.length; i++) {
        let city = savedCities[i];
        
        // create new button for each of them in saved-cities section, with a data-city attribute to keep track of the city name 
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "btn");
        newButton.setAttribute("class", "btn-secondary");
        newButton.setAttribute("data-city", city);
        newButton.textContent = city;

        savedCitiesEl.appendChild(newButton);
        // add event listeners to them; inside the callback, call the displayCityWeather function with the clicked city name as a param
        
    }
}

// search city functionality

// get search button
// get search field

    // add event listener to search button

        // in event listener callback

            // store value of the search text field as cityName
            
            // call our addCity function with cityName to add it to localStorage

            // call the loadSavedCities again to refresh the list to include the city we just added
            
            // call the displayCityWeather function with the city we just added to update the page to use the weather data for that city




