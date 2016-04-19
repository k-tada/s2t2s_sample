import { RESERVATION_CHANGE } from '../constants';

export function changeReservation ( info ) {
  return {
    type: RESERVATION_CHANGE,
    info: info
  };
}
