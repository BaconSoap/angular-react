import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare global {
  interface Window {
    renderApp: () => void;
  }
}

window.renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('react-root'));
}
