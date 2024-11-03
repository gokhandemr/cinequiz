import {useEffect, useState} from "react";
// Router DOM
import {Link, useNavigate} from "react-router-dom";
// Style
import style from "./style.module.css";
// Icons
import menuIcon from "../../assets/menu-icon.png";
import closeIcon from "../../assets/close-icon.png";
import toggleOn from "../../assets/toggle-on.png";
import toggleOff from "../../assets/toggle-off.png";
import turkeyFlag from "../../assets/turkey-flag.png";
import englishFlag from "../../assets/english.png";

export default function Header({isGamePage}) {
  const navigate = useNavigate();
  const [responsiveMenuIsOpen, setResponsiveMenuIsOpen] = useState(false);

  const [language, setLanguage] = useState(localStorage.getItem("language") || "tr");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <header className={`${style.container} ${isGamePage ? style.gamePageContainer : ""} ${responsiveMenuIsOpen ? style.responsiveMenuContainer : ""}`}>
      <div>
        <button className={style.responsiveMenuButton} onClick={() => setResponsiveMenuIsOpen(!responsiveMenuIsOpen)}>
          {responsiveMenuIsOpen ? <img src={closeIcon} alt="close icon" width={24} height={24} /> : <img src={menuIcon} alt="menu icon" width={24} height={24} />}
        </button>
        {!responsiveMenuIsOpen && (
          <Link to={"/"}>
            <h1>CINEQUIZ</h1>
            <span className={style.betaText}>beta</span>
          </Link>
        )}

        {!isGamePage && (
          <nav>
            <ul>
              <li>
                <Link to={"/"}>{language === "tr" ? "Anasayfa" : "Home"}</Link>
              </li>
              <li>
                <Link to={"/how-to-play"}>{language === "tr" ? "Nasıl Oynanır?" : "How to play?"}</Link>
              </li>
              <li>
                <Link to={"/movies"}>{language === "tr" ? "Filmler" : "Movies"}</Link>
              </li>
              <li>
                <Link to={"/series"}>{language === "tr" ? "Diziler" : "Tv Series"}</Link>
              </li>

              <li>
                <button className={style.languageButton} type="button" onClick={() => (setLanguage(language === "tr" ? "eng" : "tr"), navigate(0))}>
                  <img src={turkeyFlag} width={16} height={16} className={`${style.flag} ${language === "tr" ? style.active : ""}`} />
                  <img src={`${language === "tr" ? toggleOff : toggleOn}`} width={32} height={32} />
                  <img src={englishFlag} width={16} height={16} className={`${style.flag} ${language === "eng" ? style.active : ""}`} />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
