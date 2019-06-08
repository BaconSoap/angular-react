import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { counter } from './CounterReducer';

declare global {
  interface Window {
    renderApp: () => void;
  }
}

window.renderApp = () => {
  const store = createAppStore();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('react-root'));
  return store;
}

const createAppStore = () => {
  const rootReducer = combineReducers({
    counter
  });
  return createStore(rootReducer);
}
