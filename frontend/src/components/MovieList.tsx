import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MoviesApi";
import { Movie } from "../types/Movie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function MovieList({
  selectedCategories,
  searchTerm = "",
  sortOrder = "asc",
}: {
  selectedCategories: string[];
  searchTerm?: string;
  sortOrder?: string;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const pageSize = 18;

  // Fetch movies when pageNum or filters change
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

        setMovies((prev) =>
          pageNum === 1 ? data.movies : [...prev, ...data.movies]
        );
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageNum, selectedCategories, searchTerm]);

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pageNum < totalPages && !loading) {
        setPageNum((prev) => prev + 1);
      }
    });

    observerRef.current.observe(sentinel);

    return () => observerRef.current?.disconnect();
  }, [sentinelRef, pageNum, totalPages, loading]);

  // Apply sorting
  const sortedMovies = [...movies].sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  // UI
  if (loading && movies.length === 0) return <p>Loading Movies...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "2rem 1rem",
        backgroundColor: "#000",
      }}
    >
      <h1 className="text-white mb-4" style={{ fontWeight: 600 }}>
        All CineNiche Movies
      </h1>

      <div className="d-flex justify-content-center">
        <div
          className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          {sortedMovies
            .filter((m) => m.poster_url && m.poster_url.trim() !== "")
            .map((m) => (
              <div
                key={m.showId}
                className="col d-flex justify-content-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/Movie/details/${m.title}`, {
                    state: { movie: m },
                  });
                }}
              >
                <LazyLoadImage
                  src={m.poster_url}
                  alt={m.title}
                  effect="blur"
                  className="rounded"
                  style={{
                    width: "100%",
                    maxWidth: "180px",
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
      </div>

      {/* Infinite scroll trigger */}
      <div ref={sentinelRef} style={{ height: "60px" }}></div>
    </div>
  );
}

export default MovieList;
