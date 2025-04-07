import "./App.css";
import Footer from "./Footer";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import RegisterPage from "./RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />

      <main className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movielist" element={<MovieList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscribe" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
