// Style
import style from './style.module.css';

export default function WrongAnswerModal({ title, originalTitle, setMediaIndex, setAnswerStatus, health }) {
  const handleClick = () => {
    setMediaIndex((prev) => prev + 1);
    setAnswerStatus(null);
  };

  return (
    <div className={`${style.container} ${health <= 0 ? style.gameOverModalActive : ''}`}>
      <p>Maalesef olmadı...</p>
      <p>
        Doğru cevap: <strong>{`${title} - ${originalTitle}`}</strong>
      </p>
      <button onClick={handleClick} autoFocus>
        Sıradakine Geç
      </button>
    </div>
  );
}
