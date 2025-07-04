import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShare2, FiClock } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import blogData from "../../blogData.json";

const SingleBlog = () => {
  const { blogName } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const getImageUrl = (imageName) => {
    try {
      return new URL(`../../assets/${imageName}`, import.meta.url).href;
    } catch (err) {
      console.error("Error loading image:", err);
      return "https://source.unsplash.com/random/1600x900/?tech,blog";
    }
  };

  useEffect(() => {
    const formattedBlogName = blogName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const foundBlog = blogData.find(
      (b) => b.title.toLowerCase() === formattedBlogName.toLowerCase()
    );

    if (foundBlog) {
      const processedBlog = {
        ...foundBlog,
        image: getImageUrl(foundBlog.image),
      };
      setBlog(processedBlog);
    } else {
      navigate("/blogs", { replace: true });
    }
  }, [blogName, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: `Check out this blog: ${blog.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Sharing failed:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="single-blog-container">
      <article className="blog-article">
        <header className="blog-header">
          <div className="blog-meta">
            <span className="blog-tag">{blog.tag}</span>
            <span className="blog-date">{formatDate(blog.date)}</span>
            <span className="reading-time">
              <FiClock size={14} /> {blog.readTime} min read
            </span>

            <div className="content-actions">
              <button
                className={`share-button ${isLinkCopied ? "copied" : ""}`}
                onClick={handleShare}
              >
                {isLinkCopied ? (
                  <>
                    <IoCheckmarkDone size={18} /> Copied!
                  </>
                ) : (
                  <>
                    <FiShare2 size={18} /> Share
                  </>
                )}
              </button>
            </div>
          </div>

          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-excerpt">{blog.excerpt}</p>

          <div className="blog-hero-image">
            <img src={blog.image} alt={blog.title} loading="lazy" />
          </div>
        </header>

        <section className="blog-content">
          <div className="article-body">
            <p className="blog-description">{blog.description}</p>

            {blog.pointers && blog.pointers.length > 0 && (
              <div className="key-points">
                <h3>Key Takeaways</h3>
                <ul>
                  {blog.pointers.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {blog.paragraphs &&
              blog.paragraphs.map((para, index) => (
                <p className="blog-paragraph" key={index}>
                  {para}
                </p>
              ))}
          </div>
        </section>
      </article>

      <style>{`
      :root {
  /* Color Palette */
  --primary: #2563eb;
  --primary-light: #3b82f6;
  --primary-dark: #1d4ed8;
  --primary-bg: #eff6ff;

  --secondary: #7c3aed;
  --secondary-light: #8b5cf6;

  --accent: #ec4899;
  --accent-light: #f472b6;

  --text: #1f2937;
  --text-light: #6b7280;
  --text-lighter: #9ca3af;

  --bg: #ffffff;
  --bg-light: #f9fafb;
  --bg-dark: #f3f4f6;

  --border: #e5e7eb;
  --border-dark: #d1d5db;

  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-md: 5px;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Transitions */
  --transition: all 0.2s ease;
  --transition-slow: all 0.4s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: var(--text);
  line-height: 1.6;
  background-color: var(--bg-light);
  -webkit-font-smoothing: antialiased;
}

/* Main Container */
.single-blog-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-xl);
  position: relative;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  font-size: 0.9rem;
  color: var(--text-light);
  justify-content: space-between;
  flex-wrap: wrap;
}

.blog-tag {
  background-color: var(--primary-bg);
  color: var(--primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.reading-time {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.85rem;
}

.blog-title {
  font-size: 2.5rem;
  margin: var(--space-md) 0 var(--space-xl);
  line-height: 1.2;
  color: var(--text);
  font-weight: 800;
}

.blog-excerpt {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: var(--space-xl);
  font-weight: 400;
  line-height: 1.7;
}

/* Hero Image */
.blog-hero-image {
  margin: var(--space-xl) 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow);
  position: relative;
  aspect-ratio: 16/9;
}

.blog-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.blog-hero-image:hover img {
  transform: scale(1.03);
}

/* Content Actions */
.content-actions {
  display: flex;
  justify-content: flex-end;
}

.share-button {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  border: none;
  background: var(--primary);
  color: white;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: var(--transition);
  box-shadow: 0 2px 5px rgba(37, 99, 235, 0.2);
}

.share-button:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
}

.share-button:active {
  transform: translateY(0);
}

.share-button.copied {
  background: var(--success);
  box-shadow: 0 2px 5px rgba(16, 185, 129, 0.2);
}

.article-body {
  max-width: 700px;
  margin: 0 auto;
}

.blog-description {
  font-size: 1.1rem;
  margin-bottom: var(--space-xl);
  color: var(--text);
  line-height: 1.8;
}

.key-points {
  background-color: var(--bg-light);
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  margin: var(--space-xl) 0;
  border-left: 4px solid var(--primary);
  box-shadow: var(--shadow-sm);
}

.key-points h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-md);
  color: var(--text);
}

.key-points ul {
  padding-left: var(--space-md);
}

.key-points li {
  margin-bottom: var(--space-sm);
  position: relative;
  color: var(--text);
  padding-left: var(--space-sm);
}

.key-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65em;
  width: 6px;
  height: 6px;
  background-color: var(--primary);
  border-radius: 50%;
}

.blog-paragraph {
  margin-bottom: var(--space-lg);
  color: var(--text);
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .single-blog-container {
    padding: var(--space-md);
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-excerpt {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .blog-title {
    font-size: 1.8rem;
  }

  .blog-meta {
    gap: var(--space-sm);
    font-size: 0.8rem;
  }

  .blog-tag {
    font-size: 0.7rem;
  }

  .share-button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
`}</style>
    </div>
  );
};

export default SingleBlog;
