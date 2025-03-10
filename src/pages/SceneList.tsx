import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import LoadingScreen from "../components/LoadingScreen";
import { ScriptDynamicImport } from "../types";
import DarkToggle from "../components/DarkToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SceneList = () => {
  const { media, episode } = useParams();
  const [sceneList, setSceneList] = useState<string[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (media) {
      import(`../assets/${media}/episodes/${episode}/script.json`)
        .then((res: ScriptDynamicImport) => {
          const sceneListResponse = res.default;
          if (sceneListResponse.length === 0) {
            setError("No scenes found");
          }
          if (sceneListResponse.length === 1) {
            navigate(`/${media}/episode/${episode}/scene/1`);
          } else {
            setSceneList(res.default.map((x) => x.title));
            setLoading(false);
          }
        })
        .catch((e) => {
          console.error(e);
          setError(e.message);
        });
    }
  }, [episode, media, navigate]);

  if (error) {
    return <h2>오류가 발생했습니다. 장면들을 못 불러왔습니다</h2>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    sceneList && (
      <div className="h-full w-full px-3">
        <header className="flex justify-between items-center h-[97px]">
          <h1 className="my-5 noto-sans-kr-400">장면</h1>
          <DarkToggle />
        </header>
        <ul>
          {sceneList.map((x, i, arr) => {
            const sceneListLength = arr.length;
            const lastScene = i === sceneListLength - 1;
            const sceneNumber = i + 1;
            const borderClass = lastScene
              ? ""
              : "border-b border-neutral-300 dark:border-neutral-500";
            return (
              <li
                key={x}
                className={`text-2xl noto-sans-kr-400 py-3 ${borderClass}`}
              >
                <Link
                  className="text-neutral-600 dark:text-neutral-300 block"
                  to={`/${media}/episode/${episode}/scene/${sceneNumber}`}
                >
                  <div className="inline-flex justify-between items-center w-full">
                    <div>
                      <span className="noto-sans-kr-600">{`${sceneNumber}장:`}</span>{" "}
                      {x}
                    </div>
                    <FontAwesomeIcon
                      className="mr-3 text-cyan-600 dark:text-cyan-300 text-2xl"
                      icon={faArrowRight}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default SceneList;
