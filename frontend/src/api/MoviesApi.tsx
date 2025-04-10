import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const ApiUrl =
  // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie";
  "https://localhost:5000/Movie";

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  searchTerm: string = ""
): Promise<FetchMoviesResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
      .join(`&`);
    const searchParam = searchTerm
      ? `&searchTerm=${encodeURIComponent(searchTerm)}`
      : "";

    const response = await fetch(
      `${ApiUrl}/allmovies?pageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ``
      }${searchParam}`,
      {
        credentials: "include",
      }
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
      credentials: "include",
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
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${ApiUrl}/updatemovie/${showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
      credentials: "include",
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

export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${ApiUrl}/deletemovie/${showId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete movie`);
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
