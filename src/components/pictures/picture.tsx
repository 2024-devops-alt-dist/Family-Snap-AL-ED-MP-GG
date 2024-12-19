import { pictureInterface } from "../../entity/pictureInterface";

interface pictureProps {
  picture: pictureInterface;
}
export function Picture({ picture }: pictureProps) {
  return <img src={picture.url} alt={picture.url} />;
}
