// https://api.openweathermap.org/data/2.5/uvi?appid=f2108749a11a4f9345d24d12d4e09457&lat=44.34&lon=10.99

// define a function to get our data from the api in 4 stages, taking string cityName as an arg
function getCityWeather(cityName) {

    // call api to get today's weather using input city name, and save lat and lon from that response

    // call api to get current uv index using lat and lon from previous request

    // call api to get 5 day forecast

    // return an object containing all that data

}  

// define a function to fill page with data from api, taking an object containg api data as an arg
function fillPage(weatherData) {

    // fill today's weather section with data from api

    // get the group of 5 day forcast sections to loop through

    // for each of them, get the matching data from the api and fill them

}

// define a function that takes a city name and then calls both our api request function and then our page fill function inside of it
function displayCityWeather(cityName) {

    let weatherData = getCityWeather(cityName);
    fillPage(weatherData);

}

// define function to add a city to localStorage
function addCity(cityName) {
    
    // add the searched city to savedCities in localstorage

}

// prefill our page with a default location of san diego
displayCityWeather("san diego");
// also add san diego as a default saved city and load cities from localstorage
addCity("san diego");
loadSavedCities();


// function to get all saved cities from local storage and display them on the page
function loadSavedCities() {

    // get saved cities from localstorage

    // loop through all of them 

        // create new button for each of them in saved-cities section, with a data-city attribute to keep track of the city name 

        // add event listeners to them; inside the callback, call the displayCityWeather function with the clicked city name as a param

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




