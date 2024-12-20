import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { createPicture } from "../services/pictureService";
import { supabase } from "../supabaseConfig";

interface CameraComponentProps {
  eventId: number;
}


const CameraComponent = ({ eventId }: CameraComponentProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [images, setImages] = useState<string[]>([]);

  const captureImage = async () => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      console.log(screenshot);
      
      if (screenshot) {
        const byteString = atob(screenshot.split(',')[1]);  // Convertir en chaîne de caractères binaire
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);
  
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([uintArray], { type: 'image/jpeg' });  // Créer un Blob avec l'image
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
  
        setImages((prevPicture) => [...prevPicture, screenshot]); // Affiche l'image capturée à l'utilisateur
        
        try {
          // Générer un chemin fictif ou un nom de fichier
          
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;
      
          const { data, error } = await supabase.storage.from('images').upload(filePath, file);
          
          await createPicture(data ? data.path:"", eventId);

          if (error) throw error;
    

          if (error) {
              console.log('error');
              
          } else {
              console.log('ok')
          }

          console.log("Chemin sauvegardé :", filePath);
        } catch (error) {
          console.error("Erreur lors de la sauvegarde :", error);
        }
      }
    }
  };

  return (
    <div>
    <div className="flex flex-col">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button
        className="border mt-2 text-blue px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={captureImage}
      >
        Capture
      </button>
      {images &&
        images.map((image) => {
          return <img src={image} alt={image} />;
        })}
    </div>
</div>
  );
};

export default CameraComponent;
