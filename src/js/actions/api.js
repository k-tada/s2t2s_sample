import consts from '../constants';
// import { API_SELECT } from '../constants';

export function setApi ( api, to ) {
  return {
    type: consts.API_SELECT,
    api: api,
    to: to
  };
}
