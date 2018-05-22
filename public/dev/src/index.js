import React from 'react';
import ReactDOM from 'react-dom';
import App from '~/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import fetchMidleware from '~/middlewares/fetch'

import Home from '~/components/Home';
import User from '~/components/User/index';
import Schedule from '~/components/Schedule/index';

import reducers from '~/reducers'

const enhancer = compose(
  applyMiddleware(fetchMidleware)
)

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
)
  
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="users" component={User}/>
          <Route path="schedules" component={Schedule}/>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker();
