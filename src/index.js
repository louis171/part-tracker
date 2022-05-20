import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PartContextProvider from "./Context/partContext";
import ModalContextProvider from "./Context/modalContext";

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PartContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </PartContextProvider>
  </React.StrictMode>
);
