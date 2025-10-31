import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { I18nSync } from "./language/I18nSync.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nSync>
      <App />
    </I18nSync>
  </StrictMode>
);
