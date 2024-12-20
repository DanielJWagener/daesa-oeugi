import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import BackButton from "./BackButton";
import BottomNav from "./BottomNav";
import LineDisplay from "./LineDisplay";
import { Scene } from "./sceneTypes";
import SceneHeader from "./SceneHeader";

const SceneDisplay = () => {
  const { media, episode, scene } = useParams();

  const [script, setScript] = useState<Scene[]>();
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [seenCharacters, setSeenCharacters] = useState<string[]>([]);

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

  const hasCharacterBeenSeen = useCallback(
    (character: string) => seenCharacters.includes(character),
    [seenCharacters]
  );

  if (error) {
    return <h2>오류가 발생했습니다. 장면의 대사들을 못 불러왔습니다</h2>;
  }

  if (loading) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }

  const currentScene = script?.[sceneIndex];

  return (
    <div className="w-full">
      <BackButton />
      <SceneHeader currentScene={currentScene} />
      <LineDisplay
        currentScene={currentScene}
        hasCharacterBeenSeen={hasCharacterBeenSeen}
        lineIndex={lineIndex}
      />
      <BottomNav
        currentScene={currentScene}
        hasCharacterBeenSeen={hasCharacterBeenSeen}
        lineIndex={lineIndex}
        sceneIndex={sceneIndex}
        script={script}
        setLineIndex={setLineIndex}
        setSceneIndex={setSceneIndex}
        setSeenCharacters={setSeenCharacters}
      />
    </div>
  );
};

export default SceneDisplay;
