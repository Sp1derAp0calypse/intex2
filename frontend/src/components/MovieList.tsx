import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesApi";
import Pagination from "./Pagination";
import { Movie } from "../types/Movie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
    <div className="container mt-4">
      <h2 className="mb-3">Movies</h2>

      <div className="d-flex overflow-auto gap-3 pb-3">
        {sortedMovies.map((m) => (
          <div
            key={m.showId}
            className="card text-center"
            style={{ minWidth: "200px", maxWidth: "300px", flex: "0 0 auto" }}
          >
            {/* Poster goes outside .card-body to fill the card */}
            <LazyLoadImage
              src={m.poster_url}
              alt={m.title}
              effect="blur"
              className="rounded-top"
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.png";
              }}
            />

            <div className="card-body p-2">
              <h6 className="card-title">{m.title}</h6>
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/Movie/details/${m.title}`, {
                    state: { movie: m },
                  })
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

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
