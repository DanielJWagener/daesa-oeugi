import { HashRouter, Routes, Route } from "react-router";

import "./App.css";

import EpisodeList from "./pages/EpisodeList";
import MediaList from "./pages/MediaList";
import Scene from "./pages/Scene";
import SceneList from "./pages/SceneList";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route index element={<MediaList />} />

          {/* Serial e.g. TV show*/}
          <Route path=":media/" element={<EpisodeList />} />
          <Route path=":media/episode/:episode" element={<SceneList />} />
          <Route
            path=":media/episode/:episode/scene/:scene"
            element={<Scene />}
          />

          {/* Standalone e.g. movie */}
          <Route path=":media/scenes" element={<SceneList />} />
          <Route path=":media/scenes/scene/:scene" element={<Scene />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
