// Router DOM
import { Link } from 'react-router-dom';
// Style
import style from './style.module.css';

export default function LinkButton({ title, href, styles, icon }) {
  return (
    <Link to={href} className={style.container} style={styles ? styles : {}}>
      {icon && <img src={icon} alt='title icon' />}
      {title}
    </Link>
  );
}
