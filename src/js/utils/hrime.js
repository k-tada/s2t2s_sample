import { startSynthesis } from '../actions/synthesis';
import {
  TEXT_CHANGE,
  HRIME_UTTERANCE,
  RESERVATION_CHANGE
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
      var date = moment( JSON.parse( data.value ).value, 'YYYYMMDD' ).format('MM/DD');
      var text = "Are you sure you 'll checkout at " + date;
      dispatch({ type: RESERVATION_CHANGE, info: { date: { value: date, fixed: false }}});
      dispatch({ type: HRIME_UTTERANCE });
      dispatch({ type: TEXT_CHANGE, text: text });
      dispatch(startSynthesis());
    },
    'commit-date': ( data ) => {
      var date = moment( JSON.parse( data.value ).value, 'YYYYMMDD' ).format('MM/DD');
      var text = "I confirm that you 'll checkout at " + date;
      dispatch({ type: RESERVATION_CHANGE, info: { date: { value: date, fixed: true }}});
      dispatch({ type: HRIME_UTTERANCE });
      dispatch({ type: TEXT_CHANGE, text: text });
      dispatch(startSynthesis());
    }
  };
}
