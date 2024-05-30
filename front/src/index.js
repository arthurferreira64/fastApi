import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* permet que le routing fonctionne meme apres le build  */}
    <ToastContainer position="bottom-right"/>
    <HashRouter>
        <App />
    </HashRouter>
  </React.StrictMode>
);