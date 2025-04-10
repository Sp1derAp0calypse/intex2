import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p>© {new Date().getFullYear()} CineNiche. All rights reserved.</p>
        <p>
          <Link to="/privacy">Privacy and Terms</Link>
        </p>
      </div>
      <div>
        <a></a>
      </div>
    </footer>
  );
}

export default Footer;
