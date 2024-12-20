import { Scene } from "./sceneTypes";

type LineDisplayProps = {
  currentScene: Scene | undefined;
  hasCharacterBeenSeen: (character: string) => boolean;
  lineIndex: number;
};

const LineDisplay = ({ currentScene, hasCharacterBeenSeen, lineIndex }: LineDisplayProps) => {
  const currentLine = currentScene?.lines[lineIndex];
  const lineText = currentLine?.line;
  const character = currentLine?.speaker;

  const showCharacterName = character && !hasCharacterBeenSeen(character);
  return currentLine ? (
    <div>
      {showCharacterName && <p>{`${character}:`}</p>}
      <p>{lineText}</p>
    </div>
  ) : (
    <></>
  );
};

export default LineDisplay;
