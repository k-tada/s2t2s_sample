export const START = 'RECOGNITION.START';
export const STOP = 'RECOGNITION.STOP';
export const ONRESULT = 'RECOGNITION.ONRESULT';
export const APIS = {
  WEB_SPEECH_API: 'WEB_SPEECH_API'
};

export function recognitionStart ( api ) {
  return {
    type: START,
    api: api
  };
};

export function recognitionStop ( api ) {
  return {
    type: STOP,
    api: api
  };
};

export function recognitionOnResult ( text ) {
  return {
    type: ONRESULT,
    text: text
  };
};

export function startRecognition ( api ) {
  return ( dispatch, getState ) => {
    dispatch( recognitionStart( api ) );
    var recognition = getState().recognition;
    recognition.onresult = ( res ) => {
      dispatch( recognitionOnResult( res.results[0][0].transcript ) );
    };
    recognition.start();
  };
};

export function stopRecognition ( api ) {
  return ( dispatch, getState ) => {
    var recognition = getState().recognition;
    recognition.stop();
    dispatch( recognitionStop( api ) );
  };
};

