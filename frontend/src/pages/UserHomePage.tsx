import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import AuthorizeView from "../components/AuthorizeView";
import UserNavBar from "../components/UserNavBar";
import { useLocation } from "react-router-dom";

function UserHomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search") || "";
    setSearchTerm(search);
  }, [location.search]);
  // const searchTerm = queryParams.get("search") || "";

  return (
    <AuthorizeView>
      <UserNavBar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
