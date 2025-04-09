import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Movie } from "../types/Movie.ts";
import { CollabRecommend } from "../types/CollabRecommend.ts";
import { ContentRecommend } from "../types/ContentRecommend.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        `https://localhost:5000/Movie/getdetails/${title}`,
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
          `https://localhost:5000/Movie/collabrecommendations?title=${encodedTitle}`, // Correct URL for collaborative recommendations
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
          `https://localhost:5000/Movie/contentrecommendations?title=${encodedTitle}`,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>Recommendations for {title}</h1>
      {/* Movie Poster */}
      <div className="text-center">
        <LazyLoadImage
          src={movie?.poster_url || "/placeholder.png"} // Use fallback image if poster_url is null
          alt={movie?.title || "Placeholder Title"} // Use a fallback alt text if movie.title is null
          effect="blur" // or "opacity" or none
          className="img-fluid rounded"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.currentTarget.onerror = null; // prevent looping
            e.currentTarget.src = "/placeholder.png"; // Fallback to placeholder if image fails to load
          }}
        />
      </div>
      <h2>Content Recommendations</h2>
      {/* Render Content Recommendations */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {contentRecommend ? (
          contentRecommend.recommendations
            .filter((rec) => rec !== null) // Filter out null values
            .map((rec, index) => (
              <div
                key={index}
                style={{ maxWidth: "200px", textAlign: "center" }}
              >
                {/* Render Poster Image as a Link */}
                {rec?.posterUrl && (
                  <Link to={`/movie/details/${rec.title}`}>
                    <LazyLoadImage
                      src={rec.posterUrl}
                      alt={rec.title}
                      effect="blur"
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder.png"; // Fallback to placeholder
                      }}
                    />
                  </Link>
                )}
              </div>
            ))
        ) : (
          <p>No content recommendations available</p>
        )}
      </div>
      <h2>Collaborative Recommendations</h2>
      {/* Render Collaborative Recommendations */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {collabRecommend ? (
          collabRecommend.recommendations
            .filter((rec) => rec !== null) // Filter out null values
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
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.png"; // Fallback to placeholder
                    }}
                  />
                </Link>
              </div>
            ))
        ) : (
          <p>No collaborative recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
