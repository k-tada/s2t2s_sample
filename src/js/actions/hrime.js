import {
  STATUS_UPDATE,
  STATUSES,
  HRIME_CONNECT,
} from '../constants';

export function sendToHrime () {
  return ( dispatch, getState ) => {
    dispatch({ type: STATUS_UPDATE, status: STATUSES.ANALYZING });
    const { hrime, text } = getState();
    dispatch({ type: HRIME_CONNECT });
    hrime.socket.send( text );
  };
};
