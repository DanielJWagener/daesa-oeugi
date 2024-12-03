import MediaLink from "./MediaLink";
import mediaListData from "./mediaList.json";

const MediaList = () => {
  return (
    <div className="px-3">
      <h1 className="my-5 noto-sans-kr-400">영화나 드라마를 선택하세요:</h1>
      <div className="overscroll-y-auto py-5 grid">
        <ul className="list-none">
          {mediaListData.map(x => (
            <MediaLink key={x.id} media={x} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaList;
