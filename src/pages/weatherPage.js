import { API_BASE_URL,apiKey } from '../constans.js';
import { fetchSlowAndUnreliably } from '../util/fetchData.js';
// import { loadPage } from '../util/loadPage.js';
import { createWeatherView } from '../views/weatherView.js';
// import { createErrorPage } from './errorPage.js';

export function createWeatherPage(state) {
  const onWeatherDataRequested = (searchTerm) => {
    state = {...state,  city: searchTerm};
    update();
  };


  const weatherView = createWeatherView({onWeatherDataRequested});

  const update = async () => {
    try {
      // Update the View so that a loading indicator is shown while
      // data is being fetched.
      state = { ...state, error: null, loading: true, data: null };
      weatherView.update(state);

      const url = `${API_BASE_URL}/data/2.5/weather?q=${state.city}&appid=${apiKey}`;
      const { data, headers } = await fetchSlowAndUnreliably(url);

       
      // Update the View to hide the loading indicator and update the View
      // with the fetched data.
      state = {
        ...state,
        data: data,
        loading: false
      };
      weatherView.update(state);
    } catch (error) {
      //Update the state with the error information and load the Error Page
      state = { ...state, error, loading: false };
      weatherView.update(state);
    }
  };
  // Do an initial update of the page when the page is created.
  update();


  

  return weatherView;
}