import { JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Define types for individual carousel items
interface CarouselItem {
  title: string;
  image: string;
}

// Define props that the CarouselSection component expects
interface CarouselSectionProps {
  title: string;
  items: CarouselItem[];
}

// This component renders a titled carousel of images horizontally
export default function CarouselSection({
  title,
  items,
}: CarouselSectionProps): JSX.Element {
  return (
    <div className="my-8 px-4">
      {/* Section title */}
      <h2 className="text-xl text-white mb-2">{title}</h2>

      {/* Swiper carousel that scrolls horizontally */}
      <Swiper spaceBetween={10} slidesPerView={5}>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {/* Image for each item */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
