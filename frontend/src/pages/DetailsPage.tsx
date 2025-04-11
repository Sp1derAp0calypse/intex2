import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Movie } from "../types/Movie.ts";
import { CollabRecommend } from "../types/CollabRecommend.ts";
import { ContentRecommend } from "../types/ContentRecommend.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AuthorizeView from "../components/AuthorizeView.tsx";
import MovieDetailsCard from "../components/MovieDetailsCard.tsx";
import Rating from "../components/Rating.tsx";
import NavBar from "../components/NavBar.tsx";

const DetailsPage = () => {
  const { title } = useParams<{ title: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [collabRecommend, setCollabRecommend] =
    useState<CollabRecommend | null>(null);
  const [contentRecommend, setContentRecommend] =
    useState<ContentRecommend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/getdetails/${title}`,
        // `https://localhost:5000/Movie/getdetails/${title}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const movieData = await response.json();
        setMovie(movieData);
      } else {
        console.error("Movie not found");
      }
    };

    if (title) fetchMovieDetails();
  }, [title]);

  useEffect(() => {
    const fetchCollab = async () => {
      if (title) {
        const encodedTitle = encodeURIComponent(title); // URL-encode the title
        const response = await fetch(
          `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/collabrecommendations?title=${encodedTitle}`, // Correct URL for collaborative recommendations
          // `https://localhost:5000/Movie/collabrecommendations?title=${encodedTitle}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const collabData: CollabRecommend = await response.json();
          if (collabData.recommendations.length === 0) {
            setCollabRecommend(null); // Clear recommendations if empty
          } else {
            setCollabRecommend(collabData); // Set new recommendations
          }
        } else {
          console.error("Recommendations not found");
          setCollabRecommend(null); // Clear recommendations on error
        }
      }
    };

    if (title) fetchCollab();
  }, [title]);

  useEffect(() => {
    const fetchContent = async () => {
      if (title) {
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(
          `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/contentrecommendations?title=${encodedTitle}`,
          // `https://localhost:5000/Movie/contentrecommendations?title=${encodedTitle}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const contentData: ContentRecommend = await response.json();
          setContentRecommend(contentData);
        } else {
          console.error("Recommendations not found");
        }
      }
    };

    if (title) fetchContent();
  }, [title]);

  useEffect(() => {
    if (movie) {
      setLoading(false);
    }
  }, [movie]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <AuthorizeView>
          <h1 style={{ color: "white" }}>{title}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              alignItems: "flex-start",
              flexWrap: "nowrap",
              marginBottom: "30px",
            }}
          >
            {/* Movie Poster on the left */}
            <div style={{ flexShrink: 0 }}>
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
            </div>

            {/* Movie Details on the right */}
            {movie && (
              <div style={{ maxWidth: "1200px", flex: "1 1 auto" }}>
                <MovieDetailsCard movie={movie} />
              </div>
            )}
          </div>

          {movie && (
            <div style={{ marginTop: "-40px", marginBottom: "20px" }}>
              <Rating showId={movie.showId} />{" "}
              {/* Pass the movie's showId to Rating */}
            </div>
          )}

          <h2 style={{ color: "white", textAlign: "left", marginLeft: "0" }}>
            Similar to {title}
          </h2>

          {/* Render Content Recommendations */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {contentRecommend ? (
              contentRecommend.recommendations
                .filter((rec) => rec !== null)
                .map((rec, index) => (
                  <div
                    key={index}
                    style={{ maxWidth: "200px", textAlign: "center" }}
                  >
                    {rec?.posterUrl && (
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
                    )}
                  </div>
                ))
            ) : (
              <p style={{ color: "white" }}>
                No content recommendations available
              </p>
            )}
          </div>

          <h2
            style={{
              color: "white",
              textAlign: "left",
              marginLeft: "0",
              marginTop: "40px",
            }}
          >
            Fans of {title} also like
          </h2>

          {/* Render Collaborative Recommendations */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {collabRecommend ? (
              collabRecommend.recommendations
                .filter((rec) => rec !== null)
                .map((rec, index) => (
                  <div
                    key={index}
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
                ))
            ) : (
              <p style={{ color: "white" }}>
                No collaborative recommendations available; go rate the movies
                you like!
              </p>
            )}
          </div>
        </AuthorizeView>
      </div>
    </div>
  );
};

export default DetailsPage;
