// Style
import style from "./style.module.css";
// Icons
import closeIcon from "../../assets/close-icon.png";

export default function ProductionDetails({releaseDate, tagline, actors, directors, setProductionTips, productionTitle, image}) {
  const language = localStorage.getItem("language");

  return (
    <div className={style.container}>
      <button className={style.closeButton} type="button" onClick={() => setProductionTips(false)}>
        <img src={closeIcon} alt="close icon" />
      </button>
      <img src={`https://image.tmdb.org/t/p/original${image}`} className={style.detailsBackground} />

      {productionTitle && (
        <div className={style.tags}>
          <h4>{language === "tr" ? "İsminin Karmaşık Hali" : "Mixed title"}</h4>
          <div>
            <ul>
              <li>
                {[...productionTitle]
                  .sort(() => Math.random() - 0.75)
                  .join(" ")
                  .toUpperCase()}
              </li>
            </ul>
          </div>
        </div>
      )}

      {releaseDate && (
        <div className={style.releaseDate}>
          <h4>{language === "tr" ? "Çıkış Tarihi" : "Release Date"}</h4>
          <div>
            <p>{releaseDate}</p>
          </div>
        </div>
      )}

      {tagline && (
        <div className={style.tagline}>
          <h4>{language === "tr" ? "Slogan" : "Tagline"}</h4>
          <div>
            <p>{tagline}</p>
          </div>
        </div>
      )}

      {directors && (
        <div className={style.directors}>
          <h4>{language === "tr" ? "Yönetmen" : "Directors"}</h4>
          <div>
            <ul>{directors.map((director, index) => director.job === "Director" && <li key={index}>{director.name}</li>)}</ul>
          </div>
        </div>
      )}

      {actors && (
        <div className={style.actors}>
          <h4>{language === "tr" ? "Oyuncular" : "Actors"}</h4>
          <div>
            <ul>{actors && actors.map((actor, index) => <li key={index}>{actor.name}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}
