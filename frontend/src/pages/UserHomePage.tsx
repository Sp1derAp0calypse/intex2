import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserNavBar from "../components/UserNavBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieList from "../components/MovieList";
import AuthorizeView from "../components/AuthorizeView";

function UserHomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  return (
    <>
      <AuthorizeView>
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
              <MovieList
                selectedCategories={selectedCategories}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </AuthorizeView>
    </>
  );
}

export default UserHomePage;
