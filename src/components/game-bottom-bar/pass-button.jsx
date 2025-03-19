// Style
import style from './style.module.css';
// Icons
import passIcon from '../../assets/icons/next.svg';

export default function PassButton({ setIsPassOver, setMediaIndex, pass, setPass }) {
  // Pass buton işlemleri
  const passButton = () => {
    // Alert koşulu
    if (pass <= 0) {
      setIsPassOver(true);
      setTimeout(() => {
        setIsPassOver(false);
      }, 2000);
      return;
    }
    setMediaIndex((prev) => prev + 1);
    pass > 0 && setPass(pass - 1);
  };

  return (
    <button onClick={passButton}>
      <span className={style.passCount}>{pass}</span>
      <img src={passIcon} alt='icon' />
      Bunu Geçelim!
    </button>
  );
}
