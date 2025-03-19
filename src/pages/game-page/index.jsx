// React
import { useEffect, useState } from 'react';
// Router DOM
import { useNavigate, useParams } from 'react-router-dom';
// Services
import { fetchMedia, fetchMediaImages, searchMedia } from '../../services/tmdb';
// Components
import GameStats from '../../components/game-stats';
import GameImage from '../../components/game-image';
import GameBottomBar from '../../components/game-bottom-bar';
import GameShuffledTitle from '../../components/game-shuffled-title';
import GameSearchList from '../../components/game-search-list';
import WrongAnswerModal from '../../components/wrong-answer-modal';
import GameOverModal from '../../components/game-over-modal';
import AlertModal from '../../components/alert-modal';
import Loading from '../../components/loading';

export default function GamePage() {
  const params = useParams();
  const navigate = useNavigate();
  // Game Stats
  const [health, setHealth] = useState(5);
  const [score, setScore] = useState(0);
  const [pass, setPass] = useState(3);
  // Media List
  const [mediaList, setMediaList] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaImages, setMediaImages] = useState([]);
  const [mediaImageIndex, setMediaImageIndex] = useState(0);
  const [mediaShuffledTitle, setMediaShuffledTitle] = useState('');
  // Page Count
  const [pageCount, setPageCount] = useState(1);
  // Input
  const [inputValue, setInputValue] = useState('');
  const [shuffledTitleIsOpen, setShuffledTitleIsOpen] = useState(false);
  // Search Media List
  const [searchList, setSearchList] = useState([]);
  // Answer Status
  const [answerStatus, setAnswerStatus] = useState(null);
  // Pass Alert
  const [isPassOver, setIsPassOver] = useState(false);
  // Loading
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  // Game Time
  const [time, setTime] = useState(0);
  // Error
  const [error, setError] = useState(null);

  // Liste tamamlandığında pageCount 1 artar ve media index 0 olur. Böylece yeni listeye geçme koşulunu sağlar.
  if (mediaList.length > 0 && mediaIndex >= mediaList.length) return setPageCount(pageCount + 1), setMediaIndex(0);

  // Time
  useEffect(() => {
    if (health <= 0) return;
    setTime(0);
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [health, mediaIndex]);

  // 404
  useEffect(() => {
    if (!['movies', 'tv-series', 'mixed'].includes(params.category)) return navigate('/404');
    if (!['global', 'local'].includes(params.origin)) return navigate('/404');
  }, [params.category]);

  // API: Media
  useEffect(() => {
    (async () => {
      if (params.category === 'mixed') {
        const [moviesResults, tvSeriesResults] = await Promise.all([fetchMedia(true, params.origin === 'local', pageCount), fetchMedia(false, params.origin === 'local', pageCount)]);
        // Hata kontrolü
        if (!moviesResults.success || !tvSeriesResults.success) return setError(moviesResults.error || tvSeriesResults.error);
        // Filmleri ve dizileri karıştırma işlemi
        const mixedMedia = [...moviesResults.results, ...tvSeriesResults.results].sort(() => Math.random() - 0.5);
        setMediaList(mixedMedia);
      } else {
        const media = await fetchMedia(params.category === 'movies', params.origin === 'local', pageCount);
        // Hata kontrolü
        if (!media.success) return setError(media.error);
        // Filtreleme ve karıştırma işlemi
        const filteredMediaResults = media.results.filter((item) => item.backdrop_path !== null).sort(() => Math.random() - 0.5);
        setMediaList(filteredMediaResults);
      }
    })();
  }, [params, pageCount]);

  // API: Media Images - Shuffled title
  useEffect(() => {
    // Her istekte oyuncunun cevabını null yapar
    setAnswerStatus(null);

    // Loading başladı
    setIsMediaLoading(true);

    // Filmler/Diziler yüklenmemişse durdurur
    if (mediaList.length <= 0) return;

    // Fetch işlemi başladı
    (async () => {
      let isMovie = (await mediaList[mediaIndex]?.name) ? false : true;
      const response = await fetchMediaImages(params.category === 'mixed' ? isMovie : params.category === 'movies', mediaList[mediaIndex].id);

      // Api hata kontrolü
      if (!response.success) return setError(response.error);

      // Filtreleme işlemi
      const editedBackdrops = response.results
        .filter(({ iso_639_1 }) => iso_639_1 !== 'tr')
        .sort((a, b) => b.vote_count - a.vote_count)
        .slice(0, 5)
        .map(({ file_path }) => file_path);
      setMediaImages(editedBackdrops);
      setMediaImageIndex(0);
    })();

    // Karışık Ad işlemi
    const shuffledTitle = (mediaList[mediaIndex].title || mediaList[mediaIndex].name)
      .replaceAll(' ', '')
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('')
      .toUpperCase();
    setMediaShuffledTitle(shuffledTitle);

    // Loading kapandı
    setTimeout(() => {
      setIsMediaLoading(false);
    }, 1000);
  }, [mediaIndex, mediaList]);

  // API: Search Media
  useEffect(() => {
    // Can bitme durumu ve cevap durumu kontrolü
    if (health <= 0 || answerStatus === false) return;

    // Input verisinin format kontrolü
    const isValidAnswerFormat = inputValue.trim() !== '' && inputValue.trim().length >= 2;
    if (!isValidAnswerFormat) return;

    // Fetch işlemi
    (async () => {
      let isMovie = (await mediaList[mediaIndex]?.name) ? false : true;
      const response = await searchMedia(isMovie, inputValue);

      // Api hata kontrolü
      if (!response.success) return setError(response.error);

      // filtreleme işlemi
      const editedResults = response.results
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)
        .map(({ title, original_title, name, original_name }) => (isMovie ? { title, original_title } : { name, original_name }));
      setSearchList(editedResults);
    })();
  }, [inputValue]);

  // Loading (Propsların hata vermemesi için)
  if (mediaIndex >= mediaList.length) return <Loading />;

  // Props
  const statsProps = { health, score, mediaIndex: pageCount > 1 ? pageCount * 10 + mediaIndex : mediaIndex, time };
  const searchListProps = { searchList, setInputValue };
  const imageProps = {
    image: mediaImages[mediaImageIndex],
    imageTitle: mediaList[mediaIndex].title || mediaList[mediaIndex].name,
    shuffledTitleIsOpen,
    answerStatus,
  };
  const bottomBarProps = {
    inputValue,
    setInputValue,
    currentMediaTitle: mediaList[mediaIndex].title || mediaList[mediaIndex].name,
    currentMediaOriginalTitle: mediaList[mediaIndex].original_title || mediaList[mediaIndex].original_name,
    mediaIndex,
    setMediaIndex,
    mediaImageIndex,
    setMediaImageIndex,
    imagesLength: mediaImages.length,
    pass,
    setPass,
    setScore,
    health,
    setHealth,
    shuffledTitleIsOpen,
    setShuffledTitleIsOpen,
    answerStatus,
    setAnswerStatus,
    setIsPassOver,
    isMediaLoading,
    setIsMediaLoading,
    time,
  };
  const wrongAnswerModalProps = {
    title: mediaList[mediaIndex].title || mediaList[mediaIndex].name,
    originalTitle: mediaList[mediaIndex].original_title || mediaList[mediaIndex].original_name,
    setAnswerStatus,
    setMediaIndex,
    health,
  };
  const gameOverModalProps = {
    score,
    category: `${params.category}-${params.origin}`,
  };

  return (
    <>
      {error && <AlertModal text={error} />}

      {!error && (
        <>
          <GameStats {...statsProps} />
          {inputValue.trim() !== '' && inputValue.trim().length >= 2 && <GameSearchList {...searchListProps} />}
          {shuffledTitleIsOpen && <GameShuffledTitle title={mediaShuffledTitle} />}
          {isMediaLoading ? <Loading /> : <GameImage {...imageProps} />}
          <GameBottomBar {...bottomBarProps} />

          {(answerStatus === false || health <= 0 || isPassOver) && (
            <div className='modals-container'>
              {health <= 0 && <GameOverModal {...gameOverModalProps} />}
              {answerStatus === false && <WrongAnswerModal {...wrongAnswerModalProps} />}
              {isPassOver && <AlertModal text={'Pass hakkınız kalmadı.'} />}
            </div>
          )}
        </>
      )}
    </>
  );
}
