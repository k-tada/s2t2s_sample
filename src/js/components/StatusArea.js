import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './StatusArea.css';

class StatusArea extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    var imageFiles = {
      NORMAL: 'NORMAL.png',
      LISTENING: 'LISTENING.jpg',
      SPEAKING: 'SPEAKING.jpg',
    };

    return(
      <div styleName="state-area">
        <img src={ './assets/images/' + imageFiles[this.props.status] } />
      </div>
    );
  }
}

export default connect( state => ({
  status: state.status
}), {})( CSSModules( StatusArea, style ));

