import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import debounce from "lodash.debounce";

const Themes = {
  Dark: "dark",
  Light: "light",
} as const;

type ThemeSetting = (typeof Themes)[keyof typeof Themes] | null;

type ThemeUpdateFunc = (
  theme: ThemeSetting,
  updateLocalStorage?: { updateLocalStorage: boolean }
) => void;

type ContextDefaultValue = {
  theme: string | null;
  setTheme: ThemeUpdateFunc;
};

const ThemeContext = createContext({
  theme: "dark",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_theme: ThemeSetting) => {},
} as ContextDefaultValue);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeSetting>("dark");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setLocalStorage = useCallback(
    debounce((theme: ThemeSetting) => {
      if (theme) {
        localStorage.setItem("theme", theme);
      }
    }, 3000),
    []
  );

  const updateTheme = useCallback(
    (
      theme: ThemeSetting,
      { updateLocalStorage }: { updateLocalStorage: boolean } = {
        updateLocalStorage: true,
      }
    ) => {
      const root = document.querySelector("html");
      const rootClasses = root?.classList;
      if (theme === "dark") {
        rootClasses?.add("dark");
      } else {
        rootClasses?.remove("dark");
      }

      setTheme(theme);
      if (updateLocalStorage) {
        setLocalStorage(theme);
      }
    },
    [setLocalStorage]
  );

  useEffect(() => {
    const localThemePreference = localStorage.getItem("theme") as ThemeSetting;

    if (localThemePreference) {
      updateTheme(localThemePreference, { updateLocalStorage: false });
    } else {
      updateTheme(Themes.Dark);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
