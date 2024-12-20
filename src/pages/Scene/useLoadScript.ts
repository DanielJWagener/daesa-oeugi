import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Scene } from "./sceneTypes";

const useLoadScript = ({
  setSceneIndex
}: {
  setSceneIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { media, episode, scene } = useParams();

  const [script, setScript] = useState<Scene[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (media) {
      import(`../../assets/${media}/episodes/${episode}/script.json`)
        .then(res => {
          const sceneListResponse = res.default;
          if (sceneListResponse.length === 0) {
            setError("Could not load scene");
          }

          const scriptResponse = res.default as Scene[];
          setScript(scriptResponse);

          const sceneIndex = scriptResponse.findIndex((x: Scene) => x.key === scene);
          setSceneIndex(sceneIndex);
          setLoading(false);
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
          setError(e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, loading, script };
};

export default useLoadScript;
