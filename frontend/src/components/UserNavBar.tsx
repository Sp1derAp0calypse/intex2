import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar";

function UserNavBar() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/allmovies",
          "https://localhost:5000/Movie/allmovies",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to fetch movies for search bar: ", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <nav className="navbar fixed-top bg-white border-bottom px-4 py-3 z-10">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-4 flex-grow-1">
          <Link className="navbar-brand mb-0" to="/userHomePage">
            <h2 className="mb-0">CineNiche</h2>
          </Link>

          <Link className="nav-link text-secondary" to="/userHomePage">
            Home
          </Link>

          <Link className="nav-link text-secondary" to="/myList">
            My List
          </Link>

          {/* ✅ Integrated shared SearchBar */}
          <SearchBar movies={movies} redirectTo="/userHomePage" />
        </div>

        <div className="d-flex align-items-center gap-4">
          <Link className="nav-link text-secondary" to="/subscribe">
            Settings
          </Link>
          <Link className="nav-link text-secondary" to="/account">
            My Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default UserNavBar;
