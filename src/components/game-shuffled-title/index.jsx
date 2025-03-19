import style from './style.module.css';

export default function GameShuffledTitle({title}) {
  return (
    <div className={style.container}>
      <p>{title}</p>
    </div>
  );
}
