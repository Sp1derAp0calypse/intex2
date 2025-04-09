import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Movie } from "../types/Movie.ts";
import { CollabRecommend } from "../types/CollabRecommend.ts";
import { ContentRecommend } from "../types/ContentRecommend.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AuthorizeView from "../components/AuthorizeView.tsx";

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
    <div>
      <AuthorizeView>
        <h1>Recommendations for {title}</h1>

        {/* Movie Poster */}
        {movie?.poster_url && (
          <div className="mb-3 text-center">
            <LazyLoadImage
              src={movie.poster_url}
              alt={movie.title}
              effect="blur" // or "opacity" or none
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.onerror = null; // prevent looping
                e.currentTarget.src = "/placeholder.png"; // Fallback to placeholder if image fails to load
              }}
            />
          </div>
        )}

        <h2>Collaborative Recommendations</h2>
        {collabRecommend ? (
          <ul>
            {collabRecommend.recommendations.map((rec, index) => (
              <li key={index}>
                <Link to={`/movie/details/${rec}`}>{rec}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collaborative recommendations available</p>
        )}

        <h2>Content Recommendations</h2>
        {contentRecommend ? (
          <ul>
            {contentRecommend.recommendations.map((rec, index) => (
              <li key={index}>
                <Link to={`/movie/details/${rec}`}>{rec}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No content recommendations available</p>
        )}
      </AuthorizeView>
    </div>
  );
};

export default DetailsPage;
