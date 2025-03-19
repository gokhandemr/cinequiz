// Router DOM
import { Route, Routes } from "react-router-dom";
// Pages
import Home from "./pages/home";
import NotFoundPage from "./pages/not-found";
import GamePage from "./pages/game-page";
import Ranking from "./pages/ranking";
import HowToPlay from "./pages/how-to-play";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category/:origin" element={<GamePage />} />

      <Route path="/ranking" element={<Ranking />} />
      <Route path="/how-to-play" element={<HowToPlay />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;