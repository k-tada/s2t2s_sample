import { API_SELECT, APIS } from '../constants';

function initState () {
  return {
    RECOGNITION: APIS.RECOGNITION.WEB_SPEECH_API,
    SYNTHESIS: APIS.SYNTHESIS.WEB_SPEECH_API
  };
}

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case API_SELECT:
      return Object.assign({}, state, {
        [ action.to ]: action.api
      });
    default:
      return state;
  }
};
