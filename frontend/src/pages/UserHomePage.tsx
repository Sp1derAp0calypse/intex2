import { useLocation } from "react-router-dom";
import { useState } from "react";
import MovieList from "../components/MovieList";
import AuthorizeView from "../components/AuthorizeView";
import UserNavBar from "../components/UserNavBar";

function UserHomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  return (
    <AuthorizeView>
      <UserNavBar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <MovieList
        selectedCategories={selectedCategories}
        searchTerm={searchTerm}
        sortOrder={sortOrder}
      />
    </AuthorizeView>
  );
}

export default UserHomePage;
