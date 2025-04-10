import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SimpleCarousel from "../components/SimpleCarousel";
import { CarouselItem } from "../types/contentTypes"; // :white_check_mark: Shared type definition
const LandingPage = () => {
  // List the genres you want carousels for
  const genreList = [
    "Action",
    "Comedies",
    "Dramas",
    "Documentaries",
    "Thrillers",
  ];
  const [genreRecs, setGenreRecs] = useState<Record<string, CarouselItem[]>>(
    {}
  );
  useEffect(() => {
    const fetchGenreRecs = async () => {
      const allResults: Record<string, CarouselItem[]> = {};
      for (const genre of genreList) {
        try {
          const res = await fetch(
            `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/genre?genre=${genre}&count=5`,
            {
              credentials: "include",
            }
          );
          if (res.ok) {
            const data = await res.json();
            allResults[genre] = data.map((m: any) => ({
              title: m.title,
              image: m.poster_url || "/placeholder.png", // :white_check_mark: Corrected field
            }));
          } else {
            console.warn(`No movies found for genre ${genre}`);
            allResults[genre] = [];
          }
        } catch (error) {
          console.error(`Error fetching genre: ${genre}`, error);
          allResults[genre] = [];
        }
      }
      setGenreRecs(allResults);
    };
    fetchGenreRecs();
  }, []);
  return (
    <>
      <NavBar />
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "60px",
          backgroundColor: "#333333",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          {/* Render each genre carousel */}
          {genreList.map((genre) => (
            <SimpleCarousel
              key={genre}
              title={genre}
              items={genreRecs[genre] || []}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default LandingPage;
