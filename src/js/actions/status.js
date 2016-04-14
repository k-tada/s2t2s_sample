import { STATUS_UPDATE } from '../constants';

export function updateStatus ( status ) {
  return {
    type: STATUS_UPDATE,
    status: status,
  };
}
