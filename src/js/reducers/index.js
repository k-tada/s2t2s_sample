import { combineReducers } from 'redux';
import recognition from './recognition';
import synthesis from './synthesis';
import text from './text';
import api from './api';
import status from './status';
import hrime from './hrime';

const reducers =  combineReducers({
  recognition,
  synthesis,
  text,
  api,
  status,
  hrime
});

export default reducers;

