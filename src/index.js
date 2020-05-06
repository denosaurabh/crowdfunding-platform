import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

// Connecting with Stripe
const stripePromise = loadStripe('pk_test_YiYeG1aELhrAd6igI5lEtE8I00YAQvnkdR');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
