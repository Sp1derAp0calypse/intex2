import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  movies: Movie[];
  redirectTo: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  movies,
  redirectTo,
  searchTerm,
  setSearchTerm,
}) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`${redirectTo}?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleSearchClick = (title: string) => {
    setSearchTerm(title);
    navigate(`${redirectTo}?search=${encodeURIComponent(title)}`);
    setShowDropdown(false);
  };

  return (
    <div className="position-relative" style={{ maxWidth: "350px", width: "100%" }} ref={menuRef}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#B3B3B3",
          borderRadius: "50px",
          padding: "6px 12px",
          gap: "8px",
        }}
      >
        <input
          type="search"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#000",
            flex: 1,
          }}
        />

        <FaSearch style={{ color: "#333", fontSize: "16px" }} />

        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              navigate(redirectTo);
              setShowDropdown(false);
            }}
            style={{
              marginLeft: "8px",
              border: "none",
              background: "transparent",
              color: "#333",
              fontSize: "16px",
              cursor: "pointer",
            }}
            title="Clear Search"
          >
            ✕
          </button>
        )}
      </form>

      {showDropdown && filteredMovies.length > 0 && (
        <ul
          className="position-absolute w-100 mt-2 z-3"
          style={{
            listStyle: "none",
            backgroundColor: "#B3B3B3",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "4px 0",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredMovies.map((movie) => (
            <li
              key={movie.showId}
              onClick={() => handleSearchClick(movie.title || "")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                color: "#000",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#999")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#B3B3B3")
              }
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
