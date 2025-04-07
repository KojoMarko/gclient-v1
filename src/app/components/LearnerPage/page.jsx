import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import OurSolutions from "./OurSolutions";
import Register from "./Register";
import WhatNext from "./WhatNext";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <OurSolutions />
      <WhatNext />
      <Register />
      <Footer />
    </div>
  );
}