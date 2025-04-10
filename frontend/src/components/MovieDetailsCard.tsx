import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { FaStar } from "react-icons/fa";

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

  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Movie/getaveragerating/${movie.title}`,
          {
            method: "GET",
            credentials: "include", // Include credentials if necessary
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data); // Log the response to the console
          setAverageRating(data.averageRating);
        } else {
          console.error("Error fetching average rating");
        }
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchAverageRating();
  }, []); // Empty dependency array, so it runs once when the component mounts

  return (
    <div
      className="card mb-4 "
      style={{
        backgroundColor: "#1a1a1a", // gentle blue tone
        color: "white",
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
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Director:</strong> {movie.director}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Average Rating:</strong>{" "}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            {averageRating !== null ? (
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={30}
                    style={{ marginRight: 8 }}
                    color={averageRating >= star ? "#f5c518" : "#ccc"} // Color based on average rating
                  />
                ))}
              </div>
            ) : (
              <p style={{ color: "lightgrey" }}>
                No user ratings found. Be the first!
              </p>
            )}
          </div>
        </li>
        <li
          className="list-group-item"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <strong>Cast:</strong> {movie.cast}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Country:</strong> {movie.country}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Release Year:</strong> {movie.releaseYear}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Rating:</strong> {movie.rating}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Duration:</strong> {movie.duration}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Description:</strong> {movie.description}
        </li>
        <li
          className="list-group-item"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
          }}
        >
          <strong>Genres:</strong> {genres.length ? genres.join(", ") : "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default MovieDetailsCard;
