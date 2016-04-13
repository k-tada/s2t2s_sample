import { combineReducers } from 'redux';
import recognition from './recognition';
import synthesis from './synthesis';
import text from './text';
import api from './api';

const reducers =  combineReducers({
  recognition,
  synthesis,
  text,
  api
});

export default reducers;

