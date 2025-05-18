import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShare2, FiClock } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import blogData from "../../blogData.json";
import "./style.css";

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
    </div>
  );
};

export default SingleBlog;
