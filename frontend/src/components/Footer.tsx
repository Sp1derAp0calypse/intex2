import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
// import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} CineNiche. All rights reserved.
        </p>
        <p className="small">
          <Link to="/about" className="text-muted">
            About
          </Link>{" "}
          ·
          <Link to="/privacy" className="text-muted mx-2">
            Privacy
          </Link>
        </p>
      </div>
      <div className="mb-3">
        <a
          href="https://www.instagram.com"
          className="text-muted mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.facebook.com"
          className="text-muted mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://www.twitter.com"
          className="text-muted mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
