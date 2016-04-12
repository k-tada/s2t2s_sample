import { combineReduces } from 'redux';
import recognition from './recognition';
import synthesis from './synthesis';

export default combineReduces({
  recognition,
  synthesis
});

