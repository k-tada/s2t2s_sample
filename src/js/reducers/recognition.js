import actions from '../actions/recognition';

const initState = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'ja';

  return {
    recognition: recognition,
    recognising: false,
    text: ''
  }
};

export function recognitionReducer ( state = initState(), action ) {
  switch( action.type ) {
    case actions.START:
      return Object.assign({}, state, {
        recognising: true
      });
    case actions.STOP:
      return Object.assign({}, state, {
        recognising: false
      });
    case actions.ONRESULT:
      return Object.assign({}, state, {
        recognising: false,
        recognisedText: action.text
      });
  }
};
