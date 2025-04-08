import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";

interface SearchBarProps {
  movies: Movie[];
  redirectTo: string; // e.g., "/"
}

const SearchBar: React.FC<SearchBarProps> = ({ movies, redirectTo }) => {
  const [searchTerm, setSearchTermLocal] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMovies([]);
      setShowDropdown(false);
      return;
    }

    const results = movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
    setShowDropdown(true);
  }, [searchTerm, movies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`${redirectTo}?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSearchClick = (title: string) => {
    setSearchTermLocal(title);
    navigate(`${redirectTo}?search=${encodeURIComponent(title)}`);
    setShowDropdown(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="position-relative"
      style={{ maxWidth: "300px", width: "100%" }}
    >
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTermLocal(e.target.value)}
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
    </form>
  );
};

export default SearchBar;
