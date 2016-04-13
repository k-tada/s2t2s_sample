import consts from '../constants';
// import { API_SELECT, APIS } from '../constants';

function initState () {
  return {
    RECOGNITION: consts.APIS.RECOGNITION.WEB_SPEECH_API,
    SYNTHESIS: consts.APIS.SYNTHESIS.WEB_SPEECH_API
  };
}

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case consts.API_SELECT:
      return Object.assign({}, state, {
        [ action.to ]: action.api
      });
    default:
      return state;
  }
};
