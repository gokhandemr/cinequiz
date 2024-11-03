// Router DOM
import {Link} from "react-router-dom";
// Style
import style from "./style.module.css";
// Logo
import tmdbLogo from "../../assets/tmdb-logo.svg";

export default function Footer() {
  const language = localStorage.getItem("language");

  return (
    <footer className={style.container}>
      <div>
        <div>
          <h4>CINEQUIZ</h4>
        </div>
        {language === "eng" && (
          <div>
            <p>"This website utilizes ChatGPT for English translations."</p>
          </div>
        )}
        <div className={style.tmdbContainer}>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          <img src={tmdbLogo} alt="tmdb logo" />
        </div>
      </div>
    </footer>
  );
}
