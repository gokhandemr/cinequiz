// React
import { useEffect, useRef, useState } from 'react';
// Style
import style from './style.module.css';
// Icon
import buttonIcon from '../../assets/icons/check.svg';

export default function InputContainer(inputProps) {
  const { inputValue, setInputValue, setMediaIndex, setScore, health, setHealth, currentMediaTitle, currentMediaOriginalTitle, answerStatus, setAnswerStatus, isMediaLoading, time } = inputProps;
  // Error
  const [inputError, setInputError] = useState(false);

  // Enter tuşu ile inputa otomatik odaklandı
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.key === 'Enter' && answerStatus !== false && inputRef.current.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [answerStatus]);

  // Özel Karakterleri Filtreleme
  const filteredText = (text) => {
    return text
      .trim()
      .replaceAll(/[^a-z0-9şüğçıö ]/gi, '')
      .toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Can kalmamışsa, sayfa yükleniyorsa veya Cevap Yanlışsa tekrar cevaplamayı durdur
    if (health <= 0 || answerStatus === false || isMediaLoading) return;

    // İnput ve media title'lar filtrelendi
    const filteredInputValue = filteredText(inputValue);
    const filteredTitle = filteredText(currentMediaTitle);
    const filteredOriginalTitle = filteredText(currentMediaOriginalTitle);

    // Boş input kontrolü ve hata gösterimi
    if (filteredInputValue === '') {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 1000);
      return;
    }

    // Cevap kontrolü
    const isCorrect = filteredInputValue === filteredTitle || filteredInputValue === filteredOriginalTitle;
    setAnswerStatus(isCorrect);
    setInputValue('');

    // Puanlama: 5 sn. ve öncesi +10 puan, 10 sn. kadar +5 puan.
    const timeScore = time <= 5 ? 10 : time <= 10 ? 5 : 0;
    const totalScore = 10 + timeScore;

    // Sonuç kısmı: Animasyon için 1sn bekleme süresi
    setTimeout(() => {
      isCorrect && setMediaIndex((prev) => prev + 1);
      isCorrect ? setScore((prev) => prev + totalScore) : setHealth((prev) => prev - 1);
    }, 1000);
  };

  return (
    <form className={style.inputContainer} onSubmit={handleSubmit}>
      <input className={`${inputError ? style.error : ''}`} placeholder='Cevabınızı yazınız' value={inputValue} ref={inputRef} onChange={(e) => setInputValue(health > 0 && answerStatus !== false ? e.target.value : '')} />
      <button>
        <img src={buttonIcon} alt='icon' />
      </button>
    </form>
  );
}
