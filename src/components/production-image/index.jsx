// Style
import style from "./style.module.css";

export default function ProductionImage({image}) {
  return (
    <div className={style.container}>
      <img className={style.responsiveImage} src={`https://image.tmdb.org/t/p/original${image}`} />
      <img src={`https://image.tmdb.org/t/p/original${image}`} />
    </div>
  );
}
