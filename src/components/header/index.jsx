// React
import { useEffect, useState } from 'react';
// Router DOM
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Style
import style from './style.module.css';
// Icon
import backIcon from '../../assets/icons/back.svg';
import navButtonIcon from '../../assets/icons/menu.svg';
import navCloseButton from '../../assets/icons/close.svg';
// Services
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// Components
import NavBar from '../nav-bar';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Auth Check
  const [user, setUser] = useState(null);
  // Nav menu
  const [isNavActive, setIsNavActive] = useState(false);

  // Kullanıcı oturum kontrolü
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName } = user;
        setUser(displayName);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Props
  const navBarProps = { isNavActive, setIsNavActive, user };

  return (
    <header className={style.container}>
      {pathname !== '/' && (
        <button className={style.goBackButton} onClick={() => navigate(-1)}>
          <img src={backIcon} alt='go back button' />
        </button>
      )}

      <Link to={'/'}>
        <h1 className={style.logo}>CINEQUIZ</h1>
      </Link>

      <button className={style.navButton} onClick={() => setIsNavActive(!isNavActive)}>
        <img src={isNavActive ? navCloseButton : navButtonIcon} alt='nav icon' />
      </button>

      <NavBar {...navBarProps} />
    </header>
  );
}
