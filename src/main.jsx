import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ApplicationViews />
    </React.StrictMode>
  </BrowserRouter>
);
