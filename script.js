const apiKey = `7fd63ddde6d16bb3769e4d483716e57a`;

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.querySelector('.city-name');
const currentDate = document.querySelector('.current-date');
const weatherImg = document.querySelector('.weather-img[alt="weather-img"]');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');
const humidityT = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const notFound = document.querySelector('.not-found');
const weatherInformation = document.querySelector('.weather-information');
 searchBtn.addEventListener('click',()=>{
    if(searchInput.value != ""){
        weatherInformation.style.display = "block";
        notFound.style.display = "none";
        searchInput.value = searchInput.value.trim();
         fetchData(searchInput.value);

    }
});
searchInput.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter' && searchInput.value.trim() != ""){
        weatherInformation.style.display = "block";
        notFound.style.display = "none";
         fetchData(searchInput.value);

    }
});
async function fetchData(city){
 try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if(!(response.ok)){
    throw new Error(`HTTP error! Status: ${response.status}`);
     } const data = response.json();
    return getResponse(data);
 }catch(error){
renderError(error); }
 
}
async function getResponse(data){
        const weatherCity = await data;
    console.log(weatherCity);
    return getWeatherInfo(weatherCity);
}
function getWeatherInfo(weatherCity){
   const {
     name:city,
     main:{temp, humidity},
     weather:[{ main,icon}],
     wind:{speed}
    } = weatherCity
  const celsiusTemp = Math.round(transformTemperatureToCelsius(temp));
  const currentDay = today();

cityName.innerText = city;
temperature.innerText = celsiusTemp +" C";
humidityT.innerText = "humidity " + humidity + "%";
windSpeed.innerText = "Wind Speed " + speed +"M/s";
condition.innerHTML = main;
currentDate.innerText = currentDay;
weatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;    

}
 async function renderError(error){
    console.log(error);
    weatherInformation.style.display = "none";
    notFound.style.display = "block";
  



}

function transformTemperatureToCelsius(Kelvin ){
    const celsius = (Kelvin  - 273.15) ;
    return celsius;

}

function today(){
    const date = new Date();
    formatDate = Intl.DateTimeFormat('en-US',{
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    }).format(date);
    return formatDate;
    
}
window.addEventListener('load',fetchData(searchInput.value))