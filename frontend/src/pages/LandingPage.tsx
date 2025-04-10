import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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
  const [genreRecommendations, setGenreRecommendations] = useState<any[]>([]);
  const [loadingGenres, setLoadingGenres] = useState<boolean>(true);
  const [errorGenres, setErrorGenres] = useState<string>("");

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

  const getRandomGenres = () => {
    const genres = [
      "children",
      "comedies",
      "documentaries",
      "fantasy",
      "dramas",
      "musicals",
      "thrillers",
      "talkshowstvcomedies",
      "comediesromanticmovies",
      "familyMovies",
      "naturetv",
      "horrormovies",
      "realitytv",
      "crimetvshowsdocuseries",
      "tvcomedies",
    ];
    const shuffledGenres = [...genres].sort(() => Math.random() - 0.5);
    return shuffledGenres.slice(0, 5); // Get 5 random genres
  };

  // Function to fetch genre recommendations from the backend
  const fetchGenreRecommendations = async (genre: string) => {
    const response = await fetch(
      `https://localhost:5000/Movie/genrerecommendations?genre=${encodeURIComponent(genre)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.movies; // [{ title, posterUrl }]
    } else {
      console.error("Genre recommendations not found for genre:", genre);
      return [];
    }
  };

  // Function to fetch recommendations for all random genres
  const fetchRecommendations = async () => {
    try {
      const randomGenres = getRandomGenres(); // Get 5 random genres
      const genrePromises = randomGenres.map(fetchGenreRecommendations); // Fetch genre recommendations for each genre
      const recommendations = await Promise.all(genrePromises);

      // Combine genre and recommendations for display
      const genreRecs = randomGenres.map((genre, index) => ({
        genre,
        recommendations: recommendations[index],
      }));

      setGenreRecommendations(genreRecs);
    } catch (error: any) {
      setErrorGenres(error.message);
    } finally {
      setLoadingGenres(false);
    }
  };

  const genreMap: { [key: string]: string } = {
    children: "Children's Movies",
    comedies: "Comedies",
    documentaries: "Documentaries",
    fantasy: "Fantasy",
    dramas: "Dramas",
    musicals: "Musicals",
    thrillers: "Thrillers",
    talkshowstvcomedies: "Talk Shows TV Comedies",
    comediesromanticmovies: "Comedies & Romantic Movies",
    familyMovies: "Family Movies",
    naturetv: "Nature TV",
    horrormovies: "Horror Movies",
    realitytv: "Reality TV",
    crimetvshowsdocuseries: "Crime TV Shows & Docuseries",
    tvcomedies: "TV Comedies",
  };

  useEffect(() => {
    fetchRecommendations(); // Fetch genre-based recommendations when the component mounts
  }, []);

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
    <div>
      <NavBar />
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
                                style={{
                                  maxWidth: "200px",
                                  textAlign: "center",
                                }}
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

          {/* Genre-Based Recommendations */}
          {loadingGenres ? (
            <div>Loading genre-based recommendations...</div>
          ) : errorGenres ? (
            <div>Error: {errorGenres}</div>
          ) : (
            genreRecommendations.map((genreRec, index) => (
              <div key={index}>
                <h3 style={{ color: "white" }}>
                  {genreMap[genreRec.genre.toLowerCase()] || genreRec.genre}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginBottom: "30px",
                  }}
                >
                  {genreRec.recommendations.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      style={{ maxWidth: "200px", textAlign: "center" }}
                    >
                      <Link to={`/movie/details/${rec.title}`}>
                        <LazyLoadImage
                          src={rec.poster_url}
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
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedTitles;
