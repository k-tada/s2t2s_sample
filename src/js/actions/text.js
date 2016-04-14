import { TEXT_CHANGE } from '../constants';

export function changeText ( txt ) {
  return {
    type: TEXT_CHANGE,
    text: txt
  };
}
