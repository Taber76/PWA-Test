import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Style.css'

import { Provider } from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('Service Worker registration successful with scope: ', registration.scope);
    }, function (err) {
      console.log('Service Worker registration failed: ', err);
    });
  });
}

