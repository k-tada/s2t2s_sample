import React from 'react';
import Contents from './Contents';
import style from './Main.css';
import CSSModules from 'react-css-modules';

@CSSModules(style)
export default class Main extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div styleName="main">
        <Contents />
      </div>
    );
  }
}


