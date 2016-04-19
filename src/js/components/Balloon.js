import { connect } from 'react-redux';
import style from './Balloon.css';

@connect( state => ({
  reservation: state.reservation
}))
@CSSModules( style )
export default class Balloon extends React.Component {
  constructor( props ) {
    super( props );
  }

  makeBalloonText() {
    var ret = [];
    var reservation = this.props.reservation;

    if ( reservation.date !== null ) {
      ret.push( 'check out date: ' + reservation.date.value + (reservation.date.fixed ? '' : ' ?') );
    }

    return ret.length > 0 ? ret.join('\n') : '';
  }

  render() {
    var text = this.makeBalloonText();
    return !!text ? (
      <div styleName="balloon">{ text }</div>
    ) : '';
  }
}

