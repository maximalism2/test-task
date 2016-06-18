const initialDataStructure = {
  data: {
    "id": null,
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
  mapUrlError: false
}
import {
  CREATE_MAP_URL, CREATING_MAP_URL_ERROR
} from '../consts/clientData';

import {
  CHOOSE_CLIENT, RESET_CHOOSED_CLIENT
} from '../consts/list';

export default function clientData(state = initialDataStructure, action) {
  switch (action.type) {
    case CHOOSE_CLIENT: {
      return Object.assign({}, state, {
        data: action.client
      });
    }
    case RESET_CHOOSED_CLIENT: {
      return Object.assign({}, state, initialDataStructure);
    }
    case CREATE_MAP_URL: {
      return Object.assign({}, state, {
        mapUrl: action.url,
        mapUrlError: false
      });
    }
    case CREATING_MAP_URL_ERROR: {
      return Object.assign({}, state, {
        mapUrlError: true
      });
    }
    default: {
      return state;
    }
  }
}