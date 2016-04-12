import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import Main from './components/Main';
import ReduxThunk from 'redux-thunk';
injectTapEventPlugin();

const store = createStore(
  reducers,
  applyMiddleware( ReduxThunk )
);

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);

