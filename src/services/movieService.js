import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMovies = async (page = 1, query = "") => {
  try {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
