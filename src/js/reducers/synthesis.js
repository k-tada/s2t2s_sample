import {
  SYNTHESIS_START,
  SYNTHESIS_STOP,
  APIS
} from '../constants';

const initializeWebSpeechApi = () => {
  var synthesis = new SpeechSynthesisUtterance();
  synthesis.lang = 'ja-UP';
  synthesis.voice = window.speechSynthesis.getVoices()[7];
  return synthesis;
};

const initializeAiToken = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();
  return { audioContext: audioContext };
};

const initState = () => {
  var synthesis = {
    [APIS.SYNTHESIS.WEB_SPEECH_API]: initializeWebSpeechApi(),
    [APIS.SYNTHESIS.AI_TALK]: initializeAiToken()
  };

  return {
    synthesizer: synthesis,
    speeching: false,
    text: ''
  };
};

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case SYNTHESIS_START:
      return Object.assign({}, state, {
        speeching: true,
        text: action.text
      });
    case SYNTHESIS_STOP:
      return Object.assign({}, state, {
        speeching: false
      });
    default: return state;
  }
};

