import { useNavigate } from "react-router-dom";
import FaqList from "../components/FaqList";
function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    navigate("/subscribe");
  };
  return (
    <>
      <div className="add-wrapper">
        {/* Hero Section */}
        <div
          className="hero-background text-white flex items-center justify-center"
          style={{ backgroundImage: `url('/placeholdeHomeNew.png')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              WATCH AND EXPLORE RARE MOVIES
            </h1>
            <h3 className="text-lg mb-6">
              Stream cult classics, indie favorites, and international films,
              all handpicked for our collection.
            </h3>
            <br />

            <p className="text-lg mb-6">Starts at $7.99. Cancel anytime.</p>
            <br />
            <p className="mb-4">
              Ready to watch? Click on get started to create or login to your
              account.
            </p>
            <br />
            <button
              type="submit"
              onClick={handleClick}
              style={{
                backgroundColor: "#c9a449", // Your logo yellow
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.375rem",
                fontWeight: 600,
                border: "none",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
        <br />
        <br />
        {/* FAQ Section */}
        <div className="text-white mt-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently asked questions:{" "}
          </h2>
          <FaqList />
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
