import consts from '../constants';
// import { TEXT_CHANGE } from '../constants';

export function changeText ( txt ) {
  return {
    type: consts.TEXT_CHANGE,
    text: txt
  };
}
