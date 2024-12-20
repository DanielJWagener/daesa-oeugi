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
        cyan: "text-cyan-700",
        orange: "text-orange-600",
        red: "text-red-700",
        fuchsia: "text-fuchsia-700"
      } as Record<string, string>),
    []
  );

  const getColorClassForCharacter = (character: string | undefined) => {
    if (!character) return "neutral";
    console.log({ character, colorLookup, result: colorLookup[character] });
    const characterColor = colorLookup[character];
    const colorClass = colorClassLookup[characterColor] || "text-neutral-700";
    return colorClass;
  };

  return { colorLookup, getColorClassForCharacter };
};

export default useCharacterManager;
