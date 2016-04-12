export const SYNTHESIS = {
  START: 'SYNTHESIS.START',
  STOP: 'SYNTHESIS.STOP'
};

export const startSynthesis = ( api ) => {
  return {
    type: SYNTHESIS.START,
    api: api
  }
}

export const stopSynthesis = ( api ) => {
  return {
    type: SYNTHESIS.STOP,
    api: api
  }
}

