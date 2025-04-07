// src/app/page.tsx
import Navbar from "./components/LearnerPage/Navbar";
import Hero from "./components/LearnerPage/Hero";
import OurSolutions from "./components/LearnerPage/OurSolutions";
import WhatNext from "./components/LearnerPage/WhatNext";
import Register from "./components/LearnerPage/Register";
import Footer from "./components/LearnerPage/Footer";

export default function Home() {
  return (
    <div className="w-full bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      <Navbar />
      <Hero />
      <OurSolutions id="our-solutions" />
      <WhatNext />
      <Register />
      <Footer />

    </div>
  );
}
