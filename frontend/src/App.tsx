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
      console.log("Consent given. Loading analytics...");
      // initGoogleAnalytics(); or similar
    } else if (consent === "false") {
      console.log("No consent, not loading trackers.");
    } else {
      console.log("User hasn't made a cookie choice yet");
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
        location="bottom"
        enableDeclineButton
        declineButtonText="Decline"
        buttonText="Accept All"
        cookieName="userCookieConsent"
        style={{ background: "#000" }}
        buttonStyle={{ color: "#fff", fontSize: "14px" }}
        declineButtonStyle={{
          color: "#fff",
          background: "#c0392b",
          fontSize: "14px",
        }}
        expires={365}
        onAccept={() => {
          console.log("Cookies accepted");
        }}
        onDecline={() => {
          console.log("Cookies declined");
        }}
      >
        We use cookies to improve user experience. By clicking "Accept All," you
        consent to the use of cookies.
      </CookieConsent>

      <Footer />
    </Router>
  );
}

export default App;
