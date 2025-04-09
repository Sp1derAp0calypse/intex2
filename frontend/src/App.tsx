import "./App.css";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import MovieList from "./components/MovieList";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Privacy from "./components/Privacy";
import AdminMoviesPage from "./pages/AdminMovieList";
import UserHomePage from "./pages/UserHomePage";
import CookieConsent from "react-cookie-consent";
import RequireAdmin from "./components/RequireAdmin";
import WelcomePage from "./pages/WelcomPage";
import WelcomeNavBar from "./components/WelcomeNavBar";

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
      <WelcomeNavBar />
      <div className="app-wrapper" style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/movielist"
            element={<MovieList selectedCategories={[]} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscribe" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/Movie/details/:title" element={<DetailsPage />} />
          <Route
            path="/adminmovies"
            element={
              <RequireAdmin>
                <AdminMoviesPage />
              </RequireAdmin>
            }
          />
          <Route path="/userHomePage" element={<UserHomePage />} />
        </Routes>
      </div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      <Footer />
    </Router>
  );
}

export default App;
