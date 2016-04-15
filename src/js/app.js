import { Provider } from 'react-redux';
import { createRedux } from './utils/redux';
import Main from './components/Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createRedux();

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);

