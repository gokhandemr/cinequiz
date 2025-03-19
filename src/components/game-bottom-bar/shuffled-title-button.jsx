// React
import { useEffect } from 'react';
// Style
import style from './style.module.css';
// Icons
import shuffledIcon from '../../assets/icons/next.svg';

export default function ShuffledTitleButton({ shuffledTitleIsOpen, setShuffledTitleIsOpen, mediaIndex, mediaImageIndex }) {
  useEffect(() => {
    setShuffledTitleIsOpen(false);
  }, [mediaIndex, mediaImageIndex]);

  return (
    <button className={`${shuffledTitleIsOpen ? style.active : ''}`} onClick={() => setShuffledTitleIsOpen(!shuffledTitleIsOpen)}>
      <img src={shuffledIcon} alt='icon' />
      Karmakarışık Ad
    </button>
  );
}
