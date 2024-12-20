import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createPicture, getPicturesByEventId } from "../services/pictureService";
import { getEventById } from "../services/eventService";
import { pictureInterface } from "../entity/pictureInterface";
import { Event } from "../entity/eventInterface";
import { supabase } from '../supabaseConfig';
import CameraComponent from "../components/CameraComponent";
import { PictureListe } from "../components/pictures/PicturesList";

const EventPageDetails: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [pictures, setPictures] = useState<pictureInterface[]>([]);
    const [eventDetails, setEventDetails] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl] = useState(null);
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
    
    
    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };
    
    const uploadImage = async () => {
        if (!file) return;
        
        
        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { data, error } = await supabase.storage.from('images').upload(filePath, file);
        
        await createPicture(data ? data.path:"", parseInt(eventId ? eventId:""));
        
        if (error) throw error;
        
        
        if (error) {
            console.log('error');
            
        } else {
            console.log('ok')
        }
    };
    
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
            {isCamera && <CameraComponent eventId={parseInt(eventId ? eventId:"")} />}
            
            <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            <label className="block text-lg font-medium text-gray-800 mb-2">Télécharger une image 📸</label>
            
            <div className="flex items-center space-x-4">
            {/* Input de fichier */}
            <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 file:py-2 file:px-4 file:border-0 file:bg-gray-800 file:text-white file:font-medium file:cursor-pointer file:rounded-lg hover:file:bg-gray-700"
            />
            
            {/* Bouton de téléchargement */}
            <button
            onClick={uploadImage}
            disabled={uploading}
            className={`px-6 py-3 text-white font-bold rounded-lg shadow-lg transition-transform ${
                uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105"
            }`}
            >
            {uploading ? "Téléchargement..." : "Télécharger"}
            </button>
            </div>
            
            {/* Affichage de l'image téléchargée */}
            {imageUrl && (
                <div className="mt-6 text-center">
                <p className="text-green-600 font-medium">Image téléchargée avec succès ! 🎉</p>
                <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-4 mx-auto rounded-lg shadow-md w-40 h-40 object-cover"
                />
                </div>
            )}
            </div>
            
            
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
