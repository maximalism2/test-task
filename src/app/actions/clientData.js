import {
  CREATE_MAP_URL, CREATING_MAP_URL_ERROR
} from '../consts/clientData';

import {
  coordinatesAPI, staticMapAPI, testAppKey
} from '../helpers/googleAPIs/';

function replaceSpaces(string, symbol = '+') {
  return string.replace(/\ /g, symbol);
}

export const createMapUrl = (street, city, country) => /*async dispatch => */{
  let query = `${replaceSpaces(street)},${replaceSpaces(city)},${replaceSpaces(country)}`;
  console.log('query', query);
}