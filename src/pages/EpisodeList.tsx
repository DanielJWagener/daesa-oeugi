import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const EpisodeList = () => {
  const { media } = useParams();
  const [episodeList, setEpisodeList] = useState<string[]>();
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (media) {
      import(`../assets/${media}/episode-list.json`)
        .then(res => {
          const episodeListRepsonse = res.default;
          if (episodeListRepsonse.length === 0) {
            setError("No episodes found");
          }
          if (episodeListRepsonse.length === 1) {
            navigate(`/${media}/episode/1`);
          } else {
            setEpisodeList(res.default);
          }
        })
        .catch(e => {
          console.error(e);
          setError(e.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <h2>오류가 발생했습니다. 회차를 못 불러왔습니다</h2>;
  }

  return (
    episodeList && (
      <>
        <h1 className="my-5 noto-sans-kr-400">회차</h1>
        <ul>
          {episodeList.map((x, i) => {
            const episodeNumber = i + 1;
            return (
              <li key={x} className="text-2xl noto-sans-kr-400">
                <Link to={`/${media}/episode/${episodeNumber}`}>
                  <span className="noto-sans-kr-600">{`${episodeNumber}화:`}</span> {x}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    )
  );
};

export default EpisodeList;
