import React from 'react';
import { connect } from 'react-redux';
import style from './TextArea.css';
import CSSModules from 'react-css-modules';
import { changeText } from '../actions/text';

@connect( state => ({
  text: state.text,
}), {
  changeText,
})
@CSSModules( style )
export default class TextArea extends React.Component {

  constructor( props ) {
    super( props );
  }

  setText( e ) {
    this.props.changeText( e.target.value );
  }

  render() {
    return(
      <div styleName="text-area">
        <textarea styleName="speech-text" value={ this.props.text } onChange={ ::this.setText }></textarea>
      </div>
    );
  }
}

