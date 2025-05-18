import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
} from "react-icons/fi";
import "./style.css";

const images = [
  {
    id: 1,
    src: new URL("../../assets/gallery/img1.png", import.meta.url).href,
    alt: "Nature landscape",
    tags: ["nature", "outdoor", "scenic"],
  },
  {
    id: 2,
    src: new URL("../../assets/gallery/img2.png", import.meta.url).href,
    alt: "City skyline at dusk",
    tags: ["urban", "architecture", "cityscape"],
  },
  {
    id: 3,
    src: new URL("../../assets/gallery/img3.jpg", import.meta.url).href,
    alt: "Portrait of a woman",
    tags: ["people", "portrait", "fashion"],
  },
  {
    id: 4,
    src: new URL("../../assets/gallery/img4.png", import.meta.url).href,
    alt: "Gourmet food presentation",
    tags: ["food", "culinary", "gourmet"],
  },
  {
    id: 5,
    src: new URL("../../assets/gallery/img5.jpeg", import.meta.url).href,
    alt: "Tropical beach paradise",
    tags: ["travel", "beach", "vacation"],
  },
  {
    id: 6,
    src: new URL("../../assets/gallery/img6.jpeg", import.meta.url).href,
    alt: "Abstract geometric art",
    tags: ["art", "abstract", "design"],
  },
  {
    id: 7,
    src: new URL("../../assets/gallery/img7.png", import.meta.url).href,
    alt: "Wildlife in natural habitat",
    tags: ["animals", "wildlife", "nature"],
  },
  {
    id: 8,
    src: new URL("../../assets/gallery/img8.png", import.meta.url).href,
    alt: "Macro photography of flower",
    tags: ["nature", "macro", "closeup"],
  },
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Simulate loading delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGalleryImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setGalleryImages(images); // Fallback to static images
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const filteredImages = galleryImages.filter(
    (image) =>
      (activeFilter === "all" || image.tags.includes(activeFilter)) &&
      (searchTerm === "" ||
        image.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        image.alt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openImage = (index) => {
    setSelectedImage(filteredImages[index]);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImages = (direction) => {
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const getUniqueTags = () => {
    const allTags = galleryImages.flatMap((image) => image.tags);
    return ["all", ...new Set(allTags)].slice(0, 10); // Limit to 10 tags for UI
  };

  return (
    <div className="gallery-app">
      <header className="gallery-header">
        <div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="header-content"
        >
          <h1> Gallery</h1>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search images by tags or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="gallery-content">
        {isLoading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="image-skeleton">
                <div className="skeleton-animation"></div>
              </div>
            ))}
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="image-grid" layout>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="image-card"
                onClick={() => openImage(index)}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="image-wrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                  <div className="image-hover">
                    <FiZoomIn className="zoom-icon" />
                    <div className="image-stats"></div>
                    <div className="image-tags">
                      {image.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="no-results-content"
            >
              <h3>No images found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          className="image-modal-overlay"
          onClick={closeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="image-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) closeImage();
            }}
          >
            <button className="close-modal" onClick={closeImage}>
              <FiX />
            </button>

            <div className="modal-image-container">
              <img
                key={currentIndex}
                src={selectedImage.src}
                alt={selectedImage.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
              <button
                className="nav-button prev"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("prev");
                }}
              >
                <FiChevronLeft />
              </button>
              <button
                className="nav-button next"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("next");
                }}
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="image-info">
              <div className="info-header">
                <h3>{selectedImage.alt}</h3>
              </div>

              <div className="modal-tags">
                {selectedImage.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="image-meta">
                <div className="image-counter">
                  {currentIndex + 1} of {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
