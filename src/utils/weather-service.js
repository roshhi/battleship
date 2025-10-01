import sunImg from "../assets/images/sun.png";
import moonImg from "../assets/images/moon.png";
import rainImg from "../assets/images/rain.png";
import dayCloudyImg from "../assets/images/dayCloudy.png";
import nightCloudyImg from "../assets/images/nightCloudy.png";
import fogImg from "../assets/images/fog.png";
import drizzleImg from "../assets/images/drizzle.png";
import snowImg from "../assets/images/snow.png";
import thunderImg from "../assets/images/thunder.png";
import { showMain } from "../components/main";


// Function to get the current user location (City name) as he visits our website
export async function settingUserLocation(){
    try {
        const weatherLocation = document.querySelector(".weather-location");
        const city = await getUserCoordinates();  // wait for city
        weatherLocation.textContent = city;       // update the <p> text
        fetchWeatherDetails(city);
    } catch (err) {
        console.error("Could not get location:", err);
    }
}

// Getting the user lattitutde and longitutde using geolocation api.
export async function getUserCoordinates(){
    return new Promise((resolve,reject) =>{
        navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const city = await getCityName(lat, lon);
              resolve(city);
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    const randomCity = getRandomCity();
                    resolve(randomCity);
                  } else if (error.code === error.POSITION_UNAVAILABLE) {
                    console.log("Location unavailable");
                  } else if (error.code === error.TIMEOUT) {
                    console.log("Location request timed out");
                  }
            }
        );
    })    
}

// Using BigDataCloud Reverse Geocoding API to find out the user address by passing lattitude and longitude to it we got from geolocation api.
export async function getCityName(lat, lon) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || data.principalSubdivision;
    }   
    catch (err) {
        console.error("Error getting city name:", err);
    }
}

export async function fetchWeatherDetails(searchedPlace){
    const apiKey = "dfb949c1826ce300ce6e8219ec997c53";
    const weatherLocation = document.querySelector(".weather-location");

    weatherLocation.textContent = searchedPlace; 
    setDayAndTimeByCity(searchedPlace,apiKey);
    let response = '';
    try {
          response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchedPlace}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          const randomCity = getRandomCity();
          const errorData = await response.json();
          alert("City not found:", errorData.message);
          fetchWeatherDetails(randomCity);
          console.log("City not found:", errorData.message); 
          return;
        }      
    } catch (error) {
        // Fetch itself failed (network error, bad URL, etc.)
        console.error("Fetch failed:", error);
    }


    const weatherData = await response.json();
    const nowUTC = Math.floor(Date.now() / 1000);
    const localTime = nowUTC + weatherData.timezone;
    const sunriseLocal = weatherData.sys.sunrise + weatherData.timezone;
    const sunsetLocal  = weatherData.sys.sunset + weatherData.timezone;

    let { lat, lon } = weatherData.coord;
    let temperature = weatherData.main.temp;

    let weatherDesc = weatherData.weather[0].main;
    let time;
    setWeatherDesc(weatherDesc);

    if (localTime >= sunriseLocal && localTime < sunsetLocal) {
        time = "day";
        setWeatherImage("day", weatherDesc);
        applyWeatherTheme(1);
    } else {
        time = "night"
        setWeatherImage("night", weatherDesc);
    }

    temperature = Math.floor(temperature);
    setWeatherTemp(temperature);

    const forecast = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,visibility,uv_index,wind_speed_10m&daily=weathercode,sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,uv_index_clear_sky_max&timezone=auto`
      );
    const forecastData = await forecast.json();
 
    let getWeeklyWeatherCodes = forecastData.daily.weathercode;
    setWeeklyWeatherImages(getWeeklyWeatherCodes);

    let getWeeklyWeatherMaxTemp = forecastData.daily.temperature_2m_max;
    let getWeeklyWeatherMinTemp = forecastData.daily.temperature_2m_min;
    setWeeklyWeather_max_min_Temperature(getWeeklyWeatherMaxTemp,getWeeklyWeatherMinTemp);

    const rainChances = forecastData.daily.precipitation_probability_max[0];
    setRainChances(rainChances);

    const getUvIndex = forecastData.daily.uv_index_max[0];
    setUvIndex(getUvIndex);

    const getWindSpeed = weatherData.wind.speed;
    const getWindDir = weatherData.wind.deg;
    setWindSpeedDir(getWindSpeed,getWindDir);

    const getSunrise = weatherData.sys.sunrise;
    const getSunset = weatherData.sys.sunset;
    setSunriseSunset(getSunrise,getSunset);

    const getHumidity = weatherData.main.humidity;
    setHumidity(getHumidity);

    const getVisiblityValue = weatherData.visibility;
    setVisiblity(getVisiblityValue);

    const fetchAirQuality = await fetch (`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const airQualityResponse = await fetchAirQuality.json();
    const getAirQualityIndex= airQualityResponse.list[0].main.aqi;
    setAirQualityIndex(getAirQualityIndex);

    hide_loader();
    
    applyWeatherTheme(weatherDesc,time)

    showMain();

    console.log(weatherData);
    console.log(forecastData);
}

