import { useEffect, useState } from "react";

import { getEvents, createEvent, deleteEvent } from "./services/eventService";
import { eventInterface } from "./entity/eventInterface";
import { pictureInterface } from "./entity/pictureInterface";
import { getPicture } from "./services/pictureService";

function App() {
  const [events, setEvents] = useState<eventInterface[]>([]);
  const [pictures, setPictures] = useState<pictureInterface[]>([]);

  useEffect(() => {
    refreshEvents();
    refreshPictures();
  }, []);

  async function refreshEvents() {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }

  async function refreshPictures() {
    try {
      const data = await getPicture();
      setPictures(data);
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }

  // Test pour cree event
  async function handleCreate() {
    const newEvent: Omit<eventInterface, "id"> = {
      title: "Anniversaire de Papa",
      description: "Fête familiale",
      url: "https://example.com",
      created_at: new Date(),
    };

    try {
      await createEvent(newEvent);
      alert("Événement créé !");
      refreshEvents();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }

  async function handleDelete(eventId: number) {
    try {
      await deleteEvent(eventId);
      alert("Événement supprimé !");
      refreshEvents();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('/images/noel.jpg')" }}
    >

      <div className="bg-black bg-opacity-60 min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
