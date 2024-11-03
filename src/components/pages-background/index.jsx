// Style
import style from "./style.module.css";

export default function PagesBackground({image}) {
  return (
    <>
      <div className={style.shadow}></div>
      <img className={style.container} src={image} alt="movies page image" />
    </>
  );
}
