import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const SceneList = () => {
  const { media, episode } = useParams();
  const [sceneList, setSceneList] = useState<string[]>();
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (media) {
      import(`../assets/${media}/scenes/${episode}.json`)
        .then(res => {
          const sceneListResponse = res.default;
          if (sceneListResponse.length === 0) {
            setError("No scenes found");
          }
          if (sceneListResponse.length === 1) {
            navigate(`/${media}/episode/${episode}/scene/1`);
          } else {
            setSceneList(res.default);
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

  return (
    sceneList && (
      <>
        <h1 className="my-5 noto-sans-kr-400">장면</h1>
        <ul>
          {sceneList.map((x, i) => {
            const sceneNumber = i + 1;
            return (
              <li key={x} className="text-2xl noto-sans-kr-400">
                <Link to={`/${media}/episode/${episode}/scene/${sceneNumber}`}>
                  <span className="noto-sans-kr-600">{`${sceneNumber}장:`}</span> {x}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    )
  );
};

export default SceneList;
