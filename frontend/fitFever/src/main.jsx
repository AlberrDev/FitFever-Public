import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainApp } from './MainApp.jsx'
import store from "../store.js"
import { Provider } from "react-redux"
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainApp />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
