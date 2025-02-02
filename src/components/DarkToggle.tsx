import { useCallback } from "react";
import { useTheme } from "./ThemeProvider";

const DarkToggle = () => {
  const { theme, setTheme } = useTheme();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      console.log(e.target.checked);
      setTheme(e.target.checked ? "dark" : "light");
    },
    [setTheme]
  );

  return (
    <label className="items-center flex flex-col cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={theme === "dark"}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <p className="mt-1 text-base font-medium noto-sans-kr-40 text-gray-900 dark:text-gray-400">
        다크 모드
      </p>
    </label>
  );
};

export default DarkToggle;
