import style from './style.module.css';

export default function GameImage({ image, imageTitle, shuffledTitleIsOpen, answerStatus }) {
  return (
    <div className={` ${style.container} ${shuffledTitleIsOpen ? style.shuffledTitleActive : ''} ${answerStatus ? style.correct : answerStatus === false ? style.wrong : ''}`}>
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt={imageTitle} />
      <img src={`https://image.tmdb.org/t/p/original${image}`} alt={imageTitle} />
    </div>
  );
}
