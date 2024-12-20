import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <FontAwesomeIcon icon={faSpinner} spin size="6x" />
    </div>
  );
};

export default LoadingScreen;
