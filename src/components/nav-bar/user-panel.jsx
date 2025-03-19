// React
import { useEffect, useState } from 'react';
// Router DOM
import { useNavigate } from 'react-router-dom';
// Icons
import backIcon from '../../assets/icons/arrow-back.svg';
// Services
import { firebaseSignOut, getMyScores } from '../../services/firebase';
// Style
import style from './style.module.css';

export default function UserPanel(props) {
  // Props
  const { isUserPanelActive, setIsUserPanelActive, user, setIsMenuActive } = props;
  // Navigate
  const navigate = useNavigate();
  // Scores
  const [myScores, setMyScores] = useState([]);
  // Error
  const [error, setError] = useState('');
  // Loading
  const [loading, setLoading] = useState(false);

  // Oyun skorlarını çeker
  useEffect(() => {
    setError('');
    setLoading(true);
    (async () => {
      const response = await getMyScores(user);
      response.success ? setMyScores(response.scores) : setError(response.error);
      setLoading(false);
    })();
  }, []);

  // Paneli kapatır ve menuyü açar
  const closeHandleClick = () => {
    setIsUserPanelActive(false);
    setIsMenuActive(true);
  };

  // Oturumu kapatır
  const handleSignOutClick = async () => {
    await firebaseSignOut();
    navigate(0);
  };

  // Kategoriyi yazı biçimini düzenler
  const categoryConvert = (cat) => {
    let newCategory = cat.split('-')[0];
    let newOrigin = cat.split('-')[1];
    newCategory = newCategory === 'movies' ? 'Filmler' : newCategory === 'tv-series' ? 'Diziler' : 'Karışık';
    newOrigin = newOrigin === 'local' ? 'Yerli' : 'Global';
    return `${newCategory} / ${newOrigin}`;
  };

  return (
    <div className={`${style.userPanelContainer} ${!isUserPanelActive ? style.closed : ''}`}>
      <button className={style.backButton} onClick={closeHandleClick}>
        <img src={backIcon} alt='close panel icon' aria-label='geri' />
      </button>

      <div className={style.titleContainer}>
        <p className={style.title}>
          Merhaba <strong>{user}</strong>
        </p>
        <button onClick={handleSignOutClick}>Çıkış yap</button>
      </div>

      <ul className={style.userDetails}>
        {loading && <p>Sıralama yükleniyor..</p>}
        {error !== '' && <p>{error}</p>}
        {error === '' && !loading &&
          (myScores.length > 0 ? (
            myScores.map(({ category, score }, index) => (
              <li key={index}>
                <strong>{categoryConvert(category)}</strong>
                {score}
              </li>
            ))
          ) : (
            <p>Henüz bir oyun oynamadınız..</p>
          ))}
      </ul>
    </div>
  );
}
