import {
  SYNTHESIS_START,
  SYNTHESIS_STOP,
} from '../constants';

const initState = () => {
  var synthesis = new SpeechSynthesisUtterance();
  synthesis.lang = 'ja-UP';
  synthesis.voice = window.speechSynthesis.getVoices()[7];

  return {
    synthesizer: synthesis,
    speeching: false
  };
};

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case SYNTHESIS_START:
      return Object.assign({}, state, {
        speeching: true
      });
    case SYNTHESIS_STOP:
      return Object.assign({}, state, {
        speeching: false
      });
    default: return state;
  }
};

