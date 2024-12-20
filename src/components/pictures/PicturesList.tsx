import { useEffect, useState } from "react";
import { getPicture } from "../../services/pictureService";
import { Picture } from "./picture";
import { pictureInterface } from "../../entity/pictureInterface";

interface pictureListeProps {
  eventId: number;
}

export function PictureListe({ eventId }: pictureListeProps) {
  const [pictures, setPictures] = useState<pictureInterface[]>([]);

  useEffect(() => {
    if (eventId) {
      refreshPictures();
      console.log(eventId);
    }
  }, [eventId]);

  async function refreshPictures() {
    try {
      const data = await getPicture(eventId);
      setPictures(data);
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    }
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pictures.map((picture: pictureInterface) => (
        <div
          key={picture.url}
          className="w-full h-48 rounded-lg shadow-md overflow-hidden"
        >
          <div className="w-full h-full">
            <Picture picture={picture} />
          </div>
        </div>
      ))}
    </div>
  );
}
