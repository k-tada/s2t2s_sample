import React from 'react';
import { RaisedButton } from 'material-ui';
import style from './AITalk.css';
import CSSModules from 'react-css-modules';
import { EventEmitter } from 'fbemitter';
import axios from 'axios';

class AITalk extends React.Component {
  constructor( props ) {
    super( props );
    this.emitter = new EventEmitter();

    // TODO Util化したい

    // S2T : Web Speech API
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja';

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.state = { text: '' };
  }

  componentDidMount() {
    this.recognition.onresult = ( e ) => {
      this.setState({ text: e.results["0"]["0"].transcript });
      this.emitter.emit('recognitionFinished');
    };
  }

  s2t() {
    this.recognition.start();
    setTimeout(() => {
      this.recognition.stop();
    }, 5000);
  }

  t2s() {
    axios.get('http://webapi.aitalk.jp/webapi/v2/ttsget.php', {
      params: {
        username: '',
        password: '',
        text: this.state.text,
        speaker_name: 'yamato_west',
        ext: 'wav'
      },
      responseType: 'arraybuffer'
    }).then((res) => {
      console.log(res);
      // var audio = new Audio("data:audio/wav;" + res.data);
      // audio.play();
      // var audio = new Audio("data:audio/wav;base64," + window.btoa(res.data));
      // audio.play();
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
          source.start(0);
          source.onended = (e) => {
            source.onended = null;
            source.stop(0);
          }
        }, (e) => {
          console.log(e.message);
        });
      }
    }).catch((res) => {
          console.log(res);
        });
  }

  s2t2s() {
    this.s2t();
    this.emitter.addListener('recognitionFinished', () => {
      this.t2s();
    });
  }

  setText( e ) {
    this.setState({ text: e.target.value });
  }

  render() {
    return(
      <div styleName="section">
        <div styleName="button-area">
          <RaisedButton styleName="button" onClick={ ::this.s2t } label="Speech -> Text" />
          <RaisedButton styleName="button" onClick={ ::this.t2s } label="Text -> Speech" primary={true} />
          <RaisedButton styleName="button" onClick={ ::this.s2t2s } label="Speech -> Text -> Speech" secondary={true} />
        </div>
        <div styleName="text-area">
          <textarea styleName="speech-text" value={ this.state.text } onChange={ ::this.setText }></textarea>
        </div>
      </div>
    );
  }
}

export default CSSModules( AITalk, style );

