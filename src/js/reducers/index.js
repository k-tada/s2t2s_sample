import { combineReducers } from 'redux';
import recognition from './recognition';
import synthesis from './synthesis';
import text from './text';
import status from './status';
import hrime from './hrime';

const reducers =  combineReducers({
  recognition,
  synthesis,
  text,
  status,
  hrime
});

export default reducers;

