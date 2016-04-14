import { startSynthesis } from '../actions/synthesis';
import {
  RECOGNITION_START,
  RECOGNITION_STOP,
  RECOGNITION_FINISH,
  TEXT_CHANGE,
  APIS
} from '../constants';

function startWebSpeechApi ( dispatch, recognition ) {

    dispatch({ type: RECOGNITION_START  });

    var recognizer = recognition.recognizer[APIS.RECOGNITION.WEB_SPEECH_API];

    recognizer.onresult = ( res ) => {
      var txt = res.results[0][0].transcript;
      dispatch({ type: TEXT_CHANGE, text: txt });
      dispatch({ type: RECOGNITION_FINISH, text: txt });
      dispatch(startSynthesis());
    };

    const onend = ( e ) => { dispatch({ type: RECOGNITION_STOP }); };
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

