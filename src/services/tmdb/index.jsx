const baseURL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

// Film / Dizi çekme
export const fetchMedia = async (isMovie, isLocal, page) => {
  try {
    const mediaType = isMovie ? 'movie' : 'tv';
    const params = new URLSearchParams({
      include_adult: 'false',
      language: 'tr-TR',
      page: page.toString(),
      sort_by: 'vote_count.desc',
      ...(isLocal && { with_origin_country: 'TR', with_original_language: 'tr' }),
    });
    const url = `${baseURL}/discover/${mediaType}?${params}`;
    const response = await fetch(url, options);
    const responseJson = await response.json();

    if (!responseJson.results) throw new Error(`Sunucu kaynaklı bir hata meydana geldi. Lütfen daha sonra tekrar deneyin. Sunucu Yanıtı: "${responseJson.status_message}"`);

    return { success: true, results: responseJson.results };
  } catch (error) {
    console.warn(error.message);
    return { success: false, error: error.message };
  }
};

// Filme / Diziye ait görsellerin çekilmesi
export const fetchMediaImages = async (isMovie, id) => {
  try {
    const mediaType = isMovie ? 'movie' : 'tv';
    const response = await fetch(`${baseURL}/${mediaType}/${id}/images`, options);
    const responseJson = await response.json();

    if (!responseJson.backdrops) throw new Error(`Sunucu kaynaklı bir hata meydana geldi. Lütfen daha sonra tekrar deneyin. Sunucu Yanıtı: "${responseJson.status_message}"`);

    return { success: true, results: responseJson.backdrops };
  } catch (error) {
    console.warn(error.message);
    return { success: false, error: error.message };
  }
};

// Film / Dizi arama
export const searchMedia = async (isMovie, query) => {
  try {
    const mediaType = isMovie ? 'movie' : 'tv';
    const params = new URLSearchParams({
      query: query,
      include_adult: false,
      language: 'tr-TR',
    });
    const response = await fetch(`${baseURL}/search/${mediaType}?${params}`, options);
    const responseJson = await response.json();

    if (!responseJson.results) throw new Error(`Sunucu kaynaklı bir hata meydana geldi. Lütfen daha sonra tekrar deneyin. Sunucu Yanıtı: "${responseJson.status_message}"`);

    return { success: true, results: responseJson.results };
  } catch (error) {
    console.warn(error.message);
    return { success: false, error: error.message };
  }
};
