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
    <ul>
      {pictures.map((picture: pictureInterface) => {
        return (
          <li key={picture.url}>
            <Picture picture={picture} />
          </li>
        );
      })}
    </ul>
  );
}
