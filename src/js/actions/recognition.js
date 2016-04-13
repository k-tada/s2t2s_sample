import consts from '../constants';
import { startSynthesis } from '../actions/synthesis';
// import {
//   RECOGNITION_START,
//   RECOGNITION_STOP,
//   RECOGNITION_FINISH,
//   TEXT_CHANGE,
//   APIS
// } from '../constants';

function startWebSpeechApi ( dispatch, recognition ) {
    dispatch({ type: consts.RECOGNITION_START  });
    const onend = ( e ) => { dispatch({ type: consts.RECOGNITION_STOP }); };
    recognition.recognizer.onresult = ( res ) => {
      var txt = res.results[0][0].transcript;
      dispatch({ type: consts.TEXT_CHANGE, text: txt });
      dispatch({ type: consts.RECOGNITION_FINISH, text: txt });
      // setTimeout(() => {
      //   dispatch(startSynthesis());
      // }, 500);
        dispatch(startSynthesis());
      // startSynthesis();
    };
    // recognition.recognizer.onend = onend;
    recognition.recognizer.onerror = onend;
    recognition.recognizer.start();
}

export function startRecognition () {
  return ( dispatch, getState ) => {
    const { recognition, api } = getState();
      switch ( api.RECOGNITION ) {
        case consts.APIS.RECOGNITION.WEB_SPEECH_API:
          return startWebSpeechApi( dispatch, recognition );
        default:
          return;
      }
  };
};

function stopWebSpeechApi ( dispatch, recognition ) {
    recognition.recognizer.stop();
    dispatch({ type: consts.RECOGNITION_STOP  });
}

export function stopRecognition ( api ) {
  return ( dispatch, getState ) => {
    const { recognition, api } = getState();
    switch ( api.RECOGNITION ) {
      case consts.APIS.RECOGNITION.WEB_SPEECH_API:
        return stopWebSpeechApi( dispatch, recognition );
      default:
        return;
    }
  };
};

