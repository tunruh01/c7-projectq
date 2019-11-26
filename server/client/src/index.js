import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/reducers";

const store = createStore(rootReducer, {})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    < App >
    </App >
    </BrowserRouter>
    
  </Provider>,
    document.getElementById('root')
);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA