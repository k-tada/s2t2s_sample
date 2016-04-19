import Config from 'Config';
import io from 'socket.io-client';
import { HrimeSocket } from 'hrime-socket';
import {
  HRIME_CONNECT,
  HRIME_CONNECTED,
  HRIME_UTTERANCE
} from '../constants';

function _initState () {
  var config = Config.hrime;
  var user = config.basic.user;
  var pass = config.basic.pass;
  var opts = {};
  if ( !!user && !!pass ) {
    var basic = new Buffer(user + ':' + pass).toString('base64');
    opts = {
      extraHeaders: {
        Authorization: 'Basic ' + basic
      }
    };
  }

  var socket = new HrimeSocket( config.url, user, pass, io, opts );

  socket.init();
  return () => {
    return {
      socket: socket
    };
  };
}

var initState = _initState();

export default ( state = initState(), action ) => {
  switch( action.type ) {
    case HRIME_CONNECT:
    case HRIME_CONNECTED:
    case HRIME_UTTERANCE:
    default:
      return state;
  }
};
