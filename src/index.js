import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//ניתובים באתר
import { BrowserRouter } from 'react-router-dom';
//רדיוסר
import { combineReducers, createStore } from 'redux';
import attractionReducer from "./store/reducers/attraction";
import userReducer from "./store/reducers/user";
import itemReducer from "./store/reducers/item";
import listReducer from './store/reducers/list';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const myStore = createStore(combineReducers({ attraction: attractionReducer, user: userReducer, item:itemReducer, list:listReducer }));

root.render(
  <React.StrictMode>

    <Provider store = {myStore}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
