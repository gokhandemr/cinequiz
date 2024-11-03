// Style
import style from "./style.module.css";
// Icons
import heartIcon from "../../assets/heart-icon.svg";
import scoreIcon from "../../assets/score-icon.png";
import gameScoreIcon from "../../assets/game-score-icon.png";

export default function GameRemainingLives({remainingGameLives, gameScore, bestScore}) {
  const language = localStorage.getItem("language");

  return (
    <div className={style.container}>
      <p>
        <img src={heartIcon} alt="heart icon" />
        {language === "tr" ? "Can: " : "Healt: "}
        <strong className={`${remainingGameLives < 35 ? style.danger : remainingGameLives < 70 ? style.warning : ""}`}>{remainingGameLives}</strong>
      </p>
      <span> | </span>
      <p>
        <img src={gameScoreIcon} alt="score icon" />
        {language === "tr" ? "Şuanki Skor: " : "Score: "}
        <strong>{gameScore}</strong>
      </p>
      <span> | </span>
      <p>
        <img src={scoreIcon} alt="best score icon" />
        {language === "tr" ? "En iyi skor:" : "Best score: "}
        <strong>{bestScore}</strong>
      </p>
    </div>
  );
}
