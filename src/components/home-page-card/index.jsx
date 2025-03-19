// Style
import style from './style.module.css';
// Icons
import playIcon from '../../assets/icons/play.svg';
// Components
import LinkButton from '../link-button';
import HomePageCardLoading from './loading';

export default function HomePageCard(props) {
  const { title, description, background, secondBackground, thirdBackground, firstButtonTitle, firstButtonHref, secondButtonTitle, secondButtonHref } = props;

  if (!background) return <HomePageCardLoading />;

  return (
    <article className={style.container}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.description}>{description}</p>
      <div className={style.buttonsContainer}>
        <LinkButton title={firstButtonTitle} href={firstButtonHref} icon={playIcon} />
        <LinkButton title={secondButtonTitle} href={secondButtonHref} icon={playIcon} />
      </div>
      <div className={`${style.backgroundContainer} ${secondBackground ? style.multiBackground : ''}`}>
        {background && <img src={`https://image.tmdb.org/t/p/original${background}`} alt={title} className={style.background} />}

        {secondBackground && (
          <>
            <img src={`https://image.tmdb.org/t/p/original${secondBackground}`} alt={title} className={style.background} />
            <img src={`https://image.tmdb.org/t/p/original${thirdBackground}`} alt={title} className={style.background} />
          </>
        )}
      </div>
    </article>
  );
}
