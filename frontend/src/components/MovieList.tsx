import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesApi";
import Pagination from "./Pagination";
import { Movie } from "../types/Movie";

function MovieList({ selectedCategories }: { selectedCategories: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(pageSize, pageNum, selectedCategories);

        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const sortedMovies = [...movies].sort((a, b) => {
    const titleA = a.title || "";
    const titleB = b.title || "";

    if (sortOrder === "asc") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label className="form-label me-2">Sort by Title:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {sortedMovies.map((m) => {
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
          internationalTvShowsRomanticTvShowsTvDramas:
            "Intl. TV / Romantic / Dramas",
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
          .filter(([key]) => (m as any)[key] === 1)
          .map(([_, label]) => label);

        return (
          <div className="card mb-3" id="movieCard" key={m.showId}>
            <div className="card-header bg-dark text-white">
              <h3 className="card-title">{m.title}</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Director: </strong>
                  {m.director}
                </li>
                <li className="list-group-item">
                  <strong>Cast: </strong>
                  {m.cast}
                </li>
                <li className="list-group-item">
                  <strong>Country: </strong>
                  {m.country}
                </li>
                <li className="list-group-item">
                  <strong>Release Year: </strong>
                  {m.releaseYear}
                </li>
                <li className="list-group-item">
                  <strong>Rating: </strong>
                  {m.rating}
                </li>
                <li className="list-group-item">
                  <strong>Duration: </strong>
                  {m.duration}
                </li>
                <li className="list-group-item">
                  <strong>Description: </strong>
                  {m.description}
                </li>
                <li className="list-group-item">
                  <strong>Genres: </strong>
                  {genres.length ? genres.join(", ") : "N/A"}
                </li>
              </ul>

              <button
                className="btn btn-primary mt-3"
                onClick={() =>
                  navigate(`/details/${m.title}/${m.showId}`, {
                    state: { movie: m },
                  })
                }
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default MovieList;
