const language = localStorage.getItem("language") || "tr";

const baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_AUTH}`,
  },
};

export const getProductions = async (isMovie, page, categoryId) => {
  try {
    const response = await fetch(`${baseURL}/discover/${isMovie ? "movie" : "tv"}?language=${language}&page=${page}&with_genres=${categoryId}&sort_by=vote_count.desc&vote_count.gte=${isMovie ? "1000" : ""}`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getProductionsByTopRated = async (isMovie, page) => {
  try {
    const response = await fetch(`${baseURL}/${isMovie ? "movie" : "tv"}/top_rated?language=${language}&page=${page}`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getProductionsByCountry = async (isMovie, page) => {
  try {
    const response = await fetch(`${baseURL}/discover/${isMovie ? "movie" : "tv"}?language=${language}&page=${page}&sort_by=vote_count.desc&with_origin_country=TR&with_original_language=tr`, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductionDetails = async (isMovie, id) => {
  try {
    const response = await fetch(`${baseURL}/${isMovie ? "movie" : "tv"}/${id}?language=${language}`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getProductionCredits = async (isMovie, id) => {
  try {
    const response = await fetch(`${baseURL}/${isMovie ? "movie" : "tv"}/${id}/credits?language=${language}`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getProductionImages = async (isMovie, id) => {
  try {
    const response = await fetch(`${baseURL}/${isMovie ? "movie" : "tv"}/${id}/images`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getProductionClips = async (id) => {
  try {
    const response = await fetch(`${baseURL}/movie/${id}/videos`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const searchProductions = async (isMovie, query) => {
  try {
    const response = await fetch(`${baseURL}/search/${isMovie ? "movie" : "tv"}?query=${query}&include_adult=false&language=${language}&page=1`, options);
    return response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const getCategories = async (category) => {
  try {
    const response = await fetch(`${baseURL}/genre/${category}/list?language=${language}`, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
