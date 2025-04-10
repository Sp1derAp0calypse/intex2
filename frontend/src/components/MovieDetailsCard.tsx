import { Movie } from "../types/Movie";

interface Props {
  movie: Movie;
}

const MovieDetailsCard = ({ movie }: Props) => {
  const genreMap: { [key: string]: string } = {
    action: "Action",
    adventure: "Adventure",
    animeSeriesInternationalTvShows: "Anime Series / Intl. TV Shows",
    britishTvShowsDocuseriesInternationalTvShows:
      "British / Docuseries / Intl. TV",
    children: "Children",
    comedies: "Comedies",
    comediesDramasInternationalMovies: "Comedies / Dramas / Intl. Movies",
    comediesInternationalMovies: "Comedies / Intl. Movies",
    comediesRomanticMovies: "Comedies / Romantic Movies",
    crimeTvShowsDocuseries: "Crime TV / Docuseries",
    documentaries: "Documentaries",
    documentariesInternationalMovies: "Documentaries / Intl. Movies",
    docuseries: "Docuseries",
    dramas: "Dramas",
    dramasInternationalMovies: "Dramas / Intl. Movies",
    dramasRomanticMovies: "Dramas / Romantic Movies",
    familyMovies: "Family Movies",
    fantasy: "Fantasy",
    horrorMovies: "Horror Movies",
    internationalMoviesThrillers: "Intl. Movies / Thrillers",
    internationalTvShowsRomanticTvShowsTvDramas: "Intl. TV / Romantic / Dramas",
    kidsTv: "Kids TV",
    languageTvShows: "Language TV Shows",
    musicals: "Musicals",
    natureTv: "Nature TV",
    realityTv: "Reality TV",
    spirituality: "Spirituality",
    tvAction: "TV Action",
    tvComedies: "TV Comedies",
    tvDramas: "TV Dramas",
    talkShowsTvComedies: "Talk Shows / TV Comedies",
    thrillers: "Thrillers",
  };

  const genres = Object.entries(genreMap)
    .filter(([key]) => (movie as any)[key] === 1)
    .map(([_, label]) => label);

  return (
    <div
      className="card mb-4"
      style={{
        backgroundColor: "#e0ebf5", // gentle blue tone
        color: "#1a1a1a",
        fontSize: "1.1rem",
        textAlign: "left",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <ul className="list-group list-group-flush">
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Director:</strong> {movie.director}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Cast:</strong> {movie.cast}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Country:</strong> {movie.country}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Release Year:</strong> {movie.releaseYear}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Rating:</strong> {movie.rating}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Duration:</strong> {movie.duration}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Description:</strong> {movie.description}
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Genres:</strong> {genres.length ? genres.join(", ") : "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default MovieDetailsCard;
