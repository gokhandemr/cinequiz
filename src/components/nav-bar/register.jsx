// React
import { useState } from 'react';
// Router DOM
import { useNavigate } from 'react-router-dom';
// Services
import { firebaseSignUp } from '../../services/firebase';
// Icons
import buttonIcon from '../../assets/icons/signIn.svg';
import backIcon from '../../assets/icons/arrow-back.svg';
// Style
import style from './style.module.css';

export default function Register(props) {
  // Props
  const { isRegisterActive, setIsRegisterActive, setIsLoginActive, setIsMenuActive } = props;
  // Navigate
  const navigate = useNavigate();
  // Error
  const [errorMessage, setErrorMessage] = useState(null);
  // Inputs
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Register forma ait submit buton fonksiyonu
  const handleClick = async () => {
    // Loading işlemi başladı
    setIsLoading(true);

    // username, email ve password filtreleme
    const isNameInValid = userName.trim() === '' || /[^a-z0-9._-]/i.test(userName.trim()) || userName.trim().length > 8;
    const isEmailInValid = email.trim() === '' || /[^@a-z0-9._-]/i.test(email.trim());
    const isPasswordInValid = password.length < 6;

    // Hata mesajları
    if (isNameInValid) return setErrorMessage('Kullanıcı adı biçimi uygunsuz. Kullanıcı adınız en fazla 8 karakterden oluşmalı ve özel karakterler içermemeli. Lütfen tekrar gözden geçirin!'), setIsLoading(false);
    if (isEmailInValid) return setErrorMessage('E-mail biçimi uygunsuz. Lütfen tekrar gözden geçirin!'), setIsLoading(false);
    if (isPasswordInValid) return setErrorMessage('Şifre en az 6 karakter olmalı. Lütfen tekrar gözden geçirin!'), setIsLoading(false);

    // Firebase isteği
    const response = await firebaseSignUp(userName.toLowerCase(), email, password);

    // Firabase isteği sonuçlarına göre yönlendirme
    if (response.success) {
      navigate(0);
    } else {
      console.log(response);
      setErrorMessage(response.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
    setIsLoading(false);
  };

  // Toggle Butona ait fonksiyon
  const handleToggleClick = () => {
    setIsRegisterActive(false);
    setIsLoginActive(true);
    setEmail('');
    setPassword('');
  };

  // Register formu kapatır ve menuyü açar
  const closeHandleClick = () => {
    setIsRegisterActive(false);
    setIsMenuActive(true);
  };

  return (
    <div className={`${style.registerContainer} ${!isRegisterActive ? style.closed : ''}`}>
      <div className={style.titleContainer}>
        <p className={style.title}>Kayıt Ol</p>
        <button className={style.backButton} onClick={closeHandleClick}>
          <img src={backIcon} alt='close login icon' />
        </button>
      </div>

      {errorMessage && <p className={style.error}>{errorMessage}</p>}

      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <input className={style.input} type='text' placeholder='user name' value={userName} onChange={(e) => setUserName(e.target.value)} autoComplete='username' required />
        <input className={style.input} type='email' placeholder='e-mail' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='username' required />
        <input className={style.input} type='password' placeholder='****' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='current-password' required />
        <button type='submit' className={style.submitButton} onClick={handleClick}>
          {isLoading && <span className={style.loader}></span>}
          {!isLoading && <img src={buttonIcon} alt='kayıt ol iconu' />}
        </button>
      </form>

      <p className={style.otherTextTitle}>ya da</p>

      <button className={style.toggleButton} onClick={handleToggleClick}>
        giriş yap
      </button>
    </div>
  );
}
