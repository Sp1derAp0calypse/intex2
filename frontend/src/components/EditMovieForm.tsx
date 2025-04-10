import { useState } from "react";
import { Movie } from "../types/Movie";
import { updateMovie } from "../api/MoviesApi";

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const genreFields = [
  "action",
  "adventure",
  "animeSeriesInternationalTvShows",
  "britishTvShowsDocuseriesInternationalTvShows",
  "children",
  "comedies",
  "comediesDramasInternationalMovies",
  "comediesInternationalMovies",
  "comediesRomanticMovies",
  "crimeTvShowsDocuseries",
  "documentaries",
  "documentariesInternationalMovies",
  "docuseries",
  "dramas",
  "dramasInternationalMovies",
  "dramasRomanticMovies",
  "familyMovies",
  "fantasy",
  "horrorMovies",
  "internationalMoviesThrillers",
  "internationalTvShowsRomanticTvShowsTvDramas",
  "kidsTv",
  "languageTvShows",
  "musicals",
  "natureTv",
  "realityTv",
  "spirituality",
  "tvAction",
  "tvComedies",
  "tvDramas",
  "talkShowsTvComedies",
  "thrillers",
] as const;

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "releaseYear" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Submitting updated movie:", formData);
      await updateMovie(formData.showId!, formData); // ✅ leave it as string
      onSuccess();
    } catch (error) {
      console.error("Failed to update movie:", error);
      alert("Something went wrong while updating the movie.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "white" }}>
      <h2 style={{ color: "white" }}>Edit Movie</h2>

      <label>
        Show ID:
        <input
          type="text"
          name="showId"
          value={formData.showId ?? ""}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title ?? ""}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Director:
        <input
          type="text"
          name="director"
          value={formData.director ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Cast:
        <input
          type="text"
          name="cast"
          value={formData.cast ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Release Year:
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear ?? new Date().getFullYear()}
          onChange={handleChange}
        />
      </label>

      <label>
        Rating:
        <input
          type="text"
          name="rating"
          value={formData.rating ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration ?? ""}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description ?? ""}
          onChange={handleChange}
        />
      </label>

      <br />
      <br />
      <fieldset>
        <legend>Genres</legend>
        <br />
        <div className="row">
          {genreFields.map((genre) => (
            <div className="col-4" key={genre}>
              <label>
                <input
                  type="checkbox"
                  name={genre}
                  checked={formData[genre] === 1}
                  onChange={handleChange}
                />
                {genre
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <button type="submit">Update Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditMovieForm;
