import {useEffect, useState} from "react";
// Style
import style from "./style.module.css";
// Services
import {searchProductions} from "../../services";
// Icon
import okayIcon from "../../assets/okay-icon.png";

export default function ProductSearchForm({inputValue, setInputValue, productTitle, productOriginalTitle, setProductionCount, setGameScore, setRemainingGameLives, setProductionImageCount, setProductionTips, setProductionClipIsActive, isMovie}) {
  const language = localStorage.getItem("language");

  const [searchResults, setSearchResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredValue = inputValue
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    const filteredTitle = productTitle
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    const filteredOriginalTitle = productOriginalTitle
      .trim()
      .toUpperCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

    if (filteredValue.length > 0) {
      if (filteredValue === filteredTitle || filteredValue === filteredOriginalTitle) {
        alert(language === "tr" ? "Tebrikler, cevabınız doğru." : "Congratulations, your answer is correct.");
        setInputValue("");
        setProductionCount((prev) => prev + 1);
        setGameScore((prev) => prev + 1);
        setProductionImageCount(0);
        setProductionTips(false);
        setProductionClipIsActive && setProductionClipIsActive(false);
      } else {
        alert((language === "tr" ? "Malesef cevabınız yanlış. Doğru Cevap:" : "Sorry, your answer is incorrect. Correct Answer:") + "\r\t" + productTitle + " / " + "\r\t" + productOriginalTitle);
        setRemainingGameLives((prev) => prev - 5);
        setProductionImageCount(0);
        setProductionTips(false);
        setProductionCount((prev) => prev + 1);
        setInputValue("");
        setProductionClipIsActive && setProductionClipIsActive(false);
      }
    } else {
      alert(language === "tr" ? "Film / Dizi adını eksik veya hatalı yazdınız. Lütfen tekrardan kontrol ediniz." : "You misspelled the name of the movie or series. Please check again.");
    }
  };

  useEffect(() => {
    inputValue.length > 2 &&
      (async () => {
        const response = await searchProductions(isMovie, inputValue);
        setSearchResults(response.results);
      })();
    inputValue.length === 0 && setSearchResults(null);
  }, [inputValue]);

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <input autoFocus id="input" placeholder={language === "tr" ? "Noktalama işaretlerine dikkat edin!!" : "Please pay attention to punctuation"} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit" className={style.formButton}>
          <img src={okayIcon} alt="okay button icon" width={24} height={24} />
        </button>
      </form>

      {inputValue.length > 2 && (
        <ul>
          {searchResults &&
            searchResults.map((product, index) => (
              <button onClick={() => setInputValue(isMovie ? product.title : product.name)} key={index} className={style.resultsButton}>
                {isMovie ? product.title : product.name}
              </button>
            ))}
        </ul>
      )}
    </div>
  );
}
