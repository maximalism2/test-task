import {
  GET_CLIENT_LIST,
  GETING_LOADING,
  GETING_CLIENT_LIST_ERROR,
  CHOOSE_CLIENT,
  SEARCH_CLIENT_BY
} from '../consts/list';

import { combineReducers } from 'redux';

const initialListData = {
  data: [],
  search: {
    data: [],
    query: ''
  },
  view: {
    loading: false,
    loadingError: false,
    choosedClient: null
  }
}

function data(state = initialListData.data, action) {
  switch (action.type) {
    case GET_CLIENT_LIST: {
      return state.concat(action.list);
    }
    default: {
      return state;
    }
  }
}

function search(state = initialListData.search, action) {
  return state;
}

function view(state = initialListData.view, action) {
  switch (action.type) {
    case GETING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    case GETING_CLIENT_LIST_ERROR: {
      return Object.assign({}, state, {
        error: true
      });
    }
    case CHOOSE_CLIENT: {
      return Object.assign({}, state, {
        choosedClient: action.client.id
      });
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  data,
  search,
  view
});