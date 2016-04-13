import {
  RECOGNITION_START,
  RECOGNITION_STOP,
  RECOGNITION_FINISH,
} from '../constants';

const initState = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja';

  return {
    recognizer: recognition,
    recognising: false,
  }
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
