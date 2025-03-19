// Style
import style from './style.module.css';

export default function AlertModal({text}) {
  return (
    <div className={style.container}>
      <p>{text}</p>
    </div>
  );
}
