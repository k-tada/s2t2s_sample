import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createRedux } from './utils/redux';
import Main from './components/Main';
injectTapEventPlugin();

const store = createRedux();

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);

