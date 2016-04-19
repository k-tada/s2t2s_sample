import { combineReducers } from 'redux';
import recognition from './recognition';
import synthesis from './synthesis';
import text from './text';
import status from './status';
import hrime from './hrime';
import reservation from './reservation';

const reducers =  combineReducers({
  recognition,
  synthesis,
  text,
  status,
  hrime,
  reservation
});

export default reducers;

