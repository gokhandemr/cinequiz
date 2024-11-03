// Router DOM
import {Link} from "react-router-dom";
// Style
import style from "./style.module.css";

export default function Categories({categories, isMovie}) {
  const language = localStorage.getItem("language") || "tr";
  return (
    <>
      <ul className={`${style.container} ${style.firstContainer}`}>
        <>
          {language === "tr" && (
            <li>
              <Link to={`${isMovie ? "/movies/tr" : "/series/tr"}`}>Yerli Yapımlar</Link>
            </li>
          )}
          <li>
            <Link to={`${isMovie ? "/movies/top-rated" : "/series/top-rated"}`}>{language === "tr" ? "Popüler Olanlar" : "Populer"}</Link>
          </li>
        </>
      </ul>

      <ul className={style.container}>
        {categories.length > 0 &&
          categories.map(({name, id}) =>
            id !== 99 && id !== 10770 && id !== 10767 && id !== 10764 && id !== 10763 && id !== 10766 ? (
              <li key={id}>
                <Link to={`${isMovie ? "/movies/" : "/series/"}${id}`}>{name}</Link>
              </li>
            ) : (
              ""
            )
          )}
      </ul>
    </>
  );
}
