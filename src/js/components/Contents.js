import { connect } from 'react-redux';
import style from './Contents.css';
import StatusArea from './StatusArea';
import { startRecognition } from '../actions/recognition';
import { getEvents } from '../utils/hrime';

@connect( state => ({
  hrime: state.hrime
}))
@CSSModules( style )
export default class Contents extends React.Component {

  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    var events = getEvents( this.props.dispatch );
    Object.keys( events ).forEach(( key ) => {
      this.props.hrime.socket.socket.on( key, events[key] );
    });
    this.props.dispatch(startRecognition());
  }

  render() {
    return(
      <div styleName="section">
        <StatusArea />
      </div>
    );
  }
}

