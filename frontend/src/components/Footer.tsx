import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} CineNiche. All rights reserved.
        </p>
        <p className="small">
          <a href="/about" className="text-muted">
            About
          </a>{" "}
          ·
          <a href="/privacy" className="text-muted mx-2">
            Privacy
          </a>{" "}
          ·
          <a href="/terms" className="text-muted">
            Terms
          </a>
        </p>
      </div>
      <div className="mb-3">
        <a
          href=""
          className="text-muted mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href=""
          className="text-muted mx-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href=""
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
