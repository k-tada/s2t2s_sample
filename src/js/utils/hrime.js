import { startSynthesis } from '../actions/synthesis';
import {
  TEXT_CHANGE,
  HRIME_UTTERANCE
} from '../constants';

export function getEvents( dispatch ) {
  return {
    'utterance': ( data ) => {
      var text = JSON.parse(data.value).value;
      dispatch({ type: HRIME_UTTERANCE });
      dispatch({ type: TEXT_CHANGE, text: text });
      dispatch(startSynthesis());
    },
    'confirm-date': ( data ) => {
      var text = JSON.parse(data.value).value;
      var text = 'This is custom event to confirm date';
      dispatch({ type: HRIME_UTTERANCE });
      dispatch({ type: TEXT_CHANGE, text: text });
      dispatch(startSynthesis());
    },
    'commit-date': ( data ) => {
      var text = 'This is custom event to commit date';
      dispatch({ type: HRIME_UTTERANCE });
      dispatch({ type: TEXT_CHANGE, text: text });
      dispatch(startSynthesis());
    }
  };
}
