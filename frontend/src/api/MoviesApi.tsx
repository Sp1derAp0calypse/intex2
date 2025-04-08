import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const ApiUrl = "https://localhost:5000/api/Movie";

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieGenres=${encodeURIComponent(cat)}`)
      .join(`&`);

    const response = await fetch(
      `${ApiUrl}/allmovies?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ``
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${ApiUrl}/addmovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (
  movieId: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${ApiUrl}/updatemovie/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error(`Failed to update movie: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie", error);
    throw error;
  }
};

export const deleteMovie = async (movieId: number): Promise<void> => {
  try {
    const response = await fetch(`${ApiUrl}/deletemovie/${movieId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie`);
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
