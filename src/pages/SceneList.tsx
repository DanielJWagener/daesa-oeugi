import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import LoadingScreen from "../components/LoadingScreen";
import { ScriptDynamicImport } from "../types";

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
            setSceneList(res.default.map(x => x.title));
            setLoading(false);
          }
        })
        .catch(e => {
          console.error(e);
          setError(e.message);
        });
    }
  });

  if (error) {
    return <h2>오류가 발생했습니다. 장면들을 못 불러왔습니다</h2>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    sceneList && (
      <div className="h-full w-full px-3">
        <h1 className="my-5 noto-sans-kr-400">장면</h1>
        <ul>
          {sceneList.map((x, i) => {
            const sceneNumber = i + 1;
            return (
              <li key={x} className="text-3xl noto-sans-kr-400 mb-2">
                <Link to={`/${media}/episode/${episode}/scene/${sceneNumber}`}>
                  <span className="noto-sans-kr-600">{`${sceneNumber}장:`}</span> {x}
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
