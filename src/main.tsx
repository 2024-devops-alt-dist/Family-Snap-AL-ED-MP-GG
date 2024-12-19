import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import App from "./App";
import EventListPage from "./pages/EventListPage";
import CreateEventPage from "./pages/CreateEventPage";
import LoginPage from "./pages/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<EventListPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="create" element={<CreateEventPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
