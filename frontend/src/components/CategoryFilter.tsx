import { useEffect, useState } from "react";
import "../css/CategoryFilter.css";

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/getmovietypes",
          // "https://localhost:5000/Movie/getmovietypes",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log("Fetched categories", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Filter by Genre</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={c} className="category-text">
                {c}
              </label>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
