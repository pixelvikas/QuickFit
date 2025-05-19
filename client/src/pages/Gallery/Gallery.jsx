import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
} from "react-icons/fi";

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

      <style>
        {`
        :root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --primary-dark: #3a0ca3;
  --secondary: #f72585;
  --accent: #4cc9f0;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
  --white: #ffffff;
  --black: #000000;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  --border-radius: 12px;
  --border-radius-sm: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f7ff;
  color: var(--dark);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.gallery-app {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-content {
  margin-bottom: 2.5rem;
}

.gallery-header h1 {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(primary-dark);
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--gray);
  font-size: 1.15rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
}

.search-bar {
  margin-bottom: 1.5rem;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--white);
  border-radius: 50px;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.search-input:focus-within {
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  border-color: var(--primary-light);
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  color: var(--gray);
  font-size: 1.1rem;
}

.search-input input {
  width: 100%;
  padding: 0.9rem 1.25rem 0.9rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  transition: var(--transition);
  background: transparent;
  color: var(--dark);
}

.search-input input:focus {
  outline: none;
}

.search-input input::placeholder {
  color: var(--gray);
  opacity: 0.8;
}

.clear-search {
  position: absolute;
  right: 1.25rem;
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.clear-search:hover {
  color: var(--dark);
  background: var(--light-gray);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tag-filter {
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  background: var(--light-gray);
  color: var(--dark);
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.tag-filter:hover {
  background: #e2e6ea;
}

.tag-filter.active {
  background: var(--primary);
  color: var(--white);
}

.gallery-content {
  position: relative;
  min-height: 60vh;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.image-skeleton {
  aspect-ratio: 1 / 1;
  background: var(--light-gray);
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
}

.skeleton-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.image-card {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  aspect-ratio: 1 / 1;
  cursor: pointer;
  background: var(--white);
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1.5rem;
  transition: var(--transition);
}

.image-card:hover .image-hover {
  opacity: 1;
}

.zoom-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--white);
  font-size: 2.5rem;
  opacity: 0.9;
}

.image-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  color: var(--white);
  font-size: 0.9rem;
  font-weight: 500;
}

.image-stats span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
}

.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: var(--primary);
  color: var(--white);
  padding: 0.35rem 0.9rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 4rem 0;
  color: var(--gray);
}

.no-results-content {
  max-width: 500px;
  margin: 0 auto;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.no-results p {
  margin-bottom: 1.5rem;
}

.no-results button {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: var(--white);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.no-results button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Modal Styles */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.image-modal {
  background: var(--white);
  border-radius: var(--border-radius);
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
}

.close-modal {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
}

.close-modal:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: rotate(90deg);
}

.modal-image-container {
  position: relative;
  width: 100%;
  height: 65vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.modal-image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--border-radius-sm) var(--border-radius-sm) 0 0;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: var(--white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.nav-button.prev {
  left: 2rem;
}

.nav-button.next {
  right: 2rem;
}

.image-info {
  padding: 1.75rem;
  background: var(--white);
  border-top: 1px solid var(--light-gray);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark);
}

.image-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--light-gray);
  color: var(--dark);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
}

.action-btn:hover {
  background: #e2e6ea;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.image-meta {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--light-gray);
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.75rem;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.meta-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
}

.image-counter {
  margin-left: auto;
  color: var(--gray);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

@media (max-width: 1024px) {
  .gallery-header h1 {
    font-size: 2.5rem;
  }

  .modal-image-container {
    height: 55vh;
  }
}

@media (max-width: 768px) {
  .gallery-app {
    padding: 1.5rem 1rem;
  }

  .gallery-header h1 {
    font-size: 2.25rem;
  }

  .image-grid,
  .loading-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .modal-image-container {
    height: 50vh;
    min-height: 300px;
  }

  .nav-button {
    width: 3rem;
    height: 3rem;
  }

  .image-info {
    padding: 1.5rem;
  }
}

@media (max-width: 576px) {
  .gallery-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .image-grid,
  .loading-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .modal-image-container {
    height: 40vh;
  }

  .image-info h3 {
    font-size: 1.25rem;
  }

  .image-actions {
    width: 100%;
    justify-content: space-between;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }

  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .nav-button.prev {
    left: 1rem;
  }

  .nav-button.next {
    right: 1rem;
  }
}

@media (max-width: 400px) {
  .image-grid,
  .loading-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .filter-tags {
    gap: 0.5rem;
  }

  .tag-filter {
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
  }
}
`}
      </style>
    </div>
  );
};

export default Gallery;
