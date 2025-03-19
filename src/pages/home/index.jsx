// React
import { useEffect, useState } from 'react';
// Services
import { fetchMedia } from '../../services/tmdb';
// Components
import HomePageCard from '../../components/home-page-card';
import AlertModal from '../../components/alert-modal';

export default function Home() {
  const [movieImage, setMovieImage] = useState('');
  const [tvImage, setTvImage] = useState('');
  const [mixedImages, setMixedImages] = useState({});
  // Error
  const [error, setError] = useState(null);

  // API
  useEffect(() => {
    // LocalStorage
    const cachedData = localStorage.getItem('mediaImages');
    const lastFetchTime = localStorage.getItem('lastFetchTime');

    // Localde görsel varsa ve 1 saati geçmemişse yeniden fetch işlemi yapar
    if (cachedData && lastFetchTime && Date.now() - lastFetchTime < 3600000) {
      const parsedData = JSON.parse(cachedData);
      setMovieImage(parsedData.movie);
      setTvImage(parsedData.tv);
      setMixedImages(parsedData.mixed);
    } else {
      (async () => {
        const [moviesResults, tvSeriesResults] = await Promise.all([fetchMedia(true, false, 1), fetchMedia(false, false, 1)]);

        // Hata kontrolü
        if (!moviesResults.success || !tvSeriesResults.success) return setError(moviesResults.error || tvSeriesResults.error);

        const filteredMovieResults = moviesResults.results
          .filter(({ backdrop_path }) => backdrop_path !== null)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const filteredTvResults = tvSeriesResults.results
          .filter(({ backdrop_path }) => backdrop_path !== null)
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        const data = {
          movie: filteredMovieResults[0].backdrop_path,
          tv: filteredTvResults[0].backdrop_path,
          mixed: {
            movie: filteredMovieResults[1].backdrop_path,
            movie2: filteredMovieResults[2].backdrop_path,
            tv: filteredTvResults[1].backdrop_path,
          },
        };
        localStorage.setItem('mediaImages', JSON.stringify(data));
        localStorage.setItem('lastFetchTime', Date.now());
        setMovieImage(data.movie);
        setTvImage(data.tv);
        setMixedImages(data.mixed);
      })();
    }
  }, []);

  // Props
  const movieCardProps = {
    title: 'Film Bilgin Ne Kadar?',
    description: 'Klasiklerden en yeni yapımlara kadar sinema dünyasına ne kadar hakimsin? En sevdiğin filmleri hafızanda canlandır ve bilginle zirveye çık!',
    firstButtonTitle: 'Global Filmler',
    firstButtonHref: '/movies/global',
    secondButtonTitle: 'Yerli Filmler',
    secondButtonHref: '/movies/local',
    background: movieImage,
  };
  const tvCardProps = {
    title: 'Dizi Dünyasına Giriş!',
    description: 'Her platformda dizilere hakim misin? Öyleyse kendini kanıtlama zamanı! Hafızanı zorla, sahneleri doğru tahmin et ve zirveye oyna! Bakalım kim gerçekten dizi ustası?',
    firstButtonTitle: 'Global Diziler',
    firstButtonHref: '/tv-series/global',
    secondButtonTitle: 'Yerli Diziler',
    secondButtonHref: '/tv-series/local',
    background: tvImage,
  };
  const mixedCardProps = {
    title: 'Karışık - Hem Film Hem Dizi!',
    description: 'Film mi dizi mi fark etmez, sen her şeye hazırsın! Hem film hem de dizi bilginle fark yarat, kareleri yakala ve puanları topla! Eğlenceli ve zorlu bir meydan okumaya hazır ol!',
    firstButtonTitle: 'Global Yapımlar',
    firstButtonHref: '/mixed/global',
    secondButtonTitle: 'Yerli Yapımlar',
    secondButtonHref: '/mixed/local',
    background: mixedImages.movie,
    secondBackground: mixedImages.tv,
    thirdBackground: mixedImages.movie2,
  };

  return (
    <>
      {error && <AlertModal text={error} />}
      {!error && (
        <>
          <HomePageCard {...movieCardProps} />
          <HomePageCard {...tvCardProps} />
          <HomePageCard {...mixedCardProps} />
        </>
      )}
    </>
  );
}
