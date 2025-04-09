import "./App.css";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import MovieList from "./components/MovieList";
//import NavBar from "./components/NavBar";
//import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Privacy from "./components/Privacy";
import AdminMoviesPage from "./pages/AdminMovieList";
import UserHomePage from "./pages/UserHomePage";
import CookieConsent from "react-cookie-consent";
import NewNavBar from "./components/NewNavBar";
import NewHomePage from "./pages/NewHomePage";
// import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const consent = Cookies.get('userCookieConsent');

  //   if (consent === 'true') {
  //     // Safe to initialize tracking/analytics
  //     console.log("Consent given. Loading analytics...");
  //     // initGoogleAnalytics(); or similar
  //   } else {
  //     console.log("No consent, not loading trackers.");
  //   }
  // }, []);
  return (
    <Router>
      <NewNavBar />
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route
          path="/movielist"
          element={<MovieList selectedCategories={[]} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscribe" element={<RegisterPage />} />
        <Route path="Movie/details/:title" element={<DetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/adminmovies" element={<AdminMoviesPage />} />
        <Route path="/userHomePage" element={<UserHomePage />} />
      </Routes>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      <Footer />
    </Router>
  );
}

export default App;
