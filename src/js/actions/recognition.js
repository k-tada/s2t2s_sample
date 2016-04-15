import { sendToHrime } from '../actions/hrime';
import {
  RECOGNITION_START,
  RECOGNITION_STOP,
  RECOGNITION_FINISH,
  TEXT_CHANGE,
  APIS,
  STATUS_UPDATE,
  STATUSES
} from '../constants';

function startWebSpeechApi ( dispatch, recognition ) {

    dispatch({ type: RECOGNITION_START });
    dispatch({ type: STATUS_UPDATE, status: STATUSES.LISTENING });

    var recognizer = recognition.recognizer[APIS.RECOGNITION.WEB_SPEECH_API];
    var ended = false;

    recognizer.onresult = ( res ) => {
      var txt = res.results[0][0].transcript;
      ended = true;
      dispatch({ type: TEXT_CHANGE, text: txt });
      dispatch({ type: RECOGNITION_FINISH, text: txt });
      dispatch(sendToHrime());
    };

    const onend = ( e ) => {
      if ( ! ended) {
        dispatch({ type: RECOGNITION_STOP });
        dispatch({ type: STATUS_UPDATE, status: STATUSES.NORMAL });
      }
    };
    recognizer.onend = onend;
    recognizer.onerror = onend;

    recognizer.start();
}

export function startRecognition () {
  return ( dispatch, getState ) => {
    const { recognition, api } = getState();
      switch ( api.RECOGNITION ) {
        case APIS.RECOGNITION.WEB_SPEECH_API:
          return startWebSpeechApi( dispatch, recognition );
        default:
          return;
      }
  };
};

function stopWebSpeechApi ( dispatch, recognition ) {
    recognition.recognizer[APIS.RECOGNITION.WEB_SPEECH_API].stop();
    dispatch({ type: RECOGNITION_STOP  });
    dispatch({ type: STATUS_UPDATE, status: STATUSES.NORMAL });
}

export function stopRecognition ( api ) {
  return ( dispatch, getState ) => {
    const { recognition, api } = getState();
    switch ( api.RECOGNITION ) {
      case APIS.RECOGNITION.WEB_SPEECH_API:
        return stopWebSpeechApi( dispatch, recognition );
      default:
        return;
    }
  };
};

