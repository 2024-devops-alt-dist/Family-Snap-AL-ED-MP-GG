import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPicturesByEventId } from "../services/pictureService";
import { getEventById } from "../services/eventService";
import { pictureInterface } from "../entity/pictureInterface";
import { Event } from "../entity/eventInterface";
import CameraComponent from "../components/CameraComponent";
import { PictureListe } from "../components/pictures/PicturesList";

const EventPageDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [pictures, setPictures] = useState<pictureInterface[]>([]);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCamera, setIsCamera] = useState<boolean>(false);
  console.log(eventId);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return;
      try {
        const event = await getEventById(parseInt(eventId));
        setEventDetails(event);
        const picturesData = await getPicturesByEventId(parseInt(eventId));
        setPictures(picturesData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'événement :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  function handleviewCam() {
    setIsCamera(!isCamera);
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Evénement :{" "}
        <span className="text-red-500 font-bold">
          {eventDetails?.title || "Inconnu"}
        </span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Chargement des détails...</p>
      ) : eventDetails ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-red-600">
            🎁 {eventDetails.title}
          </h3>
          <p className="text-gray-800 text-lg">
            <strong>📅 Date :</strong>{" "}
            {new Date(eventDetails.created_at).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-gray-800 text-lg">
            <strong>📝 Description :</strong> {eventDetails.description}
          </p>
          <button
            onClick={handleviewCam}
            className="flex-1 min-w-[50px] text-center bg-blue-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
          >
            {!isCamera ? "Prendre une photo" : "Fermer"}
          </button>
          {isCamera && <CameraComponent />}

          <h3 className="text-xl font-bold text-green-700 mt-8">📸 Photos :</h3>
          {pictures.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <PictureListe eventId={parseInt(eventId ? eventId : "")} />
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Il n'y a pas d'images dans cet évènement
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Aucun détail trouvé pour cet événement.
        </p>
      )}

      {/* Retour à la liste des événements */}
      <div className="mt-8 text-center">
        <Link
          to="/events"
          className="inline-block bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-600 transition transform hover:scale-110 shadow-lg"
        >
          ⬅️ Retour à la liste des événements
        </Link>
      </div>
    </div>
  );
};

export default EventPageDetails;
