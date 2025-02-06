import { useCallback, useState } from "react";

import BackButton from "./BackButton";
import BottomNav from "./BottomNav";
import LineDisplay from "./LineDisplay";
import SceneHeader from "./SceneHeader";
import useLoadScript from "./useLoadScript";
import useCharacterManager from "./useCharacterManager";
import LoadingScreen from "../../components/LoadingScreen";
import DarkToggle from "../../components/DarkToggle";

const SceneDisplay = () => {
  const [lineIndex, setLineIndex] = useState<number>(0);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [seenCharacters, setSeenCharacters] = useState<string[]>([]);

  const { error, loading, script } = useLoadScript({ setSceneIndex });

  const hasCharacterBeenSeen = useCallback(
    (character: string) => seenCharacters.includes(character),
    [seenCharacters]
  );

  const { getColorClassForCharacter } = useCharacterManager({ sceneIndex });

  if (error) {
    return <h2>오류가 발생했습니다. 장면의 대사들을 못 불러왔습니다</h2>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  const currentScene = script?.[sceneIndex];

  return (
    <div className="w-full">
      <div className="h-screen px-3 pb-24 grid grid-rows-[auto_auto_1fr] overflow-y-scroll">
        <div className="flex justify-between h-[97px] items-center">
          <BackButton />
          <div className="self-center">
            <DarkToggle />
          </div>
        </div>
        <SceneHeader currentScene={currentScene} />
        <LineDisplay
          currentScene={currentScene}
          getColorForCharacter={getColorClassForCharacter}
          hasCharacterBeenSeen={hasCharacterBeenSeen}
          lineIndex={lineIndex}
        />
      </div>

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
