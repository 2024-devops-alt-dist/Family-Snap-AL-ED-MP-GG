import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/eventService";
import { Event } from "../entity/eventInterface";
import { Link } from "react-router-dom";

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Get events
  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
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

  // Delete Event
  async function handleDelete(eventId: number) {
    try {
      await deleteEvent(eventId);
      alert("Événement supprimé !");
      fetchEvents(); // Rafraîchit la liste
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8 border-t-8 border-red-500 relative overflow-hidden">
        <h1 className="text-5xl font-bold mb-12 text-center text-red-600 drop-shadow-lg tracking-wide">
          🎄 Liste des Événements 🎅
        </h1>

        <div className="text-center mb-8">
          <Link
            to="/create"
            className="bg-green-500 text-white px-8 py-4 rounded-full text-lg hover:bg-green-600 transition transform hover:scale-110 shadow-lg"
          >
            🎉 Créer un événement
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-700 text-xl text-center mt-16">
            Aucun événement trouvé. Créez-en un dès maintenant ! 🎊
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-6 bg-white rounded-2xl shadow-lg border-t-4 border-red-200 transform hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  🎁 {event.title}
                </h2>

                <p className="text-gray-800 text-sm font-medium mb-2">
                  <strong>📅 Date :</strong>{" "}
                  {new Date(event.created_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-700 text-sm mb-4">
                  <strong>📝 Description :</strong> {event.description}
                </p>

                {event.qr_code && (
                  <div className="mt-4 text-center">
                    <h3 className="text-green-700 font-bold">📸 QR Code :</h3>
                    <img
                      src={event.qr_code}
                      alt="QR Code de l'événement"
                      className="mx-auto mt-2 w-40 h-35 object-contain rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center mt-6 gap-x-4">
                  <Link
                    to={`/details/${event.id}`}
                    className="flex-1 min-w-[50px] text-center bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
                  >
                    📋 Détails
                  </Link>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 min-w-[50px] text-center bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition transform hover:scale-105 shadow-lg"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventListPage;
