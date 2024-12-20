import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { createPicture } from "../services/pictureService";

const CameraComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [images, setImages] = useState<string[]>([]);

  const captureImage = async () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        setImages((prevPicture) => [...prevPicture, screenshot]); // Affiche l'image capturée à l'utilisateur
        try {
          // Générer un chemin fictif ou un nom de fichier
          const filePath = `photos/image-${Date.now()}.jpg`;

          // Enregistrer ce chemin dans la base de données
          await createPicture(filePath);

          console.log("Chemin sauvegardé :", filePath);
        } catch (error) {
          console.error("Erreur lors de la sauvegarde :", error);
        }
      }
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={captureImage}
      >
        Prendre une photo
      </button>
      {images &&
        images.map((image) => {
          return <img src={image} alt={image} />;
        })}
    </div>
  );
};

export default CameraComponent;
