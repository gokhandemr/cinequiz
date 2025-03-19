// React
import { useEffect, useState } from 'react';
// Router DOM
import { useNavigate } from 'react-router-dom';
// Style
import style from './style.module.css';
// Services
import { auth, saveUserScore } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function GameOverModal({ score, category }) {
  const navigate = useNavigate();
  const [isUserActive, setIsUserActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName } = user;
        setIsUserActive(true);
        (async () => {
          await saveUserScore(displayName, category, score);
        })();
      }
    });
  }, []);

  return (
    <div className={style.container}>
      <h2>Oyun sona erdi!</h2>
      <p>
        <strong>{score}</strong>
      </p>
      <div>
        <button onClick={() => navigate('/')}>Anasayfa</button>
        <button onClick={() => navigate(0)}>Tekrar Oyna</button>
      </div>
      {!isUserActive && <p>Tebrikler, oyunu tamamladın! Ama unutma, kayıt olmadan bu skor sadece senin sırrın olarak kalacak. Giriş yaparak, bu sırrı tüm dünyaya duyur ve sıralamada kendine bir yer edin! Belki de liderlik koltuğu seni bekliyordur, kim bilir?</p>}
    </div>
  );
}
