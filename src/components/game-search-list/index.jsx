import style from './style.module.css';

export default function GameSearchList({searchList, setInputValue}) {
  const handleClick = (name) => {
    setInputValue('');
    setInputValue(name);
  };

  return (
    <div className={style.container}>
      {searchList.map((media, index) => (
        <button
          key={index}
          onClick={() => handleClick(media.name ?? media.title)}
        >
          {media.name ?? media.title}
        </button>
      ))}
    </div>
  );
}
