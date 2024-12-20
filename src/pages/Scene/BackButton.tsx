import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
  const { media, episode } = useParams();

  return (
    <Link to={`/${media}/episode/${episode}`}>
      <button className="rounded-md">
        <FontAwesomeIcon icon={faHome} />
      </button>
    </Link>
  );
};

export default BackButton;
