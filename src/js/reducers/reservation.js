import { RESERVATION_CHANGE } from '../constants';

var initState = {
  reserved: null,
  date: null,
  smoking: null,
  name: null,
  zipCode: null,
  address: null,
  isPaid: null,
};

export default ( state = initState, action ) => {
  console.log( initState );
  switch( action.type ) {
    case RESERVATION_CHANGE:
      return Object.assign( {}, state, action.info );
    default:
      return state;
  }
};
