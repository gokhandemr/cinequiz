// Style
import style from "./style.module.css";
// Icons
import viewDetailsIcon from "../../assets/view-details-icon.png";
import changeImageIcon from "../../assets/change-image-icon.png";
import playClipIcon from "../../assets/play-clip-icon.png";
import passOne from "../../assets/pass-one.png";
import passTwo from "../../assets/pass-two.png";
import passThree from "../../assets/pass-three.png";
import passFour from "../../assets/pass-four.png";
import passFive from "../../assets/pass-five.png";
import passZero from "../../assets/pass-zero.png";

export default function GameButtons({
  setRemainingGameLives,
  remainingGameLives,
  setProductionTips,
  setProductionImageCount,
  setProductionClipIsActive,
  productionClipIsActive,
  productionClip,
  productionImagesLength,
  productionTips,
  remainingPassLives,
  setRemainingPassLives,
  setProductionCount,
  setInputValue,
  productionTitle,
  productionOriginalTitle,
}) {
  const language = localStorage.getItem("language");

  const viewGameTips = () => {
    if (remainingGameLives > 2) {
      if (!productionTips) {
        setProductionTips(true);
        setProductionClipIsActive && setProductionClipIsActive(false);
        setRemainingGameLives((prev) => prev - 2);
      } else {
        alert("Zaten Açık");
      }
    } else {
      alert(language === "tr" ? "Bu ipucu için yeterli canınız bulunmuyor." : "You don't have enough health for this tip.");
    }
  };

  const changeImage = () => {
    if (remainingGameLives > 3) {
      setProductionTips(false);
      setProductionImageCount((prev) => prev + 1);
      setRemainingGameLives((prev) => prev - 3);
      productionClip && setProductionClipIsActive(false);
    } else {
      alert(language === "tr" ? "Bu ipucu için yeterli canınız bulunmuyor." : "You don't have enough health for this tip.");
    }
  };

  const playClip = () => {
    if (remainingGameLives > 5) {
      if (!productionClipIsActive) {
        setProductionTips(false);
        setProductionClipIsActive(true);
        setRemainingGameLives((prev) => prev - 5);
      } else {
        alert(language === "tr" ? "Zaten klip gösteriliyor.." : "The clip is already playing");
      }
    } else {
      alert(language === "tr" ? "Bu ipucu için yeterli canınız bulunmuyor." : "You don't have enough health for this tip.");
    }
  };

  const passButton = () => {
    if (remainingPassLives !== 0) {
      let text = language === "tr" ? "Pas hakkınızı kullanmak istediğinize emin misiniz?" : "Are you sure you want to use your pass?";
      if (confirm(text) == true) {
        alert((language === "tr" ? "Doğru Cevaplar: " : "Correct Answers") + "\r\t" + productionTitle + " / " + "\r\t" + productionOriginalTitle);
        setProductionCount((prev) => prev + 1);
        setInputValue("");
        setRemainingPassLives(remainingPassLives - 1);
        setProductionTips(false);
        setProductionImageCount(0);
        setProductionClipIsActive && setProductionClipIsActive(false);
      }
    } else {
      alert(language === "tr" ? "Pas Hakkınız Bulunmuyor.." : "You don't have a pass.");
    }
  };

  return (
    <div className={style.container}>
      <button type="button" className={style.button} onClick={passButton}>
        <img
          src={`${remainingPassLives === 5 ? passFive : remainingPassLives === 4 ? passFour : remainingPassLives === 3 ? passThree : remainingPassLives === 2 ? passTwo : remainingPassLives === 1 ? passOne : passZero}`}
          alt="pass icon"
          width={24}
          height={24}
        />
        {language === "tr" ? "Pas Hakkını Kullan" : "Use your pass"}
      </button>

      <button type="button" className={style.button} onClick={viewGameTips}>
        <img src={viewDetailsIcon} alt="view details icon" width={18} height={18} />
        {language === "tr" ? "Detayları Göster" : "Show Details"}
      </button>

      {productionImagesLength > 2 && (
        <button type="button" className={style.button} onClick={changeImage}>
          <img src={changeImageIcon} alt="change image icon" width={18} height={18} />
          {language === "tr" ? "Resmi Değiştir" : "Change Image"}
        </button>
      )}

      {productionClip && productionClip.key && (
        <button type="button" className={style.button} onClick={playClip}>
          <img src={playClipIcon} alt="play clip icon" width={18} height={18} />
          {language === "tr" ? "Klibi Oynat" : "Play Trailer"}
        </button>
      )}
    </div>
  );
}
