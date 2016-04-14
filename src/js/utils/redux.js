import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

export function createRedux() {
  var middlewares = [thunk];
  process.env.NODE_ENV == 'production' || middlewares.push( logger );
  console.log(middlewares);
  console.log(...middlewares);
  return applyMiddleware( ...middlewares )( createStore )( reducers );
}
