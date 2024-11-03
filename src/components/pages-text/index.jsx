// Style
import style from "./style.module.css";

export default function PagesText({title, description, isHomePage}) {
  return (
    <div className={`${style.container} ${isHomePage ? style.homePage : ""}`}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
