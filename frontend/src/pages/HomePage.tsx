import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import MovieList from "../components/MovieList";
import NavBar from "../components/NavBar";

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <NavBar />

        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <MovieList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
