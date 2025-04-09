import { useNavigate } from "react-router-dom";
import NewNavBar from "../components/WelcomeNavBar";

function NewHomePage() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    navigate("/subscribe");
  };
  return (
    <>
      <NewNavBar />

      {/* Hero Section */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholderHome.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to CineNiche, where you can watch and explore!
          </h1>
          <p className="text-lg mb-6">Starts at $7.99. Cancel anytime.</p>
          <p className="mb-4">
            Ready to watch? Click on get started to create or login to your
            account.
          </p>

          <button
            type="submit"
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default NewHomePage;
