import { Scene } from "./sceneTypes";

type LineDisplayProps = {
  currentScene: Scene | undefined;
  getColorForCharacter: (character: string | undefined) => string;
  hasCharacterBeenSeen: (character: string) => boolean;
  lineIndex: number;
};

const LineDisplay = ({
  currentScene,
  getColorForCharacter,
  hasCharacterBeenSeen,
  lineIndex,
}: LineDisplayProps) => {
  const currentLine = currentScene?.lines[lineIndex];
  const lineText = currentLine?.line;
  console.log({ lineText });
  const character = currentLine?.speaker;

  const color = getColorForCharacter(character);

  const showCharacterName = character && !hasCharacterBeenSeen(character);
  return currentLine ? (
    <div>
      <div className={`h-full px-5 grid place-content-center ${color}`}>
        {showCharacterName && (
          <p
            className={`text-center text-2xl mb-3 ${color}`}
          >{`${character}:`}</p>
        )}
        <p
          className={`text-center text-3xl leading-normal break-keep whitespace-pre-line ${color}`}
        >
          {lineText}
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LineDisplay;
