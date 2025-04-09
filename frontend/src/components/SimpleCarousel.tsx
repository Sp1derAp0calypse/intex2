import { useRef } from "react";
import { Link } from "react-router-dom";
import { CarouselItem } from "../types/contentTypes";
import "../css/SimpleCarousel.css";

interface SimpleCarouselProps {
  title: string;
  items: CarouselItem[];
}
const SimpleCarousel = ({ title, items }: SimpleCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  if (!items || items.length === 0) {
    return <p style={{ color: "white" }}>No movies found for {title}.</p>;
  }
  return (
    <div className="carousel-wrapper">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-controls">
        <button onClick={() => scroll("left")} className="arrow">
          &#8249;
        </button>
        <div className="carousel-container" ref={containerRef}>
          {items.map((item, idx) => (
            <div className="carousel-item" key={idx}>
              <Link to={`/movie/details/${item.title}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </Link>
              {item.title && <p>{item.title}</p>}
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="arrow">
          &#8250;
        </button>
      </div>
    </div>
  );
};
export default SimpleCarousel;
