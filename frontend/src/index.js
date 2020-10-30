import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
import { checkUserThunk, setTempUser } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

function loadUser () {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;
    store.dispatch(setTempUser(user));
    store.dispatch(checkUserThunk());
  } catch (err) {
    console.log('localStorage is not working');
  }
}

loadUser();

ReactDOM.render(
  <Provider store= {store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
