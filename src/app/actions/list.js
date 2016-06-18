import {
  GET_CLIENT_LIST,
  GETING_LOADING,
  GETING_CLIENT_LIST_ERROR,
  CHOOSE_CLIENT,
  SEARCH_CLIENT_BY
} from '../consts/list';

import { read } from '../helpers/fetch/';

export const getList = () => async dispatch => {
  dispatch({
    type: GETING_LOADING,
    flag: true
  });

  let url = '/clients.json';
  const response = await read(url);

  // Paste some id to each client
  let list = (await response.json()).map(client => Object.assign({}, client, {
    id: Math.round(Math.random() * 100000)
  }));

  if (response.ok) {
    dispatch({
      type: GET_CLIENT_LIST,
      list
    })
    dispatch({
      type: GETING_LOADING,
      flag: false
    });
  } else {
    dispatch({
      type: GETING_LOADING,
      flag: false
    });
    dispatch({
      type: GETING_CLIENT_LIST_ERROR
    });
  }
}

export const chooseClient = client => ({
  type: CHOOSE_CLIENT,
  client
});