import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; // You can use any icon you prefer

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "absolute",
        top: "76px", // Adjust as needed
        left: "40px", // Adjust as needed
        background: "transparent",
        border: "none",
        cursor: "pointer",
        opacity: 1, // Make it fully visible for testing
        transition: "opacity 0.3s",
        zIndex: 10, // Ensure it sits above content
        padding: "10px", // Make the button larger for visibility
        borderRadius: "50%", // Make it a circular button
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")} // Highlight on hover
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")} // Keep it visible
    >
      <HiArrowLeft size={32} color="#fff" /> {/* Larger icon for visibility */}
    </button>
  );
};

export default BackButton;
