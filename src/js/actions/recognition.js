import Config from 'Config';
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

function startWebSpeechApi ( dispatch, getState ) {

    dispatch({ type: RECOGNITION_START });
    dispatch({ type: STATUS_UPDATE, status: STATUSES.LISTENING });

    var { recognition } = getState();
    var recognizer = recognition.recognizer[APIS.RECOGNITION.WEB_SPEECH_API];

    recognizer.onresult = ( res ) => {
      recognizer.stop();
      var txt = res.results[0][0].transcript;
      dispatch({ type: TEXT_CHANGE, text: txt });
      dispatch({ type: RECOGNITION_FINISH, text: txt });
      dispatch(sendToHrime());
    };

    const onend = ( e ) => {
      // onresultが来るまでは基本的にずっとListeningモードにする
        console.log('recognition restart');
        recognizer.stop();
        setTimeout(() => {
          var { recognition } = getState();
          if ( recognition.recognising ) {
            dispatch(startRecognition());
          }
        }, 100);
    };

    recognizer.onend = onend;
    recognizer.onerror = onend;

    recognizer.start();
}

export function startRecognition () {
  return ( dispatch, getState ) => {
      switch ( Config.recognition.api ) {
        case APIS.RECOGNITION.WEB_SPEECH_API:
          return startWebSpeechApi( dispatch, getState );
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
    const { recognition } = getState();
    switch ( Config.recognition.api ) {
      case APIS.RECOGNITION.WEB_SPEECH_API:
        return stopWebSpeechApi( dispatch, recognition );
      default:
        return;
    }
  };
};

