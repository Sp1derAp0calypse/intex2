import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MoviesApi";

interface NewMovieFormProps {
  onSuccess: (newMovie: Movie) => void;
  onCancel: () => void;
}

// Full genre list
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

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    showId: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    releaseYear: new Date().getFullYear(),
    rating: "",
    duration: "",
    description: "",
    ...genreFields.reduce((acc, genre) => ({ ...acc, [genre]: 0 }), {}),
  });

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
      console.log("Submitting form data:", formData);
      const newMovie = await addMovie(formData);
      onSuccess(newMovie);
    } catch (error) {
      console.error("Failed to add movie:", error);
      alert(
        "Something went wrong while adding the movie. Please check the console for details."
      );
    }
  };
  return (
    <div className="card p-4 mb-4 shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
      <h2 className="mb-4 text-dark">Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Cast</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Rating</label>
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
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
                    checked={formData[genre] === 1}
                    onChange={handleChange}
                    className="form-check-input"
                    id={genre}
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
  
        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Add Movie
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default NewMovieForm;
