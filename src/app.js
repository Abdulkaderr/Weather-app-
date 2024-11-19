import { createWeatherPage } from './pages/weatherPage.js';
import { loadPage } from './util/loadPage.js';

function loadApp() {
  const state = {
    city: "Amsterdam",
    error: null,
    loading: false,
    data: null
    
  };
  loadPage(createWeatherPage, state);
}

window.addEventListener('load', loadApp);