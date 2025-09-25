"use client";
import React, { useRef } from "react";
import AdvancedHero from "@/section/Hero";
import AdvancedShowcase from "@/section/Showcase";
import About from "@/section/About";
import Contact from "@/section/contact";

export default function Page() {
  const showcaseRef = useRef<HTMLElement>(null);

  // Function to scroll to the showcase section
  const handleExploreGalleryClick = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <main>
        {/* Pass onExploreClick to AdvancedHero */}
        <AdvancedHero onExploreClick={handleExploreGalleryClick} />
        
        {/* AdvancedShowcase section, scrolls to this section when button is clicked */}
        <AdvancedShowcase ref={showcaseRef} />
        <About/>
        <Contact/>
        
      </main>
    </>
  );
}