import {
  RECOGNITION_START,
  RECOGNITION_STOP,
  RECOGNITION_FINISH,
  APIS
} from '../constants';

const initializeWebSpeechApi = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja';
  return recognition;
};

const initState = () => {
  var recognition = {
    [APIS.RECOGNITION.WEB_SPEECH_API]: initializeWebSpeechApi()
  };

  return {
    recognizer: recognition,
    recognising: false,
  };
};

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case RECOGNITION_START:
      return Object.assign({}, state, {
        recognising: true
      });
    case RECOGNITION_STOP:
      return Object.assign({}, state, {
        recognising: false
      });
    case RECOGNITION_FINISH:
      return Object.assign({}, state, {
        recognising: false,
      });
    default: return state;
  }
};
