import { useEffect, useState } from "react";
import { getPicture } from "../../services/pictureService";
import { Picture } from "./picture";
import { pictureInterface } from "../../entity/pictureInterface";

export function PictureListe() {
  const [pictures, setPictures] = useState<pictureInterface[]>([]);

  useEffect(() => {
    refreshPictures();
  }, []);

  async function refreshPictures() {
    try {
      const data = await getPicture();
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
