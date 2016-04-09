import React from 'react';
import WebSpeechAPI from './WebSpeechAPI';
import style from './Main.css';
import CSSModules from 'react-css-modules';

class Main extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div styleName="main">
        <WebSpeechAPI />
      </div>
    );
  }
}

export default CSSModules( Main, style );

