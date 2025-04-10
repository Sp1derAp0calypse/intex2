import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = ({ showId }: { showId: string }) => {
  const [rating, setRating] = useState<number | null>(null); // State to store the selected rating
  const [hover, setHover] = useState<number | null>(null); // State to handle hover effect for stars
  const [submitted, setSubmitted] = useState(false); // State to handle submission status

  const handleRating = async (value: number) => {
    setRating(value); // Set the rating value when a user clicks a star

    try {
      const response = await fetch(
        // `https://intex2-315-backend-gxdsgxfwavhyc8ax.eastus-01.azurewebsites.net/Movie/rate?showId=${showId}&rating=${value}`,
        `https://localhost:5000/Movie/rate?showId=${showId}&rating=${value}`,
        {
          method: "POST",
          credentials: "include", // To include cookies or session info
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            showId, // Sending show ID
            rating: value, // Sending the rating
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true); // Successfully submitted the rating
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
            color={(hover ?? rating ?? 0) >= star ? "#f5c518" : "#ccc"} // Change the color based on hover or rating
            onMouseEnter={() => setHover(star)} // Highlight stars on hover
            onMouseLeave={() => setHover(null)} // Reset hover effect
            onClick={() => handleRating(star)} // Handle the click to submit the rating
          />
        ))}
      </div>
      {submitted && <p style={{ color: "lightgreen" }}>Thanks for rating!</p>}
    </div>
  );
};

export default Rating;
