// Style
import style from './style.module.css';
// Gif
import gandalf from '../../assets/images/gandalf.gif';

export default function LightMode() {
  return (
    <div className={style.container}>
      <img src={gandalf} alt='gandalf gif' />
      <span></span>
      <span>Henüz Açık tema yok! Belki daha sonra..</span>
    </div>
  );
}