// Function to set the day and time based on the city name
export async function setDayAndTimeByCity(cityName,openWeatherApiKey) {
    const getDayDiv = document.querySelector(".day");
    const getTimeDiv = document.querySelector(".time");
  
    const OPENWEATHER_KEY = openWeatherApiKey;
    const TIMEZONEDB_KEY = "UYKQACWK0X5K";
  
    try {
      // Step 1 — Get latitude and longitude from city name
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPENWEATHER_KEY}`
      );
      const geoData = await geoRes.json();
      console.log(geoData.length);
      if (!geoData.length) throw new Error("City not found");
      const { lat, lon } = geoData[0];
  
      // Step 2 — Get timezone info from TimezoneDB
      const timeRes = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONEDB_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
      );
      const timeData = await timeRes.json();
  
      if (timeData.status !== "OK") throw new Error(timeData.message);
  
      const localDate = new Date(timeData.formatted);
      const day = localDate.toLocaleDateString("en-US", { weekday: "long" });
      const time = localDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });

      getNextSevenDays(day);

      getDayDiv.textContent = day + ",";
      getTimeDiv.textContent = time;
    } catch (err) {
      console.error("Error getting day and time:", err);
    }
}
function setWeatherTemp(weatherTemp){
    const getWeatherTempcDiv = document.querySelector(".weather-temperature");
    getWeatherTempcDiv.innerHTML = `${weatherTemp}&deg;C`;
    
}
function setWeatherDesc(weatherDesc){
    const getWeatherDescDiv = document.querySelector(".weather-condition-text");
    getWeatherDescDiv.textContent = weatherDesc;
}
function setRainChances(rainChance){
    const getRainChancesDiv = document.querySelector(".rain-condition-text");
    getRainChancesDiv.textContent = "Rain - "+rainChance+"%";
}

// This function shows the loader and hide the weather details
export function show_loader(){
    const getheroContainer = document.querySelector(".hero-container");
    const getLoader = document.querySelector(".loader");

    getheroContainer.classList.add("hide");
    getLoader.classList.add("show");
}

// This function hides the loader and show the weather details
function hide_loader(){
    const getheroContainer = document.querySelector(".hero-container");
    const getLoader = document.querySelector(".loader");

    getheroContainer.classList.remove("hide");
    getLoader.classList.remove("show");
}

// This function set the weather image on the basis of time and weather description
export function setWeatherImage(day_night, weatherDesc) {
    const getWeatherImg = document.querySelector(".weather-img");

    if (day_night === "day" && weatherDesc === "Clear") {
        getWeatherImg.src = sunImg;
    } else if (day_night === "night" && weatherDesc === "Clear") {
        getWeatherImg.src = moonImg;
    } else if (day_night === "day" && weatherDesc === "Clouds") {
        getWeatherImg.src = dayCloudyImg;
    } else if (day_night === "night" && weatherDesc === "Clouds") {
        getWeatherImg.src = nightCloudyImg;
    }else if (weatherDesc === "Rain") {
        getWeatherImg.src = rainImg;
    }else if (weatherDesc === "Fog") {
        getWeatherImg.src = fogImg;
    }else if (weatherDesc === "Snow") {
        getWeatherImg.src = snowImg;
    }
}


// This function sets the weekly weather cards images on the basis of the weather code array it gets from open meteo api.
export function setWeeklyWeatherImages(weather_codes_array){

    const getAllWeekCards = document.querySelectorAll(".weather-card");
    let count = 0;
    let code;

    getAllWeekCards.forEach(card => {
        const getCardImg = card.querySelector(".week-weather-img");
        code = weather_codes_array[count];

        if (code <= 2) {
            getCardImg.src = sunImg; // Clear sky
        } 
        else if (code > 2 && code <= 3) {
            getCardImg.src = dayCloudyImg; // Mainly clear, partly cloudy, overcast
        } 
        else if (code === 45 || code === 48) {
            getCardImg.src = fogImg; // Fog, rime fog
        } 
        else if (code === 51 || code === 53 || code === 55) {
            getCardImg.src = drizzleImg; // Drizzle
        } 
        else if (code === 56 || code === 57) {
            getCardImg.src = drizzleImg; // Freezing drizzle
        } 
        else if (code === 61 || code === 63 || code === 65) {
            getCardImg.src = rainImg; // Rain
        } 
        else if (code === 66 || code === 67) {
            getCardImg.src = rainImg; // Freezing rain
        } 
        else if (code === 71 || code === 73 || code === 75) {
            getCardImg.src = snowImg; // Snow fall
        } 
        else if (code === 77) {
            getCardImg.src = snowImg; // Snow grains
        } 
        else if (code >= 80 && code <= 82) {
            getCardImg.src = rainImg; // Rain showers
        } 
        else if (code === 85 || code === 86) {
            getCardImg.src = snowImg; // Snow showers
        } 
        else if (code === 95) {
            getCardImg.src = thunderImg; // Thunderstorm
        } 
        else if (code === 96 || code === 99) {
            getCardImg.src = thunderImg; // Thunderstorm w/ hail
        } 
        else {
            getCardImg.src = defaultImg; // fallback (unused codes)
        }
        count++;
    });

}
function setWeeklyWeather_max_min_Temperature(getWeeklyWeatherMaxTemp,getWeeklyWeatherMinTemp){
    const getAllWeekCards = document.querySelectorAll(".weather-card");
    let count = 0;
    let max_temp,min_temp;

    getAllWeekCards.forEach(card => {

        const getCardMaxTemp = card.querySelector(".max-temp");
        const getCardMinTemp = card.querySelector(".min-temp");
        max_temp = Math.floor(getWeeklyWeatherMaxTemp[count]);
        min_temp = Math.floor(getWeeklyWeatherMinTemp[count]);
        
        getCardMaxTemp.innerHTML = `${max_temp}&deg;C`;
        getCardMinTemp.innerHTML = `${min_temp}&deg;C`;
        count++;
    });
}

function getNextSevenDays(today) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // find today's index
    let startIndex = daysOfWeek.indexOf(today);
    
    // build the next 7 days
    let nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
        nextSevenDays.push(daysOfWeek[(startIndex + i) % 7]);
    }

    const getAllWeekCards = document.querySelectorAll(".weather-card");
    let count = 0;

    getAllWeekCards.forEach(card => {

        const getWeekDayName = card.querySelector(".week-day-name");
        getWeekDayName.textContent = nextSevenDays[count];
        count++;
    });
}

function setUvIndex(uvIndex){
    const getHumidityValue = document.querySelector(".uv-value");
    const progressArc = document.getElementById("c1");
    const progressNeedle = document.getElementById("l1");
    const minAngle = 15; //Progress bar will be at the start
    const maxAngle = 180; //Progress bar will be full
    const angle = minAngle + ((uvIndex - 1) / (12 - 1)) * (maxAngle - minAngle);

    getHumidityValue.textContent = uvIndex;
    progressArc.setAttribute("transform", `rotate(${angle} 50 50)`);
    progressNeedle.setAttribute("transform", `translate(50 50) rotate(${angle})`);
}

function setWindSpeedDir(windSpeed,deg){
    const getWindSpeedValue = document.querySelector(".wind-speed-value");
    const getWindDirValue = document.querySelector(".wind-direction-value");
    const directions = [
        "N", "NNE", "NE", "ENE", 
        "E", "ESE", "SE", "SSE", 
        "S", "SSW", "SW", "WSW", 
        "W", "WNW", "NW", "NNW"
    ];
    
    windSpeed = Math.floor(3.6 * windSpeed);
    getWindSpeedValue.textContent = windSpeed;

    const index = Math.round(deg / 22.5) % 16;
    getWindDirValue.textContent = directions[index];
}
function setSunriseSunset(sunriseTime,sunsetTime){

    const getSunriseDiv = document.querySelector(".sunrise-value");
    const getSunsetDiv = document.querySelector(".sunset-value");

    let sunrise = new Date(sunriseTime * 1000);
    let sunset = new Date(sunsetTime * 1000);

    sunrise = sunrise.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    getSunriseDiv.textContent = sunrise;

    sunset = sunset.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
    getSunsetDiv.textContent = sunset;
}
function setHumidity(humidityValue){

    const getHumValueDiv = document.querySelector(".humidity-text");
    const getHumStatusDiv = document.querySelector(".humidity-status");
    const circle = document.querySelector(".humidity-bar-circle");

    const minTop = 65;  // lowest
    const maxTop = 10;  // highest
    const top = minTop - (humidityValue / 100) * (minTop - maxTop);
    circle.style.top = top + "%";

    getHumValueDiv.textContent = humidityValue + "%";
    
    if (humidityValue < 30) {
        getHumStatusDiv.textContent = "Low";
    } 
    else if (humidityValue >= 30 && humidityValue <= 60) {
        getHumStatusDiv.textContent = "Normal";
    } 
    else {
        getHumStatusDiv.textContent = "High";
    }
}

function setVisiblity(value){
    const getVisiblityValueDiv = document.querySelector(".visiblity-value");
    const visibilityPercentage = ((Math.min((value / 10000) * 100, 100))).toFixed(1);
    const getVisiblityStatusDiv = document.querySelector(".visiblity-status");
    getVisiblityValueDiv.textContent = visibilityPercentage + "%";

    if (visibilityPercentage >= 80) {
        getVisiblityStatusDiv.textContent = "Excellent";
    } else if (visibilityPercentage >= 60) {
        getVisiblityStatusDiv.textContent = "Good";
    } else if (visibilityPercentage >= 40) {
        getVisiblityStatusDiv.textContent = "Moderate";
    } else if (visibilityPercentage >= 20) {
        getVisiblityStatusDiv.textContent = "Poor";
    } else {
        getVisiblityStatusDiv.textContent = "Very poor";
    }
}

function setAirQualityIndex(aqi){
    const getAirQualityValueDiv = document.querySelector(".air-quality-text");
    const getAirQualityStatusDiv = document.querySelector(".air-quality-status");
    const circle = document.querySelector(".air-quality-bar-circle");

    getAirQualityValueDiv.textContent = aqi;

    if(aqi==1){
        circle.style.top = "10%";
    }else if(aqi>4){
        circle.style.top = "65%";
    }else if(aqi==1){
        circle.style.top = "65%";
    }else if(aqi==3){
        circle.style.top = "55%";
    }else if(aqi==2){
        circle.style.top = "25%";
    }

    switch (aqi) {
        case 1: 
        getAirQualityStatusDiv.textContent = "Good";
        break;
        case 2: 
        getAirQualityStatusDiv.textContent = "Fair";
        break;
        case 3: 
        getAirQualityStatusDiv.textContent = "Moderate";
        break;
        case 4: 
        getAirQualityStatusDiv.textContent = "Poor";
        break;
        case 5: 
        getAirQualityStatusDiv.textContent = "Very Poor";
        break;
        default: 
        getAirQualityStatusDiv.textContent = "Unknown";
    }
}

function applyWeatherTheme(weatherDesc,day_night){
    const gethero = document.querySelector(".hero");

    if (day_night === "day" && weatherDesc === "Clear") {
        gethero.classList.remove("night-theme");
        gethero.classList.remove("rain-theme");
        gethero.classList.remove("clouds-theme");
        gethero.classList.remove("snow-theme");

        gethero.classList.add("clear-theme");
    }
    if (day_night === "night" && weatherDesc === "Clear") {
        gethero.classList.remove("rain-theme");
        gethero.classList.remove("clouds-theme");
        gethero.classList.remove("clear-theme");
        gethero.classList.remove("snow-theme");

        gethero.classList.add("night-theme");
    }
    else if (weatherDesc === "Clouds") {
        gethero.classList.remove("clear-theme");
        gethero.classList.remove("rain-theme");
        gethero.classList.remove("night-theme");
        gethero.classList.remove("snow-theme");

        gethero.classList.add("clouds-theme");
    }
    else if (weatherDesc === "Rain") {
        gethero.classList.remove("clear-theme");
        gethero.classList.remove("clouds-theme");
        gethero.classList.remove("night-theme");
        gethero.classList.remove("snow-theme");

        gethero.classList.add("rain-theme");
    }
    else if (weatherDesc === "Snow") {
        gethero.classList.remove("clear-theme");
        gethero.classList.remove("clouds-theme");
        gethero.classList.remove("night-theme");
        gethero.classList.remove("rain-theme");

        gethero.classList.add("snow-theme");

    }
}

function getRandomCity() {
    const fallbackCities = [
        "Tokyo",
        "New York",
        "Paris",
        "Sydney",
        "London",
        "Toronto",
        "Dubai",
        "Berlin",
        "Rome",
        "Cape Town"
      ];      
    const randomIndex = Math.floor(Math.random() * fallbackCities.length);
    return fallbackCities[randomIndex];
}