import React from 'react';
import WebSpeechAPI from './WebSpeechAPI';
import AITalk from './AITalk';
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
        <AITalk />
      </div>
    );
  }
}

export default CSSModules( Main, style );

