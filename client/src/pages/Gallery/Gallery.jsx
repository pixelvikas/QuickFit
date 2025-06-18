import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiDownload,
  FiFilter,
} from "react-icons/fi";
import Mark from "../../assets/quickfitlogo.svg";

const images = [
  {
    id: 1,
    src: new URL("../../assets/gallery/img1.png", import.meta.url).href,
    alt: "Offshore container production line",
    tags: ["manufacturing", "production", "industrial"],
  },
  {
    id: 2,
    src: new URL("../../assets/gallery/img2.png", import.meta.url).href,
    alt: "Container welding process",
    tags: ["welding", "fabrication", "steelwork"],
  },
  {
    id: 3,
    src: new URL("../../assets/gallery/img3.jpg", import.meta.url).href,
    alt: "Quality inspection of containers",
    tags: ["quality", "inspection", "safety"],
  },
  {
    id: 4,
    src: new URL("../../assets/gallery/img4.png", import.meta.url).href,
    alt: "Container surface treatment",
    tags: ["coating", "corrosion", "protection"],
  },
  {
    id: 5,
    src: new URL("../../assets/gallery/img5.jpeg", import.meta.url).href,
    alt: "Finished containers ready for shipment",
    tags: ["logistics", "shipping", "delivery"],
  },
  {
    id: 6,
    src: new URL("../../assets/gallery/img6.jpeg", import.meta.url).href,
    alt: "Container load testing",
    tags: ["testing", "durability", "certification"],
  },
  {
    id: 7,
    src: new URL("../../assets/gallery/img7.png", import.meta.url).href,
    alt: "Custom container design",
    tags: ["engineering", "design", "custom"],
  },
  {
    id: 8,
    src: new URL("../../assets/gallery/img8.png", import.meta.url).href,
    alt: "Container lifting equipment",
    tags: ["handling", "cranes", "lifting"],
  },
  {
    id: 9,
    src: new URL("../../assets/gallery/img9.png", import.meta.url).href,
    alt: "Offshore container in use at sea",
    tags: ["offshore", "marine", "deployment"],
  },
  {
    id: 10,
    src: new URL("../../assets/gallery/img10.png", import.meta.url).href,
    alt: "Container certification process",
    tags: ["certification", "standards", "compliance"],
  },
  {
    id: 11,
    src: new URL("../../assets/gallery/img11.jpg", import.meta.url).href,
    alt: "Container workshop overview",
    tags: ["facility", "workshop", "production"],
  },
  {
    id: 12,
    src: new URL("../../assets/gallery/img12.jpg", import.meta.url).href,
    alt: "Container door mechanism",
    tags: ["components", "hardware", "mechanism"],
  },
  {
    id: 13,
    src: new URL("../../assets/gallery/img13.jpg", import.meta.url).href,
    alt: "Container stacking system",
    tags: ["storage", "organization", "logistics"],
  },
  {
    id: 14,
    src: new URL("../../assets/gallery/img14.png", import.meta.url).href,
    alt: "Container corrosion protection",
    tags: ["coating", "marine", "protection"],
  },
  {
    id: 15,
    src: new URL("../../assets/gallery/img15.jpg", import.meta.url).href,
    alt: "Container transport vehicles",
    tags: ["transport", "handling", "equipment"],
  },
  {
    id: 16,
    src: new URL("../../assets/gallery/img16.png", import.meta.url).href,
    alt: "Container ventilation systems",
    tags: ["ventilation", "design", "features"],
  },
  {
    id: 17,
    src: new URL("../../assets/gallery/img17.png", import.meta.url).href,
    alt: "Container safety features",
    tags: ["safety", "engineering", "design"],
  },
  {
    id: 18,
    src: new URL("../../assets/gallery/img18.png", import.meta.url).href,
    alt: "Container loading demonstration",
    tags: ["demonstration", "capacity", "usage"],
  },
  {
    id: 19,
    src: new URL("../../assets/gallery/img19.jpg", import.meta.url).href,
    alt: "Container manufacturing team",
    tags: ["team", "workers", "production"],
  },
  {
    id: 20,
    src: new URL("../../assets/gallery/img20.png", import.meta.url).href,
    alt: "Container technical drawings",
    tags: ["design", "blueprints", "engineering"],
  },
  {
    id: 21,
    src: new URL("../../assets/gallery/img21.jpg", import.meta.url).href,
    alt: "Container material storage",
    tags: ["materials", "inventory", "supply"],
  },
  {
    id: 22,
    src: new URL("../../assets/gallery/img22.png", import.meta.url).href,
    alt: "Container paint booth",
    tags: ["painting", "finishing", "coating"],
  },
  {
    id: 23,
    src: new URL("../../assets/gallery/img23.jpg", import.meta.url).href,
    alt: "Container forklift handling",
    tags: ["forklift", "material", "handling"],
  },
  {
    id: 24,
    src: new URL("../../assets/gallery/img24.jpg", import.meta.url).href,
    alt: "Container production machinery",
    tags: ["machinery", "equipment", "automation"],
  },
  {
    id: 25,
    src: new URL("../../assets/gallery/img25.jpg", import.meta.url).href,
    alt: "Container quality control",
    tags: ["quality", "inspection", "control"],
  },
  {
    id: 26,
    src: new URL("../../assets/gallery/img26.jpg", import.meta.url).href,
    alt: "Container corner casting",
    tags: ["components", "hardware", "lifting"],
  },

  {
    id: 28,
    src: new URL("../../assets/gallery/img28.png", import.meta.url).href,
    alt: "Container on offshore platform",
    tags: ["offshore", "platform", "deployment"],
  },
  {
    id: 29,
    src: new URL("../../assets/gallery/img29.png", import.meta.url).href,
    alt: "Container production workflow",
    tags: ["process", "workflow", "manufacturing"],
  },
  {
    id: 30,
    src: new URL("../../assets/gallery/img30.png", import.meta.url).href,
    alt: "Container loading capacity test",
    tags: ["testing", "capacity", "durability"],
  },
  {
    id: 31,
    src: new URL("../../assets/gallery/img31.png", import.meta.url).href,
    alt: "Container special modifications",
    tags: ["custom", "modification", "specialized"],
  },
  {
    id: 32,
    src: new URL("../../assets/gallery/img32.png", import.meta.url).href,
    alt: "Container transport by ship",
    tags: ["shipping", "logistics", "transport"],
  },
  {
    id: 33,
    src: new URL("../../assets/gallery/img33.png", import.meta.url).href,
    alt: "Container insulation process",
    tags: ["insulation", "temperature", "control"],
  },
  {
    id: 34,
    src: new URL("../../assets/gallery/img34.png", import.meta.url).href,
    alt: "Container certification labels",
    tags: ["certification", "compliance", "standards"],
  },
  {
    id: 35,
    src: new URL("../../assets/gallery/img35.png", import.meta.url).href,
    alt: "Container production robots",
    tags: ["automation", "robotics", "manufacturing"],
  },
  {
    id: 36,
    src: new URL("../../assets/gallery/img36.png", import.meta.url).href,
    alt: "Container workshop safety",
    tags: ["safety", "ppe", "workshop"],
  },
  {
    id: 37,
    src: new URL("../../assets/gallery/img37.png", import.meta.url).href,
    alt: "Container door sealing",
    tags: ["weatherproof", "sealing", "components"],
  },
  {
    id: 38,
    src: new URL("../../assets/gallery/img38.png", import.meta.url).href,
    alt: "Container floor construction",
    tags: ["flooring", "construction", "durability"],
  },
  {
    id: 39,
    src: new URL("../../assets/gallery/img39.jpg", import.meta.url).href,
    alt: "Container wall panel production",
    tags: ["panels", "fabrication", "components"],
  },
  {
    id: 40,
    src: new URL("../../assets/gallery/img40.jpg", import.meta.url).href,
    alt: "Container roof assembly",
    tags: ["roof", "assembly", "waterproofing"],
  },
  {
    id: 41,
    src: new URL("../../assets/gallery/img41.jpeg", import.meta.url).href,
    alt: "Container electrical systems",
    tags: ["electrical", "wiring", "lighting"],
  },
  {
    id: 42,
    src: new URL("../../assets/gallery/img42.jpeg", import.meta.url).href,
    alt: "Container marking and labeling",
    tags: ["identification", "labeling", "standards"],
  },
  {
    id: 43,
    src: new URL("../../assets/gallery/img43.png", import.meta.url).href,
    alt: "Container loading equipment",
    tags: ["loading", "equipment", "handling"],
  },
  {
    id: 44,
    src: new URL("../../assets/gallery/img44.jpeg", import.meta.url).href,
    alt: "Container maintenance workshop",
    tags: ["maintenance", "repair", "service"],
  },
  {
    id: 45,
    src: new URL("../../assets/gallery/img45.jpeg", import.meta.url).href,
    alt: "Container security features",
    tags: ["security", "locking", "mechanisms"],
  },
  {
    id: 46,
    src: new URL("../../assets/gallery/img46.jpg", import.meta.url).href,
    alt: "Container temperature control",
    tags: ["climate", "control", "insulated"],
  },
  {
    id: 47,
    src: new URL("../../assets/gallery/img47.jpg", import.meta.url).href,
    alt: "Container production materials",
    tags: ["materials", "steel", "components"],
  },
  {
    id: 48,
    src: new URL("../../assets/gallery/img48.jpg", import.meta.url).href,
    alt: "Container welding quality check",
    tags: ["welding", "inspection", "quality"],
  },
  {
    id: 49,
    src: new URL("../../assets/gallery/img49.jpg", import.meta.url).href,
    alt: "Container production line robots",
    tags: ["automation", "robotics", "welding"],
  },
  {
    id: 50,
    src: new URL("../../assets/gallery/img50.jpg", import.meta.url).href,
    alt: "Container loading demonstration",
    tags: ["loading", "capacity", "demonstration"],
  },
  {
    id: 51,
    src: new URL("../../assets/gallery/img51.jpg", import.meta.url).href,
    alt: "Container corner protection",
    tags: ["protection", "corners", "durability"],
  },
  {
    id: 52,
    src: new URL("../../assets/gallery/img52.jpg", import.meta.url).href,
    alt: "Container production safety",
    tags: ["safety", "ppe", "workshop"],
  },
  {
    id: 53,
    src: new URL("../../assets/gallery/img53.jpg", import.meta.url).href,
    alt: "Container special coatings",
    tags: ["coatings", "protection", "marine"],
  },
  {
    id: 54,
    src: new URL("../../assets/gallery/img54.jpg", import.meta.url).href,
    alt: "Container lifting points",
    tags: ["lifting", "hardware", "safety"],
  },
  {
    id: 55,
    src: new URL("../../assets/gallery/img55.jpg", import.meta.url).href,
    alt: "Container production planning",
    tags: ["planning", "engineering", "design"],
  },
  {
    id: 56,
    src: new URL("../../assets/gallery/img56.jpg", import.meta.url).href,
    alt: "Container stacking system",
    tags: ["storage", "organization", "yard"],
  },
  {
    id: 57,
    src: new URL("../../assets/gallery/img57.jpg", import.meta.url).href,
    alt: "Container transport by truck",
    tags: ["transport", "logistics", "delivery"],
  },
  {
    id: 58,
    src: new URL("../../assets/gallery/img58.jpeg", import.meta.url).href,
    alt: "Container production metrics",
    tags: ["metrics", "quality", "performance"],
  },
  {
    id: 59,
    src: new URL("../../assets/gallery/img59.jpeg", import.meta.url).href,
    alt: "Container door hinges",
    tags: ["components", "hardware", "doors"],
  },
  {
    id: 60,
    src: new URL("../../assets/gallery/img60.jpeg", import.meta.url).href,
    alt: "Container production training",
    tags: ["training", "workers", "skills"],
  },
  {
    id: 61,
    src: new URL("../../assets/gallery/img61.jpeg", import.meta.url).href,
    alt: "Container wall strength test",
    tags: ["testing", "durability", "strength"],
  },
  {
    id: 62,
    src: new URL("../../assets/gallery/img62.jpeg", import.meta.url).href,
    alt: "Container production innovation",
    tags: ["innovation", "technology", "design"],
  },
  {
    id: 63,
    src: new URL("../../assets/gallery/img63.jpeg", import.meta.url).href,
    alt: "Container loading equipment",
    tags: ["loading", "equipment", "handling"],
  },
  {
    id: 64,
    src: new URL("../../assets/gallery/img64.jpg", import.meta.url).href,
    alt: "Container production efficiency",
    tags: ["efficiency", "process", "optimization"],
  },
  {
    id: 65,
    src: new URL("../../assets/gallery/img65.jpg", import.meta.url).href,
    alt: "Container special applications",
    tags: ["specialized", "custom", "applications"],
  },
  {
    id: 66,
    src: new URL("../../assets/gallery/img66.jpg", import.meta.url).href,
    alt: "Container production teamwork",
    tags: ["teamwork", "collaboration", "workers"],
  },
  {
    id: 67,
    src: new URL("../../assets/gallery/img67.jpg", import.meta.url).href,
    alt: "Container documentation process",
    tags: ["documentation", "records", "compliance"],
  },
  {
    id: 68,
    src: new URL("../../assets/gallery/img68.jpg", import.meta.url).href,
    alt: "Container production safety signs",
    tags: ["safety", "signage", "workshop"],
  },
  {
    id: 69,
    src: new URL("../../assets/gallery/img69.jpeg", import.meta.url).href,
    alt: "Container final inspection",
    tags: ["inspection", "quality", "final"],
  },
  {
    id: 70,
    src: new URL("../../assets/gallery/img70.jpeg", import.meta.url).href,
    alt: "Container shipping preparation",
    tags: ["shipping", "packaging", "delivery"],
  },
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const modalRef = useRef(null);
  const canvasRef = useRef(null);

  // Load images with simulated delay
  useEffect(() => {
    const loadImages = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setGalleryImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setGalleryImages(images);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeImage();
      } else if (e.key === "ArrowLeft") {
        navigateImages("prev");
      } else if (e.key === "ArrowRight") {
        navigateImages("next");
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Filter images based on search and active filter
  const filteredImages = useCallback(() => {
    return galleryImages.filter(
      (image) =>
        (activeFilter === "all" || image.tags.includes(activeFilter)) &&
        (searchTerm === "" ||
          image.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          image.alt.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [galleryImages, activeFilter, searchTerm]);

  // Get unique tags for filter buttons
  const getUniqueTags = useCallback(() => {
    const allTags = galleryImages.flatMap((image) => image.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const sortedTags = Object.keys(tagCounts).sort(
      (a, b) => tagCounts[b] - tagCounts[a]
    );

    return ["all", ...sortedTags].slice(0, 15);
  }, [galleryImages]);

  // Image modal functions
  const openImage = (index) => {
    setSelectedImage(filteredImages()[index]);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
    if (isFullscreen) {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  const navigateImages = (direction) => {
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredImages().length) % filteredImages().length
        : (currentIndex + 1) % filteredImages().length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages()[newIndex]);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      modalRef.current?.requestFullscreen?.().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsFullscreen(false);
    }
  };

  // Watermark and download functions
  const addWatermark = useCallback((imageUrl, callback) => {
    const canvas = canvasRef.current || document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const watermark = new Image();

    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      watermark.src = Mark;
      watermark.onload = () => {
        // Set watermark opacity
        ctx.globalAlpha = 0.3; // Reduced opacity for multiple watermarks

        // Define positions for watermarks (at least 10 positions)
        const positions = [
          // Center
          {
            x: (img.width - watermark.width) / 2,
            y: (img.height - watermark.height) / 2,
          },
          // Corners
          { x: 20, y: 20 }, // Top-left
          { x: img.width - watermark.width - 20, y: 20 }, // Top-right
          { x: 20, y: img.height - watermark.height - 20 }, // Bottom-left
          {
            x: img.width - watermark.width - 20,
            y: img.height - watermark.height - 20,
          }, // Bottom-right
          // Middle edges
          { x: (img.width - watermark.width) / 2, y: 20 }, // Top-center
          {
            x: (img.width - watermark.width) / 2,
            y: img.height - watermark.height - 20,
          }, // Bottom-center
          { x: 20, y: (img.height - watermark.height) / 2 }, // Left-center
          {
            x: img.width - watermark.width - 20,
            y: (img.height - watermark.height) / 2,
          }, // Right-center
          // Diagonal positions
          {
            x: img.width * 0.25 - watermark.width / 2,
            y: img.height * 0.25 - watermark.height / 2,
          },
          {
            x: img.width * 0.75 - watermark.width / 2,
            y: img.height * 0.25 - watermark.height / 2,
          },
          {
            x: img.width * 0.25 - watermark.width / 2,
            y: img.height * 0.75 - watermark.height / 2,
          },
          {
            x: img.width * 0.75 - watermark.width / 2,
            y: img.height * 0.75 - watermark.height / 2,
          },
        ];

        // Draw watermarks at all positions
        positions.forEach((pos) => {
          ctx.drawImage(watermark, pos.x, pos.y);
        });

        // Reset global alpha
        ctx.globalAlpha = 1.0;

        // Optional: Add a more prominent center watermark
        ctx.globalAlpha = 0.5;
        const centerX = (img.width - watermark.width) / 2;
        const centerY = (img.height - watermark.height) / 2;
        ctx.drawImage(watermark, centerX, centerY);
        ctx.globalAlpha = 1.0;

        callback(canvas.toDataURL("image/jpeg"));
      };

      watermark.onerror = () => {
        console.error("Error loading watermark image");
        callback(imageUrl); // Fallback to original if watermark fails
      };
    };

    img.onerror = () => {
      console.error("Error loading image for watermarking");
      callback(imageUrl); // Fallback to original if image loading fails
    };
  }, []);

  const handleDownload = useCallback(
    (imageUrl) => {
      setIsDownloading(true);
      addWatermark(imageUrl, (watermarkedImage) => {
        const link = document.createElement("a");
        link.href = watermarkedImage;
        link.download = `quickfit-container-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsDownloading(false);
      });
    },
    [addWatermark]
  );

  // Track loaded images for better UX
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery-app">
      {/* Hidden canvas for watermark processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <header className="gallery-header">
        <div className="header-content">
          <h1>Gallery</h1>
          <p className="subtitle">
            Explore our manufacturing process, quality standards, and finished
            products
          </p>
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
                aria-label="Search images"
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="filter-tags">
              {getUniqueTags().map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter ${
                    activeFilter === tag ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                  {tag !== "all" && (
                    <span className="tag-count">
                      {
                        galleryImages.filter((img) => img.tags.includes(tag))
                          .length
                      }
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="gallery-content">
        {isLoading ? (
          <div className="loading-grid">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="image-skeleton">
                <div className="skeleton-animation"></div>
              </div>
            ))}
          </div>
        ) : filteredImages().length > 0 ? (
          <>
            <div className="results-count">
              Showing {filteredImages().length} of {galleryImages.length} images
              {activeFilter !== "all" && ` (filtered by "${activeFilter}")`}
              {searchTerm && ` (searched for "${searchTerm}")`}
            </div>
            <div className="image-grid">
              {filteredImages().map((image, index) => (
                <div
                  key={image.id}
                  className={`image-card ${
                    loadedImages[image.id] ? "loaded" : ""
                  }`}
                  onClick={() => openImage(index)}
                  aria-label={`View image: ${image.alt}`}
                >
                  <div className="image-wrapper">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onLoad={() => handleImageLoad(image.id)}
                      onError={(e) => {
                        e.target.src = "/placeholder.jpg";
                        handleImageLoad(image.id);
                      }}
                    />
                    <div className="image-hover">
                      <FiZoomIn className="zoom-icon" />
                      <div className="image-tags">
                        {image.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="image-caption">{image.alt}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <h3>No images found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          className={`image-modal-overlay ${isFullscreen ? "fullscreen" : ""}`}
          onClick={closeImage}
        >
          <div
            className="image-modal"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <button
              className="close-modal"
              onClick={closeImage}
              aria-label="Close image"
            >
              <FiX />
            </button>

            <div className="modal-image-container">
              <img
                key={currentIndex}
                src={selectedImage.src}
                alt={selectedImage.alt}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <button
                className="nav-button prev"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("prev");
                }}
                aria-label="Previous image"
              >
                <FiChevronLeft />
              </button>
              <button
                className="nav-button next"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("next");
                }}
                aria-label="Next image"
              >
                <FiChevronRight />
              </button>
              <button
                className="download-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(selectedImage.src);
                }}
                disabled={isDownloading}
              >
                <FiDownload /> {isDownloading ? "Processing..." : "Download"}
              </button>
              <button
                className="fullscreen-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>

            <div className="image-info">
              <div className="info-header">
                <h3>{selectedImage.alt}</h3>
                <div className="image-counter">
                  Image {currentIndex + 1} of {filteredImages().length}
                </div>
              </div>

              <div className="modal-tags">
                {selectedImage.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
          position: relative;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header-content {
          margin-bottom: 2rem;
        }

        .gallery-header h1 {
          font-size: 2.75rem;
          font-weight: 800;
          color: #212529;
          margin-bottom: 0.75rem;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: var(--gray);
          font-size: 1.15rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .search-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .search-bar {
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: center;
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
          flex: 1;
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

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--light-gray);
          color: var(--dark);
          border: none;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .filter-toggle:hover {
          background: #e2e6ea;
        }

        .filter-toggle.active {
          background: var(--primary);
          color: var(--white);
        }

        .filter-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.8);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-sm);
        }

        .tag-filter {
          position: relative;
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          background: var(--light-gray);
          color: var(--dark);
          border: none;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tag-filter:hover {
          background: #e2e6ea;
        }

        .tag-filter.active {
          background: var(--primary);
          color: var(--white);
        }

        .tag-count {
          font-size: 0.7rem;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 0.1rem 0.4rem;
        }

        .tag-filter.active .tag-count {
          background: rgba(255, 255, 255, 0.2);
        }

        .gallery-content {
          position: relative;
          min-height: 60vh;
        }

        .results-count {
          text-align: center;
          margin: 1rem 0;
          color: var(--gray);
          font-size: 0.95rem;
        }

        .loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .image-skeleton {
          aspect-ratio: 4 / 3;
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
          margin-top: 1rem;
        }

        .image-card {
          position: relative;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          aspect-ratio: 4 / 3;
          cursor: pointer;
          background: var(--white);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s ease forwards;
        }

        .image-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          transition: transform 0.3s ease;
        }

        .image-card:hover .image-wrapper img {
          transform: scale(1.05);
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

        .image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 0.85rem;
          transform: translateY(100%);
          transition: var(--transition);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .image-card:hover .image-caption {
          transform: translateY(0);
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
          background: linear-gradient(
            135deg,
            var(--primary),
            var(--primary-light)
          );
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

        .image-modal-overlay.fullscreen {
          padding: 0;
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

        .image-modal-overlay.fullscreen .image-modal {
          max-width: 100vw;
          max-height: 100vh;
          border-radius: 0;
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

        .image-modal-overlay.fullscreen .modal-image-container {
          height: calc(100vh - 200px);
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

        .download-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .download-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .download-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .fullscreen-button {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .fullscreen-button:hover {
          background: rgba(0, 0, 0, 0.9);
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
          flex: 1;
          min-width: 200px;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .image-counter {
          color: var(--gray);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
        }

        .watermark-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.1;
          background-repeat: repeat;
        }

        .watermark-overlay img {
          width: 300px;
          height: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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

          .search-bar {
            flex-direction: column;
          }

          .filter-toggle {
            width: 100%;
            justify-content: center;
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

          .download-button,
          .fullscreen-button {
            padding: 8px 12px;
            font-size: 0.8rem;
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
      `}</style>
    </div>
  );
};

export default Gallery;
