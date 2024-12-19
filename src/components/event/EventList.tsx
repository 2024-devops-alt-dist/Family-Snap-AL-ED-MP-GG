import React from "react";
import { Event } from "../../entity/eventInterface";
interface EventListProps {
    events: Event[];
    onDelete: (eventId: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
    return (
        <ul className="mt-6 space-y-4">
        {events.map((event) => (
            <li
            key={event.id}
            className="p-4 bg-gray-50 rounded-lg shadow flex flex-col gap-2"
            >
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-gray-600 text-sm">
            <strong>Date :</strong> {new Date(event.created_at).toLocaleString()}
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
            onClick={() => onDelete(event.id)}
            className="self-end mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
            Supprimer
            </button>
            </li>
        ))}
        </ul>
    );
};

export default EventList;
