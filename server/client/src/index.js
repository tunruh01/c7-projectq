import { BrowserRouter as Router }  from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import Qnav from './components/Qnav'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, {})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Qnav fixed="top" />
      < App >
      </App >
    </Router>
  </Provider>,
    document.getElementById('root')
);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA