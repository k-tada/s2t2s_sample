import { connect } from 'react-redux';
import style from './Logs.css';

@connect( state => ({
  recognition: state.recognition,
  synthesis: state.synthesis,
}))
@CSSModules( style )
export default class Logs extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    var getLog = ( text, cls ) => {
      if ( ! text ) { return ''; }
      return (
        <li styleName={ cls } ><div>{ text }</div></li>
      );
    };

    return(
      <ul styleName="log">
        { getLog( this.props.recognition.text, 'bot' ) }
        { getLog( this.props.synthesis.text, 'user' ) }
      </ul>
    );
  }
}

