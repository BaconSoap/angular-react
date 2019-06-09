import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, Store } from 'redux';
import { Provider } from 'react-redux';
import { counter } from './CounterReducer';

declare global {
  interface Window {
    renderApp: () => void;
    ReactAppManager: any;
  }
}

class ReactAppManager {
  public store: Store | undefined;
  public renderApp() {
    if (!this.store) {
      this.store = createAppStore();
    }

    ReactDOM.render(
      <Provider store={this.store}>
        <App />
      </Provider>
      , document.getElementById('react-root'));
  }
}

window.ReactAppManager = ReactAppManager;


const createAppStore = () => {
  const rootReducer = combineReducers({
    counter
  });
  return createStore(rootReducer);
}
