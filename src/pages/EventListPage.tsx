import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/eventService";
import { Event } from "../entity/Event";
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
        <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Liste des Événements
        </h1>
        
        <ul className="mt-6 space-y-4">
        {events.map((event) => (
            <li
            key={event.id}
            className="p-4 bg-gray-50 rounded-lg shadow flex flex-col gap-2"
            >
            <h2 className="text-xl font-semibold text-gray-800">
            {event.title}
            </h2>
            <p className="text-gray-600 text-sm">
            <strong>Date :</strong>{" "}
            {new Date(event.created_at).toLocaleString()}
            </p>
            <p className="text-gray-600">{event.description}</p>
            
            {event.url && (
                <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
                >
                Plus d'infos
                </a>
            )}
            
            <button
            onClick={() => handleDelete(event.id)}
            className="self-end mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
            Supprimer
            </button>
            </li>
        ))}
        </ul>
        
        <div className="mt-6 text-center">
        <Link
        to="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
        Créer un événement
        </Link>
        </div>
        </div>
    );
};

export default EventListPage;