import { pictureInterface } from "../../entity/pictureInterface";
import { supabase } from "../../supabaseConfig";

interface pictureProps {
  picture: pictureInterface;
}
export function Picture({ picture }: pictureProps) {
  const { data } = supabase.storage
  .from("images") // Assurez-vous que "images" est le bon nom de votre bucket
  .getPublicUrl(picture.url); // Le nom du fichier téléchargé
  console.log(data.publicUrl);
  console.log(picture.url);
  
  
  return <img src={data.publicUrl} alt={picture.url} />;
}
