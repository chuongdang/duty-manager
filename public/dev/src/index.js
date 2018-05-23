import React from 'react'
import ReactDOM from 'react-dom'
import App from '~/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'

import fetchMidleware from '~/middlewares/fetch'

import reducers from '~/reducers'

const enhancer = compose(
  applyMiddleware(fetchMidleware)
)

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
