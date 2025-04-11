import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";
import CineNicheLogo from "../assets/CineNicheLogo.png";
import RequireAdmin from "./RequireAdmin";

function NavBar() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Profile dropdown state
  const profileRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hovered, setHovered] = useState(false);

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

    fetchAllMovies();
  }, []);

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
      className="navbar fixed-top px-4 py-0 text-white"
      style={{ backgroundColor: "#1a1a1a33", height: "90px" }}
    >
      <div
        className="container-fluid d-flex justify-between align-items-center w-100"
        style={{ height: "100%" }}
      >
        {/* Left: Logo */}
        <div className="logo">
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
                marginTop: "0px",
                objectFit: "contain",
                zIndex: 2,
                position: "fixed",
              }}
            />
          </Link>
        </div>

        <div style={{ marginLeft: "180px" }}>
          <Link
            className="nav-button"
            style={{
              backgroundColor: hovered ? "#c8af6f" : "#c9a449",
              color: "black",
            }}
            to="/userHomePage"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            All Movies
          </Link>
        </div>
        <div style={{ marginLeft: "20px"}}>
          <RequireAdmin>
            <Link
              className="nav-button"
              style={{
                backgroundColor: hovered ? "#c8af6f" : "#c9a449",
                color: "black",
              }}
              to="/adminmovies"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Admin Page
            </Link>
          </RequireAdmin>
        </div>
        {/* Center: Only the search bar now (hamburger menu is inside SearchBar) */}
        <div style={{ marginRight: "300px"}} className="d-flex align-items-center gap-3 flex-grow-1 justify-content-center">
          <SearchBar
            movies={movies}
            redirectTo="/userHomePage"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            //   searchTerm={""}
            //   setSearchTerm={function (value: SetStateAction<string>): void {
            //   throw new Error("Function not implemented.");
            // } }
          />
        </div>

        {/* Right: Profile icon and dropdown */}
        <div
          ref={profileRef}
          className="d-flex align-items-center gap-4 position-relative"
        >
          <FaUserCircle
            className="cursor-pointer"
            style={{
              color: "#B3B3B3",
              fontSize: "28px",
            }}
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
                  console.log("Logging out...");
                  navigate("/login");
                }}
                style={{
                  fontSize: "14px", // 👈 Slightly smaller
                }}
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

export default NavBar;
