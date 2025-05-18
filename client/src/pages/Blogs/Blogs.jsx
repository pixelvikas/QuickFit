import React, { useState, useEffect } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  // Function to get image URLs
  const getImageUrl = (imageName) => {
    return new URL(`../../assets/${imageName}`, import.meta.url).href;
  };

  useEffect(() => {
    import("../../blogData.json")
      .then((dataModule) => {
        // Process the data to include full image URLs
        const processedData = dataModule.default.map((blog) => ({
          ...blog,
          // Extract just the filename from the path and get the full URL
          image: getImageUrl(blog.image.split("/").pop()),
        }));
        setBlogData(processedData);
      })
      .catch((error) => {
        console.error("Failed to load blog data:", error);
      });
  }, []);

  const filteredBlogs = blogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlogClick = (blogTitle) => {
    // Convert title to URL-friendly format
    const formattedTitle = blogTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
    navigate(`/blogs/${formattedTitle}`);
  };

  return (
    <div className="blog-page-wrapper">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-main-title">
            Insights. Innovations.{" "}
            <span className="blog-highlight">Industry Intelligence</span>
          </h1>
          <p className="blog-hero-description">
            Stay informed with the latest updates, expert opinions, and
            engineering breakthroughs from the world of offshore containers,
            modular systems, marine logistics, and industrial manufacturing.
          </p>

          <div className="blog-search-wrapper">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="blog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="blog-search-btn">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="blog-posts-section">
        <div className="blog-section-header">
          <h2 className="blog-section-title">
            <span className="blog-highlight">#</span> All Blog Posts
            {searchQuery && (
              <span className="blog-search-results">
                {" "}
                ({filteredBlogs.length} results)
              </span>
            )}
          </h2>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="blog-card"
                onClick={() => handleBlogClick(blog.title)}
              >
                <div className="blog-card-image-container">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-tag">{blog.tag}</span>
                    <span className="blog-card-date">{blog.date}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <div className="blog-card-link">
                    Read more <FiArrowRight className="arrow-icon" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-no-results">
            <p>No blog posts found matching your search.</p>
          </div>
        )}
      </section>
      <style>{`/* Blog Page Container */
.blog-page-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.blog-hero {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 80px 0;
  text-align: center;
  margin-bottom: 60px;
}

.blog-hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.blog-main-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #002244;
  margin-bottom: 20px;
}

.blog-highlight {
  color: #ff4500;
  position: relative;
}

.blog-highlight::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(242, 78, 30, 0.2);
  z-index: -1;
}

.blog-hero-description {
  font-size: 1.125rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* Search */
.blog-search-wrapper {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-search-input {
  flex: 1;
  padding: 15px 25px;
  border: none;
  font-size: 1rem;
  outline: none;
}

.blog-search-btn {
  background: #002244;
  color: white;
  border: none;
  padding: 0 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.blog-search-btn:hover {
  background: #f24e1e;
}

/* Blog Posts Section */
.blog-posts-section {
  padding: 0 20px 80px;
}

.blog-section-header {
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.blog-section-title {
  font-size: 1.75rem;
  color: #002244;
  font-weight: 600;
}

.blog-search-results {
  font-size: 1rem;
  color: #777;
  font-weight: normal;
  margin-left: 10px;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

/* Blog Card */
.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.blog-card-image-container {
  aspect-ratio: 16/9;
  overflow: hidden;
}

.blog-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .blog-card-image {
  transform: scale(1.05);
}

.blog-card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.85rem;
}

.blog-card-tag {
  background: rgba(242, 78, 30, 0.1);
  color: #f24e1e;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

.blog-card-date {
  color: #777;
}

.blog-card-title {
  font-size: 1.25rem;
  color: #002244;
  margin-bottom: 15px;
  line-height: 1.4;
}

.blog-card-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.blog-card-link {
  display: inline-flex;
  align-items: center;
  color: #f24e1e;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-card-link:hover {
  color: #002244;
}

.arrow-icon {
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.blog-card-link:hover .arrow-icon {
  transform: translateX(3px);
}

/* No Results */
.blog-no-results {
  text-align: center;
  padding: 60px 0;
  color: #777;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-hero {
    padding: 60px 0;
  }

  .blog-main-title {
    font-size: 2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>
    </div>
  );
};

export default Blog;
