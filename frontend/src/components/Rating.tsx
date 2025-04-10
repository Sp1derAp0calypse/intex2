import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ showId }: { showId: string }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = async (value: number) => {
    setRating(value);
    try {
      const response = await fetch(
        `https://localhost:5000/rate?showId=${showId}&rating=${value}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to save rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h5 style={{ color: "white" }}>Rate this movie:</h5>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={30}
            style={{ marginRight: 8, cursor: "pointer" }}
            color={(hover ?? rating ?? 0) >= star ? "#f5c518" : "#ccc"}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
      {submitted && <p style={{ color: "lightgreen" }}>Thanks for rating!</p>}
    </div>
  );
};

export default Rating;
