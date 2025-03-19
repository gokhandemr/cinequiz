// React
import { useEffect, useState } from 'react';
// Router DOM
import { useLocation } from 'react-router-dom';
// Style
import style from './style.module.css';
// Components
import Menu from './menu';
import Login from './login';
import Register from './register';
import UserPanel from './user-panel';

export default function NavBar({ isNavActive, setIsNavActive, user }) {
  // Pathname
  const { pathname } = useLocation();
  //  Menu
  const [isMenuActive, setIsMenuActive] = useState(true);
  // Auth
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [isUserPanelActive, setIsUserPanelActive] = useState(false);

  // Menu Props
  const menuProps = { isMenuActive, setIsMenuActive, setIsLoginActive, setIsUserPanelActive, user };
  // Login Props
  const loginProps = { isLoginActive, setIsLoginActive, setIsRegisterActive, setIsMenuActive };
  // Register Props
  const registerProps = { isRegisterActive, setIsRegisterActive, setIsLoginActive, setIsMenuActive };
  // User Panel Props
  const userPanelProps = { isUserPanelActive, setIsUserPanelActive, setIsMenuActive, user };

  // Her url değişiminde navbar kapanır
  useEffect(() => {
    setIsNavActive(false);
  }, [pathname]);

  // Nav kapandığında login, panel ve register false olur ilk açılışta menu karşılar
  useEffect(() => {
    setIsMenuActive(true);
    setIsLoginActive(false);
    setIsRegisterActive(false);
    setIsUserPanelActive(false);
  }, [isNavActive]);

  return (
    <>
      <nav className={`${style.container} ${!isNavActive ? style.closed : ''}`}>
        <Menu {...menuProps} />
        {!user && (
          <>
            <Login {...loginProps} />
            <Register {...registerProps} />
          </>
        )}
        {isUserPanelActive && <UserPanel {...userPanelProps} />}
      </nav>
      {isNavActive && <div className={style.navBackground} onClick={() => setIsNavActive(false)}></div>}
    </>
  );
}
