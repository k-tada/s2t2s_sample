import {
  SYNTHESIS_START,
  SYNTHESIS_STOP,
  APIS,
  STATUS_UPDATE,
  STATUSES
} from '../constants';

function startWebSpeechApi ( dispatch, synthesis, text ) {

  dispatch({ type: SYNTHESIS_START });
  dispatch({ type: STATUS_UPDATE, status: STATUSES.SPEAKING });

  var synthesizer = synthesis.synthesizer[APIS.SYNTHESIS.WEB_SPEECH_API];

  const onend = ( e ) => {
    dispatch({ type: SYNTHESIS_STOP });
    dispatch({ type: STATUS_UPDATE, status: STATUSES.NORMAL });
  };
  synthesizer.text = text;
  synthesizer.onerror = onend;
  synthesizer.onend = onend;
  window.speechSynthesis.speak( synthesizer );
}

function startAIToken( dispatch, synthesis, text ) {

  dispatch({ type: SYNTHESIS_START });
  dispatch({ type: STATUS_UPDATE, status: STATUSES.SPEAKING });

  var synthesizer = synthesis.synthesizer[APIS.SYNTHESIS.AI_TALK];

  const onend = ( e ) => {
    dispatch({ type: SYNTHESIS_STOP });
    dispatch({ type: STATUS_UPDATE, status: STATUSES.NORMAL });
  };
  axios.get('http://webapi.aitalk.jp/webapi/v2/ttsget.php', {
    params: {
      username: process.env.AITalk.username,
      password: process.env.AITalk.password,
      text: text,
      speaker_name: 'yamato_west',
      ext: 'wav'
    },
    responseType: 'arraybuffer'
  }).then((res) => {
    if( res.status == 200 ) {
      synthesizer.audioContext.decodeAudioData(res.data, (audioBuffer) => {
        var source = synthesizer.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = false;
        source.loopStart = 0;
        source.loopEnd = audioBuffer.duration;
        source.playbackRate.value = 1.0;
        source.connect(synthesizer.audioContext.destination);
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
      case APIS.SYNTHESIS.WEB_SPEECH_API:
        return startWebSpeechApi( dispatch, synthesis, text );
      case APIS.SYNTHESIS.AI_TALK:
        return startAIToken( dispatch, synthesis, text );
      default:
        return;
    }
  };
};

