import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import CSSModules from 'react-css-modules';
import style from './ButtonArea.css';
import { startRecognition, stopRecognition } from '../actions/recognition';

class ButtonArea extends React.Component {

  constructor( props ) {
    super( props );
  }

  start() {
    this.props.startRecognition();
  }

  stop() {
    this.props.stopRecognition();
  }

  render() {
    return(
      <div styleName="button-area">
        <RaisedButton styleName="button" onClick={ ::this.start } label="はじめる" primary={true} />
        <RaisedButton styleName="button" onClick={ ::this.stop } label="やめる" secondary={true} />
      </div>
    );
  }
}

export default connect( state => state, {
  startRecognition,
  stopRecognition
})( CSSModules( ButtonArea, style ));

