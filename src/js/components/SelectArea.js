import React from 'react';
import { connect } from 'react-redux';
import { SelectField, MenuItem } from 'material-ui';
import CSSModules from 'react-css-modules';
import style from './SelectArea.css';
import { APIS } from '../constants';
import { setApi } from '../actions/api';

@connect( state => ({
  api: state.api,
}), {
  setApi
})
@CSSModules( style )
export default class SelectArea extends React.Component {

  constructor( props ) {
    super( props );
  }

  changeRecognitionApi( e, idx, val ) {
    this.props.setApi( val, 'RECOGNITION' );
  }

  changeSynthesisApi( e, idx, val ) {
    this.props.setApi( val, 'SYNTHESIS' );
  }

  render() {
    var recognitionApis = Object.keys( APIS.RECOGNITION ).map(( k, i ) => {
      return (
        <MenuItem key={ 'recognition-menu-item' + i } value={ k } primaryText={ k } />
      );
    });
    var synthesisApis = Object.keys( APIS.SYNTHESIS ).map(( k, i ) => {
      return (
        <MenuItem key={ 'synthesis-menu-item' + i } value={ k } primaryText={ k } />
      );
    });

    return(
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
    );
  }
}

