import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ImagesProvider } from "./context/ImagesContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ImagesProvider>
    <App />
  </ImagesProvider>
);
