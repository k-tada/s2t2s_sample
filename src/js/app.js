import { Provider } from 'react-redux';
import { createRedux } from './utils/redux';
import Main from './components/Main';

const store = createRedux();

ReactDOM.render(
  <Provider store={ store }>
    <Main />
  </Provider>,
  document.getElementById('main')
);

