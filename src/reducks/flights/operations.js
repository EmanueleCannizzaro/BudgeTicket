import { searchFlightsAction } from './actions';
// import { db } from '../../firebase/';
import { push } from 'connected-react-router';
import sample  from './sample.json';

// let apiKey = '';
// db.collection('/keys').doc('skyscanner').get().then((doc) => {
//   apiKey = doc.data().key;
// });

export const searchFlights = ({
  originAirport,
  destinationAirport,
  currency,
  departDate,
  returnDate,
  showError,
}) => {
  return (dispatch) => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_DEV_RAPID_API_KEY,
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
      },
    };

    const params = {
      "adults": 1,
      "origin": originAirport,
      "destination": destinationAirport,
      "departureDate": departDate,
      "returnDate": returnDate,
      "currency": currency,
    };

    const query = new URLSearchParams(params);

    fetch(`https://skyscanner44.p.rapidapi.com/search-extended?${query}`, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.itineraries.results.length === 0) {
          showError('Could not find result. Please try with different airport or date.');
          return false;
        }
        dispatch(push('/search'));
        dispatch(searchFlightsAction(data.itineraries.results));
      })
      .catch((error) => {
        console.log(error);
        showError('Failed to get results. Please try again later.');
      });

    // dispatch(push('/search'));
    // dispatch(searchFlightsAction(sample));
  };
};
