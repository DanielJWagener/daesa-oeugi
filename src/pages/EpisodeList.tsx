import { useEffect, useState } from "react";
import { useParams } from "react-router";

const EpisodeList = () => {
  const { media } = useParams();
  const [episodeList, setEpisodeList] = useState<string[]>();

  useEffect(() => {
    if (media) {
      import(`../assets/${media}/episode-list.json`)
        .then(res => {
          setEpisodeList(res.default);
        })
        .catch(e => console.error(e));
    }
  });

  return (
    episodeList && (
      <ul>
        {episodeList.map((x, i) => {
          return (
            <li key={x}>
              <span className="noto-sans-kr-600">{`${i + 1}화:`}</span> {x}
            </li>
          );
        })}
      </ul>
    )
  );
};

export default EpisodeList;
