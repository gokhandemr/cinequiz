// Icons
import imageIcon from '../../assets/icons/photo.svg';

export default function NextImageButton({ setMediaImageIndex, imagesLength, setIsMediaLoading }) {
  // Sıradaki resime geçiş butonu
  const nextImageButton = () => {
    setIsMediaLoading(true);
    setTimeout(() => {
      setMediaImageIndex((prev) => (prev + 1 > imagesLength - 1 ? 0 : prev + 1));
      setIsMediaLoading(false);
    }, 250);
  };

  return (
    <button onClick={() => nextImageButton()}>
      <img src={imageIcon} alt='icon' />
      Farklı Bir Kare
    </button>
  );
}
