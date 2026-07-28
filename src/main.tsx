import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "./features/auth/authenticator";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Authenticator>
        <App />
      </Authenticator>
    </BrowserRouter>
  </StrictMode>
);