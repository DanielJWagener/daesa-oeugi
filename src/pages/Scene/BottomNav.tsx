import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Scene } from "./sceneTypes";

type BottomNavPropTypes = {
  currentScene: Scene | undefined;
  hasCharacterBeenSeen: (character: string) => boolean;
  lineIndex: number;
  sceneIndex: number;
  script: Scene[] | undefined;
  setLineIndex: React.Dispatch<React.SetStateAction<number>>;
  setSceneIndex: React.Dispatch<React.SetStateAction<number>>;
  setSeenCharacters: React.Dispatch<React.SetStateAction<string[]>>;
};

const BottomNav = ({
  currentScene,
  hasCharacterBeenSeen,
  lineIndex,
  sceneIndex,
  script,
  setLineIndex,
  setSceneIndex,
  setSeenCharacters
}: BottomNavPropTypes) => {
  const showBackButton = !(sceneIndex === 0 && lineIndex === 0);
  const showForwardButton =
    script &&
    currentScene &&
    !(sceneIndex === script.length - 1 && lineIndex === currentScene.lines.length - 1);

  const showPreviousLine = useCallback(() => {
    if (!script) return;

    if (lineIndex === 0) {
      if (sceneIndex > 0) {
        const previousSceneIndex = sceneIndex - 1;
        const previousScene = script[previousSceneIndex];

        setSceneIndex(previousSceneIndex);
        setLineIndex(previousScene.lines.length - 1);
      }
      return;
    }

    const previousLineIndex = lineIndex - 1;

    // don't display character names when going backwards
    const previousLine = currentScene?.lines[previousLineIndex];
    const previousSpeaker = previousLine?.speaker;
    if (previousSpeaker) {
      setSeenCharacters(prev => [...prev, previousLine?.speaker]);
    }

    setLineIndex(previousLineIndex);
  }, [
    currentScene?.lines,
    lineIndex,
    sceneIndex,
    script,
    setLineIndex,
    setSceneIndex,
    setSeenCharacters
  ]);

  const showNextLine = useCallback(() => {
    const currentScene = script?.[sceneIndex];
    if (!currentScene) return;

    if (lineIndex === currentScene.lines.length - 1) {
      const nextSceneIndex = sceneIndex + 1;
      if (script[nextSceneIndex]) {
        setSceneIndex(nextSceneIndex);
        setLineIndex(0);
        setSeenCharacters([]);
      }
      return;
    }

    // Mark current character as seen
    const character = script[sceneIndex].lines[lineIndex].speaker;
    if (!hasCharacterBeenSeen(character)) {
      setSeenCharacters(prev => [...prev, character]);
    }

    const nextLineIndex = lineIndex + 1;
    setLineIndex(nextLineIndex);
  }, [
    hasCharacterBeenSeen,
    lineIndex,
    sceneIndex,
    script,
    setLineIndex,
    setSceneIndex,
    setSeenCharacters
  ]);

  return (
    <div className="w-full flex justify-between fixed bottom-0 p-5">
      <button
        onClick={showPreviousLine}
        className={`rounded-md ${showBackButton ? "opacity-100" : "opacity-0"}`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={showNextLine}
        className={`rounded-md ${showForwardButton ? "opacity-100" : "opacity-0"}`}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default BottomNav;
