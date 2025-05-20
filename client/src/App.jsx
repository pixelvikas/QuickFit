import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AutoScroll from "./components/AutoScroll";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import Blogs from "./pages/Blogs/Blogs";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

import SingleProduct from "./pages/SingleProduct/SingleProduct";
import SingleIndustry from "./pages/SingleIndustry/SingleIndustry";
import SingleBlog from "./pages/SingleBlog/SingleBlog";

const App = () => {
  return (
    <BrowserRouter>
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

      <Footer />
    </BrowserRouter>
  );
};

export default App;
