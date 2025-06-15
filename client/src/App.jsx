import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AutoScroll from "./components/AutoScroll";
import LoadingPage from "./components/LoadingPage";
import WhatsAppButton from "./components/WhatsappButton";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import Blogs from "./pages/Blogs/Blogs";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

import SingleProduct from "./pages/SingleProduct/SingleProduct";
import SingleIndustry from "./pages/SingleIndustry/SingleIndustry";
import SingleBlog from "./pages/SingleBlog/SingleBlog";

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start loading whenever location changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading, you can adjust this

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <AutoScroll />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/industries/:indName" element={<SingleIndustry />} />
        <Route path="/blogs/:blogName" element={<SingleBlog />} />
      </Routes>
      <WhatsAppButton phoneNumber="+91 9869908422" size={50} />

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
