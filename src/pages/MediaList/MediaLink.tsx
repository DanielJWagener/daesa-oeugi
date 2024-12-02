import { Link } from "react-router";
import { MediaItem } from "./MediaItem";

const MediaLink = ({ media }: { media: MediaItem }) => {
  const { id, label, serial } = media;

  return (
    <li className="text-2xl font-semibold">
      <Link to={serial ? `${id}/episodes` : `${id}/scenes`}>{label}</Link>
    </li>
  );
};

export default MediaLink;
