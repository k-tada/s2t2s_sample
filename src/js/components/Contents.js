import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import style from './Contents.css';
import SelectArea from './SelectArea';
import ButtonArea from './ButtonArea';
import TextArea from './TextArea';
import StatusArea from './StatusArea';
import { startSynthesis } from '../actions/synthesis';
import {
  TEXT_CHANGE,
  HRIME_UTTERANCE
} from '../constants';

@connect( state => ({
  hrime: state.hrime
}))
@CSSModules( style )
export default class Contents extends React.Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    this.props.hrime.socket.on('utterance', ( data ) => {
      var text = data.scripts.filter( (s) => {
        return s.actor == 'bot';
      })[0].payload.response.value;
      this.props.dispatch({ type: HRIME_UTTERANCE });
      this.props.dispatch({ type: TEXT_CHANGE, text: text });
      this.props.dispatch(startSynthesis());
    });
  }

  render() {
    return(
      <div styleName="section">
        <SelectArea />
        <ButtonArea />
        <TextArea />
        <StatusArea />
      </div>
    );
  }
}

