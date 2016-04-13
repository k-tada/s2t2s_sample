import axios from 'axios';
import consts from '../constants';
// import {
//   SYNTHESIS_START,
//   SYNTHESIS_STOP,
//   APIS
// } from '../constants';

function startWebSpeechApi ( dispatch, synthesis, text ) {
  dispatch({ type: consts.SYNTHESIS_START });
  const onend = ( e ) => { dispatch({ type: consts.SYNTHESIS_STOP }); };
  synthesis.synthesizer.text = text;
  synthesis.synthesizer.onerror = onend;
  synthesis.synthesizer.onend = onend;
  window.speechSynthesis.speak( synthesis.synthesizer );
}

function startAIToken( dispatch, text ) {
  const onend = ( e ) => { dispatch({ type: consts.SYNTHESIS_STOP }); };
  dispatch({ type: consts.SYNTHESIS_START });
  axios.get('http://webapi.aitalk.jp/webapi/v2/ttsget.php', {
      params: {
        username: 'nextremer',
        password: '3mhfrdyQ',
        text: text,
        speaker_name: 'yamato_west',
        ext: 'wav'
      },
      responseType: 'arraybuffer'
      }).then((res) => {
    if( res.status == 200 ) {
      this.audioContext.decodeAudioData(res.data, (audioBuffer) => {
        var source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = false;
        source.loopStart = 0;
        source.loopEnd = audioBuffer.duration;
        source.playbackRate.value = 1.0;
        source.connect(this.audioContext.destination);
        source.start = source.start || source.noteOn;
        source.stop = source.stop || source.noteOff;
        source.onended = (e) => {
          source.onended = null;
          source.stop(0);
          onend();
        }
        source.start(0);
      }, (e) => {
        console.log(e.message);
        onend();
      });
    } else {
      onend();
    }
  }).catch((res) => {
    console.log(res);
    onend();
  });
}

export function startSynthesis () {
  return ( dispatch, getState ) => {
    const { synthesis, text, api } = getState();
    switch ( api.SYNTHESIS ) {
      case consts.APIS.SYNTHESIS.WEB_SPEECH_API:
        return startWebSpeechApi( dispatch, synthesis, text );
      case consts.APIS.SYNTHESIS.AI_TALK:
        return startAIToken( dispatch, text );
      default:
        return;
    }
  };
};

