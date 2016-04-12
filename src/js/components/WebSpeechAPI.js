import { Component } from 'react';
import { RaisedButton } from 'material-ui';
import style from './WebSpeechAPI.css';
import CSSModules from 'react-css-modules';
import { EventEmitter } from 'fbemitter';

@connect(state => ({
  recognition: state.recognition,
  synthesis: state.synthesis
}))
class WebSpeechAPI extends Component {
  constructor( props ) {
    super( props );
    // window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    // this.recognition = new webkitSpeechRecognition();
    // this.recognition.lang = 'ja';
    // this.synthesisor = new SpeechSynthesisUtterance();
    // this.synthesisor.lang = 'ja-UP';
    // this.synthesisor.voice = window.speechSynthesis.getVoices()[7];
    // this.emitter = new EventEmitter();
    // this.state = { text: '' };
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
    this.synthesisor.text = this.state.text;
    window.speechSynthesis.speak( this.synthesisor );
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

export default CSSModules( WebSpeechAPI, style );

