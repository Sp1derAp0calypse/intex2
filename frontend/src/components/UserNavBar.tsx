import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function UserNavBar() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://localhost:5000/Movie/allmovies", {
          credentials: "include",
        });
        const data = await response.json();
        setMovies(data.movies); // Assuming the API returns the movies under the 'movies' key
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log("Search term updated:", searchTerm);
  }, [searchTerm]);

  return (
    <nav className="navbar fixed-top bg-white border-bottom px-4 py-3 z-10">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left section: Logo + Links + Search */}
        <div className="d-flex align-items-center gap-4 flex-grow-1 position-relative">
          <Link className="navbar-brand mb-0" to="/">
            <h2 className="mb-0">CineNiche</h2>
          </Link>

          <Link className="nav-link text-secondary" to="/">
            Home
          </Link>

          <Link className="nav-link text-secondary" to="/myList">
            My List
          </Link>

          {/* Use the SearchBar component */}
          <SearchBar movies={movies} setSearchTerm={setSearchTerm} />
        </div>

        {/* Right section: Settings + Account */}
        <div className="d-flex align-items-center gap-4">
          <Link className="nav-link text-secondary" to="/subscribe">
            Settings
          </Link>
          <Link className="nav-link text-secondary" to="/account">
            My account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default UserNavBar;
