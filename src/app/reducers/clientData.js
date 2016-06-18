const initialDataStructure = {
  data: {
    "general": {
      "firstName": "",
      "lastName": "",
      "avatar": ""
    },
    "job": {
      "company": "",
      "title": ""
    },
    "contact": {
      "email": "",
      "phone": ""
    },
    "address": {
      "street": "",
      "city": "",
      "zipCode": "",
      "country": ""
    }
  },
  mapUrl: '',
}
import {
  CREATE_MAP_URL, CREATING_MAP_URL_ERROR
} from '../consts/clientData';

import {
  CHOOSE_CLIENT
} from '../consts/list';

export default function clientData(state = initialDataStructure, action) {
  switch (action.type) {
    case CHOOSE_CLIENT: {
      return Object.assign({}, state, {
        data: action.data
      });
    }
    case CREATE_MAP_URL: {
      return Object.assign({}, state, {
        mapUrl: action.url
      });
    }
    case CREATING_MAP_URL_ERROR: {
      return Object.assign({}, state, {
        url: null
      });
    }
    default: {
      return state;
    }
  }
}