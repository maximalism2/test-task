import {
  CREATE_MAP_URL, CREATING_MAP_URL_ERROR
} from '../consts/clientData';

import {
  coordinatesAPI, staticMapAPI, testAppKey
} from '../helpers/googleAPIs/';

import { read, readSimple } from '../helpers/fetch/';

function replaceSpaces(string, symbol = '+') {
  return string.replace(/\ /g, symbol);
}

export const createMapUrl = (street, city, country) => async dispatch => {
  let query = `${replaceSpaces(street)},+${replaceSpaces(city)},+${replaceSpaces(country)}`;
  let url = `${coordinatesAPI}?address=${query}`;
  const response = await readSimple(url);

  if (response.ok) {
    const responseResult = await response.json();
    if (responseResult.results.length) {
      // If google found out location set label
      let { results } = responseResult;
      let { lat, lng } = results[0].geometry.location;

      let urlToReturn = `${staticMapAPI}?center=${query}`
      + `&zoom=12&size=543x200&maptype=terrain`
      + `&markers=color:blue%7C${lat},${lng}`
      + `&key=${testAppKey}`;
      dispatch({
        type: CREATE_MAP_URL,
        url: urlToReturn
      });
    } else {
      // else, tell that it is unexisting place
      dispatch({
        type: CREATING_MAP_URL_ERROR,
      });
    }
  } else {
    dispatch({
      type: CREATING_MAP_URL_ERROR
    });
  }
}