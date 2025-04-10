import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesApi";
import Pagination from "./Pagination";
import { Movie } from "../types/Movie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../css/MovieList.css";

function MovieList({
  selectedCategories,
  searchTerm = "",
}: {
  selectedCategories: string[];
  searchTerm?: string;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, _setSortOrder] = useState<string>("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(
          pageSize,
          pageNum,
          selectedCategories,
          searchTerm
        );

        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum, selectedCategories, searchTerm]);

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
    <div className="movie-scroll-row">
      <h2 className="mb-3 text-white text-center">All CineNiche Movies</h2>
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

      <div className="d-flex overflow-auto gap-3 pb-3">
        {sortedMovies.map((m) => (
          <div
            key={m.showId}
            className="bg-transparent border-0"
            style={{
              minWidth: "200px",
              maxWidth: "200px",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/Movie/details/${m.title}`, { state: { movie: m } })
            }
          >
            <LazyLoadImage
              src={m.poster_url}
              alt={m.title}
              effect="blur"
              className="rounded"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "8px",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.png";
              }}
            />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
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
    </div>
  );
}

export default MovieList;
