import { useMemo } from "react";

const useCharacterManager = () => {
  const colorLookup = useMemo(
    () =>
      ({
        영우: "cyan",
        광호: "orange",
        규식: "red",
        영란: "fuchsia"
      } as Record<string, string>),
    []
  );

  const colorClassLookup = useMemo(
    () =>
      ({
        cyan: "text-cyan-700 dark:text-cyan-300",
        orange: "text-orange-600 dark:text-orange-300",
        red: "text-red-700 dark:text-red-300",
        fuchsia: "text-fuchsia-700 dark:text-fuchsia-300"
      } as Record<string, string>),
    []
  );

  const getColorClassForCharacter = (character: string | undefined) => {
    const neutralTextClass = "text-neutral-700 dark:text-neutral-200";
    if (!character) return neutralTextClass;

    const characterColor = colorLookup[character];
    const colorClass = colorClassLookup[characterColor] || neutralTextClass;
    return colorClass;
  };

  return { colorLookup, getColorClassForCharacter };
};

export default useCharacterManager;
