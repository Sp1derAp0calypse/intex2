import "./App.css";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />

      <main className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movielist"
            element={<MovieList selectedCategories={[]} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscribe" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
