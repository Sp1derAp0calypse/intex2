import "./App.css";
import LoginPage from "./LoginPage";
import MovieList from "./MovieList";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MovieList selectedCategories={[]} />} />
          <Route
            path="/movielist"
            element={<MovieList selectedCategories={[]} />}
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
