import React, { useState } from "react";
import { createEvent } from "../services/eventService";
import { Event } from "../entity/eventInterface";
import { useNavigate } from "react-router-dom";

const CreateEventPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const newEvent: Omit<Event, "id"> = {
            title,
            description,
            url,
            created_at: new Date(createdAt),
            qr_code: "", 
        };
        
        try {
            await createEvent(newEvent);
            
            setSuccessMessage("🎉 Événement créé avec succès !");
            
            setTitle("");
            setDescription("");
            setUrl("");
            setCreatedAt("");
            
            setTimeout(() => {
                navigate("/events");
            }, 3000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erreur :", error.message);
            } else {
                console.error("Erreur inconnue :", error);
            }
        }
    }
    
    
    return (
        <div className="relative max-w-lg mx-auto mt-16 p-8 bg-red-100 shadow-xl rounded-2xl transform transition duration-300 hover:scale-105">
        
        {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-green-600 text-white px-8 py-6 rounded-lg shadow-xl animate-fade-in-out">
            {successMessage}
            </div>
            </div>
        )}
        
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700 tracking-wide drop-shadow-lg">
        Créer un événement 🎄
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative group">
        <label
        className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        htmlFor="title"
        >
        Titre
        </label>
        <input
        id="title"
        type="text"
        placeholder=" "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
        </div>
        
        <div className="relative group">
        <label
        className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        htmlFor="description"
        >
        Description
        </label>
        <textarea
        id="description"
        placeholder=" "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
        </div>
        
        <div className="relative group">
        <label
        className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        htmlFor="url"
        >
        URL (optionnel)
        </label>
        <input
        id="url"
        type="url"
        placeholder=" "
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
        </div>
        
        <div className="relative group">
        <label
        className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        htmlFor="created_at"
        >
        Date de création
        </label>
        <input
        id="created_at"
        type="date"
        value={createdAt}
        onChange={(e) => setCreatedAt(e.target.value)}
        required
        className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
        </div>
        
        <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-green-600 text-white font-bold py-4 rounded-lg hover:from-green-600 hover:to-red-700 transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
        >
        Créer 🎁
        </button>
        </form>
        
        <div className="mt-10 text-center">
        <button
        onClick={() => navigate("/events")}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
        >
        Retour à la liste des événements
        </button>
        </div>
        </div>
    );
};

export default CreateEventPage;
