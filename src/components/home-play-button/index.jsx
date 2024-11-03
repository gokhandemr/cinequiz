// Style
import style from "./style.module.css";
// Router DOM
import {Link} from "react-router-dom";

export default function PlayButton() {
  return (
    <div className={style.container}>
      <Link to={"/movies"}>{localStorage.getItem("language") === "tr" ? "Film" : "Movie"}</Link>
      <Link to={"/series"}>{localStorage.getItem("language") === "tr" ? "Dizi" : "TV Series"}</Link>
    </div>
  );
}
