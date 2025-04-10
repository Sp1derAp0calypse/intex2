import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { deleteMovie, fetchMovies } from "../api/MoviesApi";
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import AuthorizeView from "../components/AuthorizeView";

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(pageSize, pageNum, []);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string | undefined) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete || !showId) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((m) => m.showId !== showId));
    } catch (error) {
      alert("Failed to delete movie. Please try again.");
    }
  };

  const getGenres = (movie: Movie) => {
    const genres = [];
    if (movie.action) genres.push("Action");
    if (movie.adventure) genres.push("Adventure");
    if (movie.animeSeriesInternationalTvShows) genres.push("Anime Series");
    if (movie.britishTvShowsDocuseriesInternationalTvShows)
      genres.push("British TV");
    if (movie.comedies) genres.push("Comedies");
    if (movie.crimeTvShowsDocuseries) genres.push("Crime");
    if (movie.documentaries) genres.push("Documentaries");
    if (movie.dramas) genres.push("Dramas");
    if (movie.familyMovies) genres.push("Family");
    if (movie.fantasy) genres.push("Fantasy");
    if (movie.horrorMovies) genres.push("Horror");
    if (movie.internationalMoviesThrillers) genres.push("Thrillers");
    // Add other genre checks as necessary
    return genres.join(", ");
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <AuthorizeView>
        <h1 style={{ color: "white" }}>Admin - Movie List</h1>

        {!showForm && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
          >
            Add Movie
          </button>
        )}

        {showForm && (
          <NewMovieForm
            onSuccess={() => {
              setShowForm(false);
              fetchMovies(pageSize, pageNum, []).then((data) =>
                setMovies(data.movies)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingMovie && (
          <EditMovieForm
            movie={editingMovie}
            onSuccess={() => {
              setEditingMovie(null);
              fetchMovies(pageSize, pageNum, []).then((data) =>
                setMovies(data.movies)
              );
            }}
            onCancel={() => setEditingMovie(null)}
          />
        )}

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Director</th>
              <th>Cast</th>
              <th>Country</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Genres</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.showId}>
                <td>{m.showId}</td>
                <td>{m.title}</td>
                <td>{m.type}</td>
                <td>{m.director}</td>
                <td>{m.cast}</td>
                <td>{m.country}</td>
                <td>{m.releaseYear}</td>
                <td>{m.rating}</td>
                <td>{m.duration}</td>
                <td>{m.description}</td>
                <td>{getGenres(m)}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm w-100 mb-1"
                    onClick={() => {
                      setEditingMovie(m);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-100 mb-1"
                    onClick={() => handleDelete(m.showId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </AuthorizeView>
    </>
  );
};

export default AdminMoviesPage;
