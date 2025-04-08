import { useEffect, useState } from "react";
import { Movie } from "../types/Movie";

interface SearchBarProps {
  movies: Movie[]; // You should be passing movies from the parent
  setSearchTerm: (term: string) => void; // Function to set search term in the parent
}

const SearchBar: React.FC<SearchBarProps> = ({ movies, setSearchTerm }) => {
  const [searchTerm, setSearchTermLocal] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter movies based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMovies([]);
      setShowDropdown(false);
      return;
    }

    // Filter movies by title
    const results = movies.filter((movie) =>
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(results);
    setShowDropdown(true);
  }, [searchTerm, movies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermLocal(value);
    setSearchTerm(value); // Sync the search term with the parent
  };

  const handleSearchClick = (title: string) => {
    setSearchTermLocal(title);
    setSearchTerm(title); // Sync the state with the parent
    setShowDropdown(false); // Close the dropdown when an item is selected
  };

  return (
    <div style={{ maxWidth: "300px", width: "100%" }} className="position-relative">
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
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
  );
};

export default SearchBar;
