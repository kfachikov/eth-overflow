import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="canvas">
        <div className="page-content">
          <div className="page-container">
            <App />
          </div>
        </div>
      </div>
      
    </Router>
  </React.StrictMode>
);
