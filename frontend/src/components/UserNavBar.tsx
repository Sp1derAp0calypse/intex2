import { Link } from "react-router-dom";
function UserNavBar() {
  return (
    <nav className="navbar fixed-top bg-white border-bottom px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left section: Logo + About + Search */}
        <div className="d-flex align-items-center gap-4 flex-grow-1">
          <a className="navbar-brand mb-0" to="/">
            <h2 className="mb-0">CineNiche</h2>
          </a>

          <a className="nav-link text-secondary" to="/">
            Home
          </a>

          <a className="nav-link text-secondary" to="/myList">
            My List
          </a>

          <form className="d-flex" style={{ maxWidth: "300px", width: "100%" }}>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        {/* Right section: Subscribe + Login */}
        <div className="d-flex align-items-center gap-4">
          <a className="nav-link text-secondary" to="/subscribe">
            Settings
          </a>
          <a className="nav-link text-secondary" to="/account">
            My account
          </a>
        </div>
      </div>
    </nav>
  );
}

export default UserNavBar;
