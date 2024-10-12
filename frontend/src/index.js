import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <img src="eth_logo_kurz_pos.png" alt="Background" />
      <img className="logout-icon" src="logout_icon.svg" alt="Logout" />
      <App />
    </Router>
  </React.StrictMode>
);
