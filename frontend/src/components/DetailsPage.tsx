import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie";
import { CollabRecommend } from "../types/CollabRecommend";
import { ContentRecommend } from "../types/ContentRecommend.ts";

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
          setCollabRecommend(collabData); // Assuming Recommendations is an array
        } else {
          console.error("Recommendations not found");
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

  return (
    <div>
      <h1>Recommendations for {title}</h1>

      <h2>Collaborative Recommendations</h2>
      {collabRecommend ? (
        <ul>
          {collabRecommend.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      ) : (
        <p>No collaborative recommendations available</p>
      )}

      <h2>Content Recommendations</h2>
      {contentRecommend ? (
        <ul>
          {contentRecommend.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      ) : (
        <p>No content recommendations available</p>
      )}
    </div>
  );
};

export default DetailsPage;
