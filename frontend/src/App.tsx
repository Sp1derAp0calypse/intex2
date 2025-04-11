import "./App.css";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import Privacy from "./components/Privacy";
import AdminMoviesPage from "./pages/AdminMovieList";
import UserHomePage from "./pages/UserHomePage";
import CookieConsent, { Cookies } from "react-cookie-consent";
import RequireAdmin from "./components/RequireAdmin";
import WelcomePage from "./pages/WelcomPage";
// import WelcomeNavBar from "./components/WelcomeNavBar";
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";

// import { useEffect } from "react";

function App() {
  useEffect(() => {
    const consent = Cookies.get("userCookieConsent");

    if (consent === "true") {
      // Safe to initialize tracking/analytics
      console.log("Consent given. Loading analytics...");
      // initGoogleAnalytics(); or similar
    } else {
      console.log("No consent, not loading trackers.");
    }
  }, []);
  return (
    <Router>
      {/* <WelcomeNavBar /> */}
      <div className="app-wrapper" style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
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
          <Route path="/landingPage" element={<LandingPage />} />
        </Routes>
      </div>
      <CookieConsent
        enableDeclineButton
        onAccept={() => {
          console.log("User accepted cookies");
        }}
        onDecline={() => {
          console.log("User declined cookies");
        }}
        buttonStyle={{
          color: "#4e503b",
          fontSize: "13px",
          backgroundColor: "#c9a449",
          borderRadius: "6px",
          padding: "8px 16px",
        }}
        declineButtonStyle={{
          color: "white",
          backgroundColor: "#888",
          fontSize: "13px",
          borderRadius: "6px",
          padding: "8px 16px",
        }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      <Footer />
    </Router>
  );
}

export default App;
