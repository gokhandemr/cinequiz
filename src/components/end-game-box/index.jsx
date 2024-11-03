// Style
import style from "./style.module.css";
// Router DOM
import {useNavigate} from "react-router-dom";

export default function EndGameBox({gameScore, bestScore, categoryId}) {
  const language = localStorage.getItem("language");

  if (gameScore > bestScore) {
    localStorage.setItem(categoryId, gameScore);
  }

  const navigate = useNavigate();

  return (
    <>
      <div className={style.background}></div>
      <div className={style.container}>
        <h2>{language === "tr" ? "OYUN BİTTİ" : "GAME OVER"}</h2>
        <p>
          {language === "tr" ? "Toplam Skorunuz: " : "Total Score: "}
          <strong>{gameScore}</strong>
        </p>
        <div className={style.buttons}>
          <button type="button" onClick={() => navigate("/")}>
            {language === "tr" ? "Anasayfa" : "Homepage"}
          </button>
          <button type="button" onClick={() => navigate(0)}>
            {language === "tr" ? "Tekrar Oyna" : "Play Again"}
          </button>
        </div>
      </div>
    </>
  );
}
