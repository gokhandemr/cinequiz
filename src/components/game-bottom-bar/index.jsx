// Style
import style from './style.module.css';
// Component
import InputContainer from './input';
import NextImageButton from './next-image-button';
import ShuffledTitleButton from './shuffled-title-button';
import PassButton from './pass-button';

export default function GameBottomBar(bottomBarProps) {
  const { inputValue, setInputValue, currentMediaTitle, currentMediaOriginalTitle, setMediaIndex, setMediaImageIndex, imagesLength, pass, setPass, setScore, health, setHealth, shuffledTitleIsOpen, setShuffledTitleIsOpen, answerStatus, setAnswerStatus, setIsPassOver, isMediaLoading, time, mediaIndex, mediaImageIndex, setIsMediaLoading } = bottomBarProps;

  // Props
  const passButtonProps = {
    pass,
    setPass,
    setIsPassOver,
    setMediaIndex,
  };
  const inputContainerProps = {
    inputValue,
    setInputValue,
    setMediaIndex,
    setScore,
    health,
    setHealth,
    currentMediaTitle,
    currentMediaOriginalTitle,
    answerStatus,
    setAnswerStatus,
    isMediaLoading,
    time,
  };
  const nextImageButtonProps = {
    setMediaImageIndex,
    imagesLength,
    setIsMediaLoading,
  };
  const shuffledTitleButtonProps = {
    shuffledTitleIsOpen,
    setShuffledTitleIsOpen,
    mediaIndex,
    mediaImageIndex,
  };

  return (
    <div className={style.container}>
      <div className={style.buttonsContainer}>
        <PassButton {...passButtonProps} />
      </div>

      <InputContainer {...inputContainerProps} />

      <div className={style.buttonsContainer}>
        <NextImageButton {...nextImageButtonProps} />
        <ShuffledTitleButton {...shuffledTitleButtonProps} />
      </div>
    </div>
  );
}
