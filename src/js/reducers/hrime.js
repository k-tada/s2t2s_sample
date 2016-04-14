import io from 'socket.io-client';
import { HrimeSocket } from 'hrime-socket';
import {
  HRIME_CONNECT,
  HRIME_CONNECTED,
  HRIME_UTTERANCE
} from '../constants';

function initState () {
  var basic = new Buffer('tosaben-nx:nx-tosaben').toString('base64');
  var socket = new HrimeSocket(
    'http://www.mandigiro.com/',
    'tosaben-nx',
    'nx-tosaben',
    io,
    {
      extraHeaders: {
        Authorization: 'Basic ' + basic
      }
    }
  );

  socket.init();
  return {
    socket: socket
  };
}

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case HRIME_CONNECT:
    case HRIME_CONNECTED:
    case HRIME_UTTERANCE:
    default:
      return state;
  }
};
