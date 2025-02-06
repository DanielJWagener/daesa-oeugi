import { useCallback, useMemo } from "react";

interface CharacterManagerArgs {
  sceneIndex: number;
}

interface AddRollingLookupEntryArgs {
  sceneIndex: number;
  character: string;
}

const tailwindColors = [
  "neutral",
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "indigo",
  "fuchsia",
  "slate",
  "rose",
  "amber",
  "lime",
  "teal",
  "sky",
  "violet",
  "pink",
  "zinc",
  "emerald",
  "blue",
  "purple",
  "gray",
  "stone",
];

const useCharacterManager = ({ sceneIndex }: CharacterManagerArgs) => {
  const permanentCharacterColorLookup = useMemo(
    () =>
      ({
        영우: "cyan",
        광호: "orange",
        규식: "red",
        영란: "fuchsia",
        준호: "green",
        명석: "amber",
      } as Record<string, string>),
    []
  );

  const rollingColorLookupMap = useMemo(() => {
    const lookup = new Map() as Map<number, Map<string, string>>;

    return lookup;
  }, []);

  const colorClassLookup = useMemo(
    () =>
      ({
        amber: "text-amber-700 dark:text-amber-500",
        cyan: "text-cyan-700 dark:text-cyan-300",
        fuchsia: "text-fuchsia-700 dark:text-fuchsia-300",
        green: "text-green-700 dark:text-green-300",
        indigo: "text-indigo-700 dark:text-indigo-300",
        neutral: "text-neutral-700 dark:text-neutral-200",
        orange: "text-orange-600 dark:text-orange-300",
        red: "text-red-700 dark:text-red-300",
        rose: "text-rose-700 dark:text-rose-300",
        slate: "text-slate-700 dark:text-slate-300",
        yellow: "text-yellow-700 dark:text-yellow-300",
      } as Record<string, string>),
    []
  );

  const getNewColor = useCallback((takenColors: string[]) => {
    return tailwindColors.find((x) => !takenColors.includes(x)) || "neutral";
  }, []);

  const addRollingLookupEntry = useCallback(
    ({ sceneIndex, character }: AddRollingLookupEntryArgs) => {
      const permanentColors = Object.values(permanentCharacterColorLookup);

      if (rollingColorLookupMap.has(sceneIndex)) {
        const currentScene = rollingColorLookupMap.get(sceneIndex)!;
        const sceneColors = currentScene.values();
        currentScene.set(
          character,
          getNewColor([...permanentColors, ...sceneColors])
        );
      } else {
        const newScene = new Map();
        newScene.set(character, getNewColor(permanentColors));
        rollingColorLookupMap.set(sceneIndex, newScene);
      }
    },
    [getNewColor, permanentCharacterColorLookup, rollingColorLookupMap]
  );

  const getColorClassForCharacter = useCallback(
    (character: string | undefined) => {
      const neutralTextClass = colorClassLookup.neutral;
      if (!character) return neutralTextClass;

      if (character in permanentCharacterColorLookup) {
        const characterColor = permanentCharacterColorLookup[character];
        return colorClassLookup[characterColor]!;
      } else if (rollingColorLookupMap.has(sceneIndex)) {
        const currentSceneColorLookup = rollingColorLookupMap.get(sceneIndex)!;
        if (currentSceneColorLookup.has(character)) {
          const characterColor = currentSceneColorLookup.get(character)!;
          return colorClassLookup[characterColor] || neutralTextClass;
        }
      }

      addRollingLookupEntry({ sceneIndex, character });
      const characterColor = rollingColorLookupMap
        .get(sceneIndex)!
        .get(character)!;
      return colorClassLookup[characterColor] || neutralTextClass;
    },
    [
      addRollingLookupEntry,
      colorClassLookup,
      permanentCharacterColorLookup,
      rollingColorLookupMap,
      sceneIndex,
    ]
  );

  return { permanentCharacterColorLookup, getColorClassForCharacter };
};

export default useCharacterManager;
