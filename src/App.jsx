// Router DOM
import {Route, Routes} from "react-router-dom";
// Pages
import Home from "./pages/home";
import Movies from "./pages/movies";
import Series from "./pages/series";
import MoviesGamePage from "./pages/movies-game-page";
import SeriesGamePage from "./pages/series-game-page";
import HowToPlay from "./pages/how-to-play";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-to-play" element={<HowToPlay />} />
      <Route path="/movies/" element={<Movies />} />
      <Route path="/movies/:category" element={<MoviesGamePage />} />
      <Route path="/series" element={<Series />} />
      <Route path="/series/:category" element={<SeriesGamePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
