import { Scene } from "./sceneTypes";

const SceneHeader = ({ currentScene }: { currentScene: Scene | undefined }) => {
  const sceneKey = currentScene?.key;
  const sceneTitle = currentScene?.title;

  return currentScene ? (
    <h1 className="text-center text-4xl text-neutral-700 dark:text-neutral-200">{`${sceneKey}장: ${sceneTitle}`}</h1>
  ) : (
    <></>
  );
};

export default SceneHeader;
