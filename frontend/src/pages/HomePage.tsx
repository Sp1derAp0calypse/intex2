import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import MovieList from "../components/MovieList";
import UserNavBar from "../components/UserNavBar";

function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <UserNavBar />

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
