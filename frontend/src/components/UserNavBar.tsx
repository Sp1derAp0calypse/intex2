import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";
import CineNicheLogo from "../assets/CineNicheLogo.png";

function UserNavBar({
  selectedCategories,
  setSelectedCategories,
  sortOrder,
  setSortOrder,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Profile dropdown state

  const profileRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);

  // Fetch movies for the search bar
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await fetch(
          // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/allmovies",
          "https://localhost:5000/Movie/allmovies",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to fetch movies for search bar:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          // "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/getmovietypes",
          "https://localhost:5000/Movie/getmovietypes",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchAllMovies();
    fetchCategories();
  }, [selectedCategories]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav
      className="navbar fixed-top border-bottom px-4 py-0 text-white"
      style={{ backgroundColor: "#333333", height: "70px" }}
    >
      <div
        className="container-fluid d-flex justify-content-between align-items-center w-100"
        style={{ height: "100%" }}
      >
        {/* Left Section: Logo + Genre Dropdown */}
        <div
          className="d-flex align-items-center gap-4"
          style={{ height: "100%" }}
        >
          {/* Logo */}
          <Link
            to="/landingPage"
            className="navbar-brand mb-0 d-flex align-items-center"
            style={{ height: "100%", position: "relative", zIndex: 2 }}
          >
            <img
              src={CineNicheLogo}
              alt="CineNiche Logo"
              style={{
                height: "100px",
                marginTop: "0px",
                objectFit: "contain",
                zIndex: 2,
                position: "fixed",
              }}
            />
          </Link>

          {/* Genre Filter Dropdown */}
          <div
            className="dropdown"
            style={{ position: "relative", marginLeft: "100px" }}
          >
            <button
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
            >
              Genres
            </button>
            {genreDropdownOpen && (
              <div
                className="dropdown-menu show p-2"
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  zIndex: 9999,
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "10px",
                }}
              >
                {categories.map((c) => (
                  <div className="form-check" key={c}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`genre-${c}`}
                      value={c}
                      checked={selectedCategories.includes(c)}
                      onChange={({ target }) => {
                        const updated = selectedCategories.includes(
                          target.value
                        )
                          ? selectedCategories.filter((g) => g !== target.value)
                          : [...selectedCategories, target.value];
                        setSelectedCategories(updated);
                      }}
                    />
                    <label className="form-check-label" htmlFor={`genre-${c}`}>
                      {c}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="ms-3">
          <label className="text-white me-2">Sort:</label>
          <select
            className="btn btn-secondary btn-sm d-inline-block w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-grow-1 d-flex justify-content-center">
          <div
            style={{
              marginLeft: "175px",
              minWidth: "300px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <SearchBar movies={movies} redirectTo="/UserHomePage" />
          </div>
        </div>

        {/* Right Section: Profile Menu + Recommendations Link */}
        <div
          ref={profileRef}
          className="d-flex align-items-center gap-4 position-relative"
        >
          {/* Movie Recommendations Button */}
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/landingPage")}
          >
            Movie Recommendations
          </button>

          {/* Profile Icon */}
          <FaUserCircle
            className="cursor-pointer"
            style={{
              color: "#B3B3B3",
              fontSize: "28px",
            }}
            title="Profile"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          />

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div
              className="position-absolute top-100 end-0 mt-2 z-3"
              style={{
                backgroundColor: "#B3B3B3",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                minWidth: "120px",
                padding: "8px 0",
              }}
            >
              <div
                className="px-3 py-2 cursor-pointer"
                onClick={() => {
                  setProfileMenuOpen(false);
                  navigate("/login");
                }}
                style={{ fontSize: "14px" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#999")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#B3B3B3")
                }
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default UserNavBar;
