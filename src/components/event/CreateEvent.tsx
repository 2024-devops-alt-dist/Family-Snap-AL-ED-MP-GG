import React, { useState } from "react";
import { createEvent } from "../../services/eventService";
import { Event } from "../../entity/eventInterface";

interface CreateEventProps {
    onEventCreated: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        const newEvent: Omit<Event, "id"> = {
            title,
            description,
            url,
            created_at: new Date(),
            qr_code: "",
        };
        
        try {
            await createEvent(newEvent);
            alert("Événement créé !");
            onEventCreated(); // Refresh Liste Event
            setTitle("");
            setDescription("");
            setUrl("");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur :", error.message);
            } else {
                console.error("Erreur inconnue :", error);
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded p-2"
        />
        <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border rounded p-2"
        />
        <input
        type="url"
        placeholder="URL (optionnel)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded p-2"
        />
        <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
        Créer un événement
        </button>
        </form>
    );
};

export default CreateEvent;
