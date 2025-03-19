// Style
import style from './style.module.css';
// Icons
import healthIcon from '../../assets/icons/movie.svg';
import scoreIcon from '../../assets/icons/score.svg';

export default function GameStats({ health, score, time }) {
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={style.container}>
      <p className={style.time}>{formatTime(time)}</p>

      <p className={style.health}>
        {[...Array(5)].map((_, index) => (
          <img key={index} src={healthIcon} alt='icon' className={index >= health ? style.disabled : ''} />
        ))}
      </p>

      <p className={style.score}>
        <img src={scoreIcon} alt='icon' />
        <span>Şuanki Skor:</span>
        {score}
      </p>
    </div>
  );
}
