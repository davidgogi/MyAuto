import "./Carousel.css";
import { useState } from "react";

interface CarouselProps {
  imageBaseUrl: string;
  photo_ver: number;
}

const Carousel: React.FC<CarouselProps> = ({ imageBaseUrl, photo_ver }) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleRowMouseEnter = () => {
    setIsHovered(true);
  };

  const handleRowMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOverlayMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setActiveIndex(index);
  };

  const handleOverlayMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getImageUrl = (index: number) => {
    return `${imageBaseUrl.replace(
      "{PHOTO_INDEX}",
      index.toString()
    )}?v=${photo_ver}`;
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = event.target as HTMLImageElement;
    target.src =
      "https://www.obriencarcare.com/wp-content/plugins/wp-car-manager/assets/images/placeholder-single.png";
  };
  return (
    <div className="container">
      <div className="image-container">
        <img
          className="image"
          src={getImageUrl(activeIndex)}
          onError={handleImageError}
        />
      </div>
      <div
        className={`overlay-row ${isHovered ? "hovered" : ""}`}
        onMouseEnter={handleRowMouseEnter}
        onMouseLeave={handleRowMouseLeave}
      >
        <div
          className={`overlay ${hoveredIndex === 1 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(1)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 1 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 2 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(2)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 2 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 3 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(3)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 3 ? "red" : ""}`}></span>
        </div>
        <div
          className={`overlay ${hoveredIndex === 4 ? "hovered" : ""}`}
          onMouseEnter={() => handleOverlayMouseEnter(4)}
          onMouseLeave={handleOverlayMouseLeave}
        >
          <span className={`line ${hoveredIndex === 4 ? "red" : ""}`}></span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
