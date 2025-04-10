import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SimpleCarousel from "../components/SimpleCarousel";
import { CarouselItem } from "../types/contentTypes"; // :white_check_mark: Shared type definition
import { Movie } from "../types/Movie";
import { LazyLoadImage } from "react-lazy-load-image-component"; // Assuming you're using this component
import { Link } from "react-router-dom"; // For routing to movie details

const RecommendedTitles = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [contentRecommend, setContentRecommend] = useState<any[]>([]);
  const [recommendationsFetched, setRecommendationsFetched] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchRecommendedTitles = async () => {
      try {
        const res = await fetch(
          // `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/recommended-titles`,
          `https://localhost:5000/Movie/recommended-titles`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch recommended titles");
        }

        const data: Movie[] = await res.json();
        setMovies(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedTitles();
  }, []);

  const fetchContentRecommendations = async (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      // `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/contentrecommendations?title=${encodedTitle}`,
      `https://localhost:5000/Movie/contentrecommendations?title=${encodedTitle}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const contentData = await response.json();
      setContentRecommend((prevRecommendations) => [
        ...prevRecommendations,
        { title, recommendations: contentData.recommendations },
      ]);
    } else {
      console.error("Recommendations not found");
    }
  };

  useEffect(() => {
    if (!recommendationsFetched && movies.length > 0) {
      // Fetch content recommendations for each movie only once
      movies.forEach((movie) => {
        fetchContentRecommendations(movie.title || "");
      });
      setRecommendationsFetched(true);
    }
  }, [movies, recommendationsFetched]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {movies.map((movie) => (
          <div
            key={movie.showId}
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            <NavBar />
            {/* Movie Poster on the left */}
            {/* <div style={{ flexShrink: 0 }}>
              <LazyLoadImage
                src={movie?.poster_url || "/placeholder.png"}
                alt={movie?.title || "Placeholder Title"}
                effect="blur"
                className="img-fluid rounded"
                style={{
                  width: "380px",
                  height: "520px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
                }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div> */}

            {/* Movie Title and Content Recommendations */}
            <div style={{ flex: "1 1 auto" }}>
              {/* Content Recommendations */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                  marginBottom: "30px",
                }}
              >
                {contentRecommend
                  .filter(
                    (recommendation) => recommendation.title === movie.title
                  )
                  .map((recData, index) => (
                    <div key={index}>
                      <h3 style={{ color: "white" }}>
                        Because you watched {movie.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        {recData.recommendations?.map(
                          (rec: any, idx: number) => (
                            <div
                              key={idx}
                              style={{ maxWidth: "200px", textAlign: "center" }}
                            >
                              <Link to={`/movie/details/${rec.title}`}>
                                <LazyLoadImage
                                  src={rec.posterUrl}
                                  alt={rec.title}
                                  effect="blur"
                                  className="img-fluid rounded"
                                  style={{
                                    width: "200px",
                                    height: "300px",
                                    objectFit: "cover",
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = "/placeholder.png";
                                  }}
                                />
                              </Link>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTitles;
