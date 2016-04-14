import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Contents.css';
import SelectArea from './ButtonArea';
import ButtonArea from './ButtonArea';
import TextArea from './TextArea';
import StatusArea from './StatusArea';

@CSSModules( style )
export default class Contents extends React.Component {

  constructor( props ) {
    super( props );
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

