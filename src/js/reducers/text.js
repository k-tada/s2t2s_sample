import consts from '../constants';
// import { TEXT_CHANGE } from '../constants';

export default ( state = '', action ) => {
  switch( action.type ) {
    case consts.TEXT_CHANGE:
      return action.text;
    default:
      return state;
  }
};
