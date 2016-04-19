import { connect } from 'react-redux';
import style from './StatusArea.css';
import Balloon from './Balloon';
import Logs from './Logs';

@connect( state => ({
  status: state.status
}))
@CSSModules( style )
export default class StatusArea extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    var imageFiles = {
      NORMAL: 'NORMAL.png',
      LISTENING: 'LISTENING.jpg',
      SPEAKING: 'SPEAKING.jpg',
      ANALYZING: 'ANALYZING.png',
    };

    return(
      <div styleName="state-area">
        <Balloon />
        <img src={ './assets/images/' + imageFiles[this.props.status] } />
        <Logs />
      </div>
    );
  }
}

