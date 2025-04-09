import { Link } from "react-router-dom";
import "../css/NavBar.css";
import CineNicheLogo from "../assets/CineNicheLogo.png";

function WelcomeNavBar() {
  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        {/* Left */}
        <div className="navbar-logo-container flex-grow-1">
          <Link to="/landingPage" className="navbar-brand">
            <img
              src={CineNicheLogo}
              alt="CineNiche Logo"
              className="navbar-logo-img"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="navbar-profile">
          <Link className="nav-link text-white" to="/subscribe">
            Subscribe
          </Link>
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default WelcomeNavBar;
