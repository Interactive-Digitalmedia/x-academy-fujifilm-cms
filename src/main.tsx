import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
// import './index.css'
import "./global.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { PlanProvider } from './context/PlanContext.tsx'

localStorage.removeItem("vite-ui-theme");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <DndProvider backend={HTML5Backend}>
        {/* <PlanProvider> */}
        <App />
        {/* </PlanProvider> */}
      </DndProvider>
    </Router>
  </React.StrictMode>
);
