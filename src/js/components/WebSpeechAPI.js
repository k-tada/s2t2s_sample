import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton, SelectField, MenuItem } from 'material-ui';
import style from './WebSpeechAPI.css';
import CSSModules from 'react-css-modules';
import consts from '../constants';
// import { APIS } from '../constants';
import { startRecognition, stopRecognition } from '../actions/recognition';
import { startSynthesis } from '../actions/synthesis';
import { changeText } from '../actions/text';
import { setApi } from '../actions/api';

class WebSpeechAPI extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentWillReceiveProps( next ) {
    console.log(this.props);
    console.log(next);
    if (
         this.props.recognition.recognising
      && ! next.recognition.recognising
      && !! next.text
    ) {
      this.props.startSynthesis();
    }
  }

  start() {
    this.props.startRecognition();
  }

  stop() {
    this.props.stopRecognition();
  }

  setText( e ) {
    this.props.changeText( e.target.value );
    // this.setState({ text: e.target.value });
  }

  changeRecognitionApi( e, idx, val ) {
    this.props.setApi( val, 'RECOGNITION' );
  }

  changeSynthesisApi( e, idx, val ) {
    this.props.setApi( val, 'SYNTHESIS' );
  }

  render() {
    var recognitionApis = Object.keys( consts.APIS.RECOGNITION ).map(( k, i ) => {
      return (
        <MenuItem key={ 'recognition-menu-item' + i } value={ k } primaryText={ k } />
      );
    });
    var synthesisApis = Object.keys( consts.APIS.SYNTHESIS ).map(( k, i ) => {
      return (
        <MenuItem key={ 'synthesis-menu-item' + i } value={ k } primaryText={ k } />
      );
    });
    return(
      <div styleName="section">
        <div styleName="select-area">
          <SelectField
            value={ this.props.api.RECOGNITION }
            onChange={ ::this.changeRecognitionApi }
            floatingLabelText="Recognition"
          >
            { recognitionApis }
          </SelectField>
          <SelectField
            value={ this.props.api.SYNTHESIS }
            onChange={ ::this.changeSynthesisApi }
            floatingLabelText="Synthesis"
          >
            { synthesisApis }
          </SelectField>
        </div>
        <div styleName="button-area">
          <RaisedButton styleName="button" onClick={ ::this.start } label="はじめる" primary={true} />
          <RaisedButton styleName="button" onClick={ ::this.stop } label="やめる" secondary={true} />
        </div>
        <div styleName="text-area">
          <textarea styleName="speech-text" value={ this.props.text } onChange={ ::this.setText }></textarea>
        </div>
      </div>
    );
  }
}

export default connect( state => ({
  recognition: state.recognition,
  synthesis: state.synthesis,
  text: state.text,
  api: state.api
}), {
  startRecognition,
  stopRecognition,
  startSynthesis,
  changeText,
  setApi
})( CSSModules( WebSpeechAPI, style ));

