
export function createWeatherView(props){
const root = document.createElement('div');
root.classList.add("box-container","weather-root");


root.innerHTML = String.raw`
   <section class="search-section">
            <h1 class="title">Welcome To Live Weather</h1>
                <input type="text" placeholder="Enter name the city Ex: damascus" id="search-input" value="Amsterdam" >
            <button type="button" name="search-bn" id="search-btn">Search</button>
            
        </section>
        <section class="weather-information">
<h1 class="city-name"></h1>
<h2 class="current-date"></h2>

<img class="weather-img" src="public/assets/weather/clear.svg" alt="weather-img">
     <h2 class="temperature"></h2>
     <h3 class="condition"></h3>
<h3 class="humidity"></h3>  
     <h3 class="wind-speed"></h3>
</section>
<section class="not-found hide" >
<h1>The city you are looking for it's not exist</h1>
<img src="public\assets\message\search-city.png" alt="">
  
</section>
<div class='loading-screen hide'>
<div class=" loading-indicator ">
      <div class="spin">
        <i class="fa-solid fa-spinner fa-2xl"></i>
      </div>
    </div>
</div>



`
 const searchButton = root.querySelector("#search-btn");
const searchInput = root.querySelector("#search-input");
const loadingIndicator = root.getElementsByClassName("loading-screen")[0];

const temperature  = root.querySelector(".temperature");
const  humidityT = root.querySelector(".humidity");
const  windSpeed = root.querySelector(".wind-speed");
const  condition = root.querySelector(".condition");
const  currentDate = root.querySelector(".current-date");
const  weatherImg     = root.querySelector(".weather-img");
const cityName = root.querySelector(".city-name");

const notFound = root.querySelector('.not-found');
const weatherInformation = root.querySelector('.weather-information');


searchButton.addEventListener('click',(event)=> {
        if(searchInput.value != ""){
            searchInput.value = searchInput.value.trim();
            props.onWeatherDataRequested(searchInput.value);
        }
    });
searchInput.addEventListener('keydown',(event)=>{
        if(event.key == 'Enter' && searchInput.value.trim() != "")
            props.onWeatherDataRequested(searchInput.value);

});

function update(state){

if(state.loading){
    loadingIndicator.classList.remove('hide');
    return;
}

loadingIndicator.classList.add('hide');

if (state.error || !state.data) {
    notFound.classList.remove('hide');
    weatherInformation.classList.add('hide');
    return;
  }
  notFound.classList.add('hide');
  weatherInformation.classList.remove('hide');
  const {
    name:city,
    main:{temp, humidity},
    weather:[{ main,icon}],
    wind:{speed}
   } = state.data;

    const celsiusTemp = Math.round(transformTemperatureToCelsius(temp));
  const currentDay = today();

  temperature.innerText = celsiusTemp +" C";
  humidityT.innerText = "humidity " + humidity + "%";
  windSpeed.innerText = "Wind Speed " + speed +"M/s";
  condition.innerHTML = main;
  currentDate.innerText = currentDay;
  weatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;    
  cityName.innerText = city;
} 
return {root, update};
};


function transformTemperatureToCelsius(Kelvin ){
    const celsius = (Kelvin  - 273.15) ;
    return celsius;

}

function today(){
    const date = new Date();
  const  formatDate = Intl.DateTimeFormat('en-US',{
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    }).format(date);
    return formatDate;
    
}

