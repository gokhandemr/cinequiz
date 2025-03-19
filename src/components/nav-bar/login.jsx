// React
import { useState } from 'react';
// Services
import { firebaseSignIn } from '../../services/firebase';
// Router DOM
import { useNavigate } from 'react-router-dom';
// Icons
import buttonIcon from '../../assets/icons/signIn.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
// Style
import style from './style.module.css';

export default function Login(props) {
  // Props
  const { isLoginActive, setIsLoginActive, setIsRegisterActive, setIsMenuActive } = props;
  // Navigate
  const navigate = useNavigate();
  // Input Values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Error
  const [errorValue, setErrorValue] = useState(null);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Login formuna ait submit buton fonksiyonu
  const handleSubmitClick = async () => {
    // Loading işlemi başladı
    setIsLoading(true);

    // Mail ve şifre filtreleme
    const isEmailInValid = email.trim() === '' || /[^@a-z0-9._-]/i.test(email.trim());
    const isPasswordInValid = password.length < 6;

    // Email ve şifre hata durumları
    if (isEmailInValid) return setErrorValue('E-mail geçerli formatta değil'), setIsLoading(false);
    if (isPasswordInValid) return setErrorValue('Şifre en az 6 karakter olmalı'), setIsLoading(false);

    const response = await firebaseSignIn(email, password);

    // Firabase isteği sonuçlarına göre yönlendirme
    if (response.success) {
      navigate(0);
    } else {
      setErrorValue(response.error);
      setTimeout(() => {
        setErrorValue(null);
      }, 3000);
    }
    setIsLoading(false);
  };

  // Toggle Butona ait fonksiyon
  const handleToggleClick = () => {
    setIsLoginActive(false);
    setIsRegisterActive(true);
    setEmail('');
    setPassword('');
  };

  // Login formu kapatır ve menuyü açar
  const closeHandleClick = () => {
    setIsLoginActive(false);
    setIsMenuActive(true);
  };

  return (
    <div className={`${style.loginContainer} ${!isLoginActive ? style.closed : ''}`}>
      <div className={style.titleContainer}>
        <p className={style.title}>Giriş Yap</p>
        <button className={style.backButton} onClick={closeHandleClick}>
          <img src={backIcon} alt='close register icon' />
        </button>
      </div>

      {errorValue && <p className={style.error}>{errorValue}</p>}

      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <input className={style.input} type='email' placeholder='e-mail adresiniz' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='username' />
        <input className={style.input} type='password' placeholder='****' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' />
        <button type='submit' className={style.submitButton} onClick={handleSubmitClick}>
          {isLoading && <span className={style.loader}></span>}
          {!isLoading && <img src={buttonIcon} alt='giriş yap iconu' />}
        </button>
      </form>

      <p className={style.otherTextTitle}>ya da</p>

      <button className={style.toggleButton} onClick={handleToggleClick}>
        kayıt ol
      </button>
    </div>
  );
}
