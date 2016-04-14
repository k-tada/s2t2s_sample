import { API_SELECT } from '../constants';

export function setApi ( api, to ) {
  return {
    type: API_SELECT,
    api: api,
    to: to
  };
}
