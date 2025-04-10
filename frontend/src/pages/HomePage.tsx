import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import MovieList from "../components/MovieList";
//import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Back from "../components/Back";

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  return (
    <>
      <div className="container mt-4">
        <NavBar />
        <Back />

        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <MovieList
              selectedCategories={selectedCategories}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
