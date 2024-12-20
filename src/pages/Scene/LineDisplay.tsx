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
      <div className="h-full px-5 grid place-content-center">
        {showCharacterName && <p className="text-center mb-3">{`${character}:`}</p>}
        <p className="text-center">{lineText}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LineDisplay;
