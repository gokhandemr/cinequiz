// Router DOM
import { Link } from 'react-router-dom';
// Style
import style from './style.module.css';
// Icons
import homeIcon from '../../assets/icons/home.svg';
import listIcon from '../../assets/icons/list.svg';
import helpIcon from '../../assets/icons/help.svg';
import loginIcon from '../../assets/icons/login.svg';
import userIcon from '../../assets/icons/user.svg';

export default function Menu(props) {
  // Props
  const { isMenuActive, setIsMenuActive, setIsLoginActive, user, setIsUserPanelActive } = props;

  // User buton fonksiyonu
  const handleClick = () => {
    setIsMenuActive(false);
    user ? setIsUserPanelActive(true) : setIsLoginActive(true);
  };

  const links = [
    { title: 'Ana Sayfa', href: '/', icon: homeIcon },
    { title: 'Oyuncu Sıralaması', href: '/ranking', icon: listIcon },
    { title: 'Nasıl Oynanır?', href: '/how-to-play', icon: helpIcon },
    { title: `${user ? 'Hesabım' : 'Giriş yap'}`, onClick: handleClick, icon: user ? userIcon : loginIcon },
  ];

  return (
    <ul className={`${!isMenuActive ? style.closed : ''}`}>
      {links.map(({ href, icon, title, onClick }, index) => (
        <li key={index}>
          {onClick === undefined ? (
            <Link to={href || '#'} onClick={onClick}>
              <img src={icon} alt={`${title} icon`} width={48} />
              {title}
            </Link>
          ) : (
            <button onClick={onClick}>
              <img src={icon} alt={`${title} icon`} width={48} />
              {title}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
