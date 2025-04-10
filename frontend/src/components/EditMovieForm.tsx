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
      await updateMovie(formData.showId!, formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to update movie:", error);
      alert("Something went wrong while updating the movie.");
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
      <h2 className="mb-4 text-dark">Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Show ID</label>
            <input
              type="text"
              name="showId"
              value={formData.showId ?? ""}
              onChange={handleChange}
              className="form-control"
              required
              disabled
            />
          </div>
  
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title ?? ""}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
  
          {[
            { label: "Type", name: "type" },
            { label: "Director", name: "director" },
            { label: "Cast", name: "cast" },
            { label: "Country", name: "country" },
            { label: "Release Year", name: "releaseYear", type: "number" },
            { label: "Rating", name: "rating" },
            { label: "Duration", name: "duration" },
          ].map(({ label, name, type = "text" }) => (
            <div className="col-md-6" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                name={name}
                value={(formData as any)[name] ?? ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          ))}
  
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description ?? ""}
              onChange={handleChange}
              className="form-control"
              rows={3}
            />
          </div>
        </div>
  
        <fieldset className="mt-4">
          <legend className="text-dark">Genres</legend>
          <div className="row">
            {genreFields.map((genre) => (
              <div className="col-md-4" key={genre}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name={genre}
                    id={genre}
                    checked={formData[genre] === 1}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor={genre}>
                    {genre
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
  
        <div className="mt-4 d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-success">
            Update Movie
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default EditMovieForm;
