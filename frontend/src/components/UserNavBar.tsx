import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movie";

function UserNavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://localhost:5000/Movie/allmovies", {
          credentials: "include",
        });
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies([]);
      setShowDropdown(false);
      return;
    }

    const results = movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(results.slice(0, 5)); // Show only top 5 results
    setShowDropdown(true);
  }, [searchTerm, movies]);

  const handleSearchClick = (title: string) => {
    setSearchTerm(title);
    setShowDropdown(false);
  };

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

          <div
            style={{ maxWidth: "300px", width: "100%" }}
            className="position-relative"
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />

            {showDropdown && filteredMovies.length > 0 && (
              <ul className="list-group position-absolute w-100 mt-1 shadow z-50">
                {filteredMovies.map((movie) => (
                  <li
                    key={movie.showId}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSearchClick(movie.title || "")}
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
