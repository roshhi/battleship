import { createDiv, createPara, createSVG, createTextField,  createImage } from "../utils/utils.js";
import { show_loader,settingUserLocation,fetchWeatherDetails} from "../utils/weather-service.js";

import sunImg from "../assets/images/sun.png";

export default function hero() {

    const getContainer = document.querySelector(".container");
    const gethero = createDiv(getContainer,"hero");
    createDiv(gethero,"loader");


    const getheroContainer = createDiv(gethero,"hero-container");
    const getSearchBar = createDiv(getheroContainer,"search-bar");
    const getSearchedPlace = createTextField(getSearchBar,"search-textField","Enter city name ...");
    const getSearchButton = createSVG(getSearchBar,"magnify-glass","M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z");
    show_loader();
    const getWeatherDetailDiv = createDiv(getheroContainer,"weather-detail-div");
    createImage(getWeatherDetailDiv,sunImg,"weather-img");
    const getWeatherTemperature = createPara(getWeatherDetailDiv,"weather-temperature","18");
    getWeatherTemperature.innerHTML = "?" + "&deg;C";

    const getWeatherDayTime = createDiv(getheroContainer,"day-time");
    createPara(getWeatherDayTime,"day","Monday, ");
    createPara(getWeatherDayTime,"time","16:00");
    
    createDiv(getheroContainer,"hero-h-line");

    const getWeatherState = createDiv(getheroContainer,"weather-state");
    const getWeatherCondition = createDiv(getWeatherState,"weather-description")
    createSVG(getWeatherCondition,"weather-state-svg","M6.5 20Q4.22 20 2.61 18.43 1 16.85 1 14.58 1 12.63 2.17 11.1 3.35 9.57 5.25 9.15 5.88 6.85 7.75 5.43 9.63 4 12 4 14.93 4 16.96 6.04 19 8.07 19 11 20.73 11.2 21.86 12.5 23 13.78 23 15.5 23 17.38 21.69 18.69 20.38 20 18.5 20M6.5 18H18.5Q19.55 18 20.27 17.27 21 16.55 21 15.5 21 14.45 20.27 13.73 19.55 13 18.5 13H17V11Q17 8.93 15.54 7.46 14.08 6 12 6 9.93 6 8.46 7.46 7 8.93 7 11H6.5Q5.05 11 4.03 12.03 3 13.05 3 14.5 3 15.95 4.03 17 5.05 18 6.5 18M12 12Z");
    createPara(getWeatherCondition,"weather-condition-text","Mostly Cloudy");
    const getRainCondition = createDiv(getWeatherState,"rain-condition");
    createSVG(getRainCondition,"rain-state-svg", "M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z");
    createPara(getRainCondition,"rain-condition-text","Rain - 30%");

    const getheroLocation = createDiv(getheroContainer,"hero-location");
    const searchedLocation = createPara(getheroLocation,"weather-location","Pakistan");

    settingUserLocation();

    getSearchButton.addEventListener("click",()=>{
        show_loader();
        fetchWeatherDetails(getSearchedPlace.value);
        const place = getSearchedPlace.value.trim();
        const formattedPlace = place.charAt(0).toUpperCase() + place.slice(1).toLowerCase(); //Making 1st letter capital
        
        searchedLocation.innerHTML = formattedPlace;
    });
} 