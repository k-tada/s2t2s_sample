import actions from '../actions/synthesis';

const initState = () => {
  var synthesizer = new SpeechSynthesisUtterance();
  synthesizer.lang = 'ja-UP';
  synthesizer.voice = window.speechSynthesis.getVoices()[7];

  return {
    synthesizer: synthesizer,
    speeching: false,
    text: ''
  };
};

export function synthesisReducer ( state = initState(), action ) {
  switch( action.type ) {
    case synthesis.START:
      return Object.assign({}, state, {
        speeching: true
      });
    case synthesis.STOP:
      return Object.assign({}, state, {
        speeching: false
      });
  }
};

