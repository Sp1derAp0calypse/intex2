import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";
import CineNicheLogo from "../assets/CineNicheLogo.png";
import RequireAdmin from "./RequireAdmin";

function UserNavBar({
  selectedCategories,
  setSelectedCategories,
  sortOrder,
  setSortOrder,
  searchTerm,
  setSearchTerm,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Fetch movies & categories
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await fetch("https://localhost:5000/Movie/allmovies", {
          credentials: "include",
        });
        const data = await res.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://localhost:5000/Movie/getmovietypes", {
          credentials: "include",
        });
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchAllMovies();
    fetchCategories();
  }, [selectedCategories]);

  // Close profile dropdown on outside click
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
      className="navbar fixed-top px-4 py-0 text-white"
      style={{ backgroundColor: "#1a1a1a33", height: "90px" }}
    >
      <div
        className="container-fluid d-flex justify-between align-items-center w-100"
        style={{ height: "100%" }}
      >
        {/* Left: Logo only */}
        <div className="d-flex align-items-center" style={{ height: "100%" }}>
          <Link
            to="/landingPage"
            className="navbar-brand mb-0 d-flex align-items-center"
            style={{ height: "100%", position: "relative", zIndex: 2 }}
          >
            <img
              src={CineNicheLogo}
              alt="CineNiche Logo"
              style={{
                height: "55px",
                objectFit: "contain",
                zIndex: 2,
                position: "fixed",
              }}
            />
          </Link>
        </div>

        {/* Center: Genre + Sort + SearchBar, shifted right */}
        <div className="d-flex align-items-center gap-3 ms-auto me-auto">
          {/* Genre Dropdown */}
          <div className="dropdown" style={{ position: "relative" }}>
            <button
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              style={{
                backgroundColor: "#c9a449",
                color: "black",
                border: "#c9a449",
                width: "auto",
              }}
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
                  <div className="form-check ps-1" key={c}>
                    <input
                      className="custom-yellow-checkbox me-2"
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

          {/* Sort */}
          <div>
            <select
              className="btn btn-secondary btn-sm d-inline-block w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{
                backgroundColor: "#c9a449",
                color: "black",
                border: "#c9a449",
                width: "auto",
              }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>

          {/* Search */}
          <div
            style={{
              minWidth: "300px",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <SearchBar
              movies={movies}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              redirectTo="/UserHomePage"
            />
          </div>
        </div>

        {/* Right: Recommendations + Profile */}
        <div
          ref={profileRef}
          className="d-flex align-items-center gap-4 position-relative"
        >
          <button
            className="btn btn-outline-light"
            onClick={() => {
              setSearchTerm("");
              navigate("/landingPage");
            }}
          >
            Home
          </button>

          <RequireAdmin>
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/adminmovies")}
            >
              Admin Page
            </button>
          </RequireAdmin>

          <FaUserCircle
            className="cursor-pointer"
            style={{ color: "#B3B3B3", fontSize: "28px" }}
            title="Profile"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          />

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
                className="px-3 py-2 cursor-pointer text-black"
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
