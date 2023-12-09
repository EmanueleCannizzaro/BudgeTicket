import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './reducks/store';
import App from './App.jsx';
import {ConnectedRouter} from 'connected-react-router';
import * as History from 'history';
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from './assets/theme';
import {devToolsEnhancer} from 'redux-devtools-extension';

const history = History.createBrowserHistory();
export const store = createStore(history, devToolsEnhancer());

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
