import { combineReducers } from 'redux';
import clientData from './clientData';
import list from './list';

export default combineReducers({
  clientData,
  list
});