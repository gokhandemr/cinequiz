// React
import { useState } from 'react';
// Style
import style from './style.module.css';
// Logo
import tmdbLogo from '../../assets/tmdb-logo.svg';
// Components
import LightMode from '../light-mode';

export default function Footer() {
  const [isLightModeActive, setIsLightModeActive] = useState(false);

  const handleLightModeClick = () => {
    setIsLightModeActive(true);
    setTimeout(() => {
      setIsLightModeActive(false);
    }, 8000);
  };

  return (
    <>
      <footer className={style.container}>
        <div>
          <h6 className={style.footerLogo}>CINEQUIZ</h6>
          <span>|</span>
          <button className={style.lightModeButton} onClick={handleLightModeClick}>
            Açık Mod
          </button>
        </div>

        <div className={style.tmdbContainer}>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          <img src={tmdbLogo} alt='tmdb logo' />
        </div>
      </footer>

      {isLightModeActive && <LightMode />}
    </>
  );
}
