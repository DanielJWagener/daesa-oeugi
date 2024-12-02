import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";

import EpisodeList from "./pages/EpisodeList";
import MediaList from "./pages/MediaList";
import Scene from "./pages/Scene";
import SceneList from "./pages/SceneList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MediaList />} />

        {/* Serial e.g. TV show*/}
        <Route path=":media/episodes" element={<EpisodeList />} />
        <Route path=":media/episodes/:episode" element={<SceneList />} />
        <Route path=":media/episodes/:episode/scene/:scene" element={<Scene />} />

        {/* Standalone e.g. movie */}
        <Route path=":media/scenes" element={<SceneList />} />
        <Route path=":media/scenes/scene/:scene" element={<Scene />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
