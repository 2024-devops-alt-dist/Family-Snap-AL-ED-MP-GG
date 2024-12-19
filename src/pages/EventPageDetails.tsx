import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { getPicturesByEventId } from '../services/pictureService';
import { pictureInterface } from '../entity/pictureInterface';

const EventPageDetails: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>(); // On récupère l'event_id via l'url
    const [pictures, setPictures] = useState<pictureInterface[]>([]);

    useEffect(() => {
        const fetchPictures = async () => {
            if (!eventId) return;
            try {
                const data = await getPicturesByEventId(parseInt(eventId));
                setPictures(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPictures();
    }, [eventId]);

    return (
        <div>
            <h2>Évènement {eventId}</h2>
            <div className="pictures-grid">
                {pictures.length > 0 ? (
                    pictures.map((picture) => (
                        <div key={picture.id} className="picture-item">
                            <img src={picture.url} />
                        </div>
                    ))
                ) : (
                    <p>Il n'y a pas d'images dans cet évènement</p>
                )}
            </div>
        </div>
    );
};

export default EventPageDetails;
