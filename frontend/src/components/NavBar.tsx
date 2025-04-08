import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar";

function NavBar() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await fetch("https://localhost:5000/Movie/allmovies", {
          credentials: "include",
        });
        const data = await res.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to fetch movies for search bar: .", error);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <nav className="navbar fixed-top bg-white border-bottom px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left */}
        <div className="d-flex align-items-center gap-4 flex-grow-1">
          <Link className="navbar-brand mb-0" to="/">
            <h2 className="mb-0">CineNiche</h2>
          </Link>

          <Link className="nav-link text-secondary" to="/about">
            About
          </Link>

          <SearchBar movies={movies} redirectTo="/" />
        </div>

        {/* Right */}
        <div className="d-flex align-items-center gap-4">
          <Link className="nav-link text-secondary" to="/subscribe">
            Subscribe
          </Link>
          <Link className="nav-link text-secondary" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
