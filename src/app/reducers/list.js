import {
  GET_CLIENT_LIST,
  GETING_LOADING,
  GETING_CLIENT_LIST_ERROR,
  CHOOSE_CLIENT,
  RESET_CHOOSED_CLIENT,
  SEARCH_CLIENT_BY,
  RESET_SEARCH,
  MAKE_FOCUSED
} from '../consts/list';

import { combineReducers } from 'redux';

const initialListData = {
  data: {
    all: [],
    searchData: [],
    searchQuery: ''
  },
  view: {
    loading: false,
    loadingError: false,
    choosedClient: null,
    focused: null,
  }
}

function searchIn(array, query) {
  let copyOfArray = array.map(item => {
    let copyOfItem = JSON.parse(JSON.stringify(item));
    delete copyOfItem.general.avatar;
    return copyOfItem;
  });
  
  let arrayAfterSearch = copyOfArray.map((item, index) => {
    let includingQuery = null;
    let inField = null;

    Object.keys(item).forEach(keyLevelOne => {
      if (!includingQuery) {
        Object.keys(item[keyLevelOne]).forEach(keyLevelTwo => {
          if (!includingQuery) {
            let input = item[keyLevelOne][keyLevelTwo];
            if (keyLevelTwo === 'firstName') {
              input = item[keyLevelOne].firstName + " " + item[keyLevelOne].lastName;
              // console.log(input);
              includingQuery = input.toLowerCase().match(query.toLowerCase());
            } else {
              includingQuery = input.toLowerCase().match(query.toLowerCase());
            }
            inField = keyLevelTwo;
          }
        });
      }
    });

    return Object.assign({}, item, {
      general: Object.assign({}, item.general, {
        avatar: array[index].general.avatar
      }),
      includingQuery,
      inField
    });
  });

  return arrayAfterSearch.filter(item => item.includingQuery !== null);
}

function data(state = initialListData.data, action) {
  switch (action.type) {
    case GET_CLIENT_LIST: {
      return Object.assign({}, state, {
        all: state.all.concat(action.list)
      });
    }
    case SEARCH_CLIENT_BY: {
      return Object.assign({}, state, {
        searchData: searchIn(state.all, action.query),
        searchQuery: action.query
      });
    }
    case RESET_SEARCH: {
      return Object.assign({}, state, {
        searchData: [],
        searchQuery: ''
      })
    }
    default: {
      return state;
    }
  }
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
        choosedClient: action.client.id,
        focused: action.client.id
      });
    }
    case RESET_CHOOSED_CLIENT: {
      return Object.assign({}, state, {
        choosedClient: null
      });
    }
    case MAKE_FOCUSED: {
      return Object.assign({}, state, {
        focused: action.id
      });
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  data,
  view
});