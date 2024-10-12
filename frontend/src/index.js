import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <img
        src = "eth_logo_kurz_pos.svg"
        alt="Background"
      />
      <App />
    </Router>
  </React.StrictMode>
);
