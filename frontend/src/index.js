import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="header">
        <div className = "ETHoverflow">
          <div><img className="eth-logo" src="eth_logo_kurz_kurz.png" alt="Background" /></div>
          <div className="header-title">Overflow</div>
        </div>
        <div ><img className="logout-icon" src="logout_icon.svg" alt="Logout" /></div>
      </div>

      <App />
    </Router>
  </React.StrictMode>
);
