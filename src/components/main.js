import { createDiv, createPara, createSVG, createImage } from "../utils/utils.js";
import sunImg from "../assets/images/sun.png";

export default function main() {

    const getContainer = document.querySelector(".container");
    const getMain = createDiv(getContainer,"main");
    
    hideMain(); // Hiding the main in the start as data is being fetched from server

    const getSearchButton = document.querySelector(".magnify-glass");
    getSearchButton.addEventListener("click",()=>{
        hideMain();
    })

    // Creating weekly forecast div
        const getWeekTitleDiv = createDiv(getMain,"week-title-div");
        createPara(getWeekTitleDiv,"week-title","Weekly Update");
        createDiv(getWeekTitleDiv,"week-h-line");

        const getWeekForecastDiv = createDiv(getMain,"week-forecast-container");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
        createWeekWeatherCard(getWeekForecastDiv,"Today",sunImg,"18","2");
    // ----------------

    // Creating today's highlight div
        const getTodayHighlightsDiv = createDiv(getMain,"today-highlight-div");
        createPara(getTodayHighlightsDiv,"today-highlight-title","Today's Highlight");
        createDiv(getTodayHighlightsDiv,"today-highlight-h-line");
        const getDailyHighlightsDiv = createDiv(getMain,"daily-highlights-div");

        // Creating Uv index div
            const getUvIndexDiv = createDiv(getDailyHighlightsDiv,"uv-index");
            createPara(getUvIndexDiv,"uv-title","UV Index");
            const getUvGuage = createDiv(getUvIndexDiv,"uv-gauge");
            getUvGuage.innerHTML = 
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" width="90%">
                                <linearGradient id="gradient"> <stop offset="0%" stop-color="#B8F1C6" /> 
                                    <stop offset="100%" stop-color="#EBF8A1"/> 
                                </linearGradient>
                                <circle cx="50" cy="50" r="43" fill="none" stroke="gray" stroke-width="2" stroke-dasharray="190" pathLength="360" transform="rotate(180 50 50)"/>
                                <circle id="c1" cx="50" cy="50" r="43" fill="none" stroke="url(#gradient)" stroke-width="8" stroke-dasharray="180" pathLength="360" transform="rotate(180 50 50)"/>
                                <line id="l1" x1="-36" y1="0" x2="-50" y2="0" stroke="black" stroke-width="1" transform="translate(50 50) rotate(180)" />
                                <text x="20" y="180%" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="12">0</text>
                                <text x="77" y="180%" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="12">12</text>
                            </svg>`
            createPara(getUvGuage,"uv-value","5");
        // ----------------


        // Creating Wind Status div
            const getWindStatusDiv = createDiv(getDailyHighlightsDiv,"wind-status");
            createPara(getWindStatusDiv,"highlights-title","Wind Status");
            const getDivWindSpeed = createDiv(getWindStatusDiv,"wind-speed");
            createPara(getDivWindSpeed,"wind-speed-value","5");
            createPara(getDivWindSpeed,"wind-speed-unit","km/h");
            const getDivWindDir = createDiv(getWindStatusDiv,"wind-direction");
            createSVG(getDivWindDir,"wind-direction-svg","M14,14.5V12H10V15H8V11A1,1 0 0,1 9,10H14V7.5L17.5,11M21.71,11.29L12.71,2.29H12.7C12.31,1.9 11.68,1.9 11.29,2.29L2.29,11.29C1.9,11.68 1.9,12.32 2.29,12.71L11.29,21.71C11.68,22.09 12.31,22.1 12.71,21.71L21.71,12.71C22.1,12.32 22.1,11.68 21.71,11.29Z");
            createPara(getDivWindDir,"wind-direction-value","NW");
        // -----------------


        // Creating Sunrise-Sunset div
            const getSunriseSunsetDiv = createDiv(getDailyHighlightsDiv,"sunrise-sunset-div");
            createPara(getSunriseSunsetDiv,"highlights-title","Sunrise & Sunset");

            const getSunriseDiv = createDiv(getSunriseSunsetDiv,"sunrise");
            createSVG(getSunriseDiv,"sunrise-svg","M13,18V10L16.5,13.5L17.92,12.08L12,6.16L6.08,12.08L7.5,13.5L11,10V18H13M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z");
            createPara(getSunriseDiv,"sunrise-value","4:30 am");

            const getSunsetDiv = createDiv(getSunriseSunsetDiv,"sunset");
            createSVG(getSunsetDiv,"sunrise-svg","M11,6V14L7.5,10.5L6.08,11.92L12,17.84L17.92,11.92L16.5,10.5L13,14V6H11M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22Z");
            createPara(getSunsetDiv,"sunset-value","6:30 pm");
        // -----------------


        // Creating Humidity div
            const getHumidityDiv = createDiv(getDailyHighlightsDiv,"humidity-div");
            createPara(getHumidityDiv,"highlights-title","Humidity");
            const getDivHumidityValue = createDiv(getHumidityDiv,"humidity-value-div");
            createPara(getDivHumidityValue,"humidity-text","12%");
            const getDivHumidityBar = createDiv(getDivHumidityValue,"humidity-bar");
            createDiv(getDivHumidityBar,"humidity-bar-circle");
            createPara(getHumidityDiv,"humidity-status","Normal");
        // -----------------


        // Creating Visiblity div
            const getVisiblityDiv = createDiv(getDailyHighlightsDiv,"visiblity-div");
            createPara(getVisiblityDiv,"highlights-title","Visiblity");
            createPara(getVisiblityDiv,"visiblity-value","10%");
            createPara(getVisiblityDiv,"visiblity-status","Normal")
        // -----------------


        // Creating Air Quality div
            const getAirQualityDiv = createDiv(getDailyHighlightsDiv,"air-quality-div");
            createPara(getAirQualityDiv,"highlights-title","Air Quality");
            const getDivAirQualityValue = createDiv(getAirQualityDiv,"air-quality-value-div");
            createPara(getDivAirQualityValue,"air-quality-text","102");
            const getDivAirQualityBar = createDiv(getDivAirQualityValue,"air-quality-bar");
            createDiv(getDivAirQualityBar,"air-quality-bar-circle");
            createPara(getAirQualityDiv,"air-quality-status","Unhealthy");
        // -----------------
    
    // -----------------------------------
}

// Function to create Weather cards for weekly updates
function createWeekWeatherCard(appendTo,weekDay,weatherImg,maxTemp,minTemp){
    const getWeatherCard = createDiv(appendTo,"weather-card");
    createPara(getWeatherCard,"week-day-name",weekDay);
    createImage(getWeatherCard,weatherImg,"week-weather-img");

    const getWeekTempDiv = createDiv(getWeatherCard,"week-temp");
    createPara(getWeekTempDiv,"max-temp",maxTemp);
    createPara(getWeekTempDiv,"min-temp",minTemp);
}

// Function to hide main
export function hideMain(){
    const getMain = document.querySelector(".main");
    getMain.style.display = "none";
}

// Function to show main
export function showMain(){
    const getMain = document.querySelector(".main");
    getMain.style.display = "flex";
}