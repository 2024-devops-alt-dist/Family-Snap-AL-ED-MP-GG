import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";

import App from "./App";
import EventListPage from "./pages/EventListPage";
import CreateEventPage from "./pages/CreateEventPage";
import LoginPage from "./pages/LoginPage";
import EventPageDetails from "./pages/EventPageDetails";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route Principal */}
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />

        {/* Route de l'application */}
          <Route path="events" element={<EventListPage />} />
          <Route path="create" element={<CreateEventPage />} />
          <Route path="details/:eventId" element={<EventPageDetails />} />

          {/* Route pour les page non trouvée*/}
          <Route path="*" element={<h1>Page non trouvée</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
