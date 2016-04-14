import { STATUS_UPDATE, STATUSES } from '../constants';

export default ( state = STATUSES.NORMAL, action ) => {
  switch( action.type ) {
    case STATUS_UPDATE:
      return action.status;
    default:
      return state;
  }
};
