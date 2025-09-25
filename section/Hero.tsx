"use client";
import { useState, useEffect } from 'react';
// Define prop type for passing onExploreClick function
interface AdvancedHeroProps {
  onExploreClick: () => void;
}

const AdvancedHero: React.FC<AdvancedHeroProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    "/hero.webp",
    "/hero2.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange();
    }, 6000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleImageChange = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleDotClick = (index: React.SetStateAction<number>) => {
    if (index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsTransitioning(false); 
      }, 500);
    }
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Images with Advanced Animation */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100 blur-0' 
                : 'opacity-0 scale-110 blur-sm'
            }`}
            style={{
              background: `url(${image}) center/cover no-repeat`,
              transform: `scale(${index === currentIndex ? 1 : 1.1}) ${
                isTransitioning ? 'translateX(30px)' : 'translateX(0)'
              }`,
              filter: `blur(${index === currentIndex ? 0 : 2}px) brightness(${
                index === currentIndex ? 1 : 0.7
              })`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(
            ${currentIndex === 0 ? '135deg' : '45deg'}, 
            rgba(0,0,0,0.7) 0%, 
            rgba(0,0,0,0.4) 50%, 
            rgba(0,0,0,0.8) 100%
          )`
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content with Advanced Animations */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <div className="overflow-hidden mb-6">
            <h1 
              className={`text-6xl md:text-7xl font-bold text-white transition-all duration-1000 transform ${
                isTransitioning 
                  ? 'translate-y-full opacity-0 blur-sm' 
                  : 'translate-y-0 opacity-100 blur-0'
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 20px rgba(255,255,255,0.1)',
              }}
            >
              Dimensional Art
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p 
              className={`text-xl md:text-2xl text-white/90 leading-relaxed transition-all duration-1000 delay-200 transform ${
                isTransitioning 
                  ? 'translate-y-full opacity-0 blur-sm' 
                  : 'translate-y-0 opacity-100 blur-0'
              }`}
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              Hand-drawn lines. Digital depth. A portfolio of illustrations, concept art, and playful 3D experiments.
            </p>
          </div>

          {/* Animated CTA Button */}
          <div className="mt-10">
{/* Explore Gallery Button */}
          <button
            onClick={onExploreClick} // Trigger scrolling to the showcase section
            className="cursor-pointer mt-10 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/20 hover:scale-105"
          >
            Explore Gallery
          </button>
          </div>
        </div>
      </div>

      {/* Vertical Dot Navigation */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative w-4 h-4 focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Outer Ring */}
            <div 
              className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                index === currentIndex 
                  ? 'border-white shadow-lg shadow-white/50' 
                  : 'border-white/40 group-hover:border-white/70'
              }`}
              style={{
                transform: `scale(${index === currentIndex ? 1.2 : 1})`,
              }}
            />
            
            {/* Inner Dot */}
            <div 
              className={`absolute inset-1 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/30 group-hover:bg-white/50'
              }`}
              style={{
                transform: `scale(${index === currentIndex ? 1 : 0.7})`,
              }}
            />
            
            {/* Active Indicator Glow */}
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Progress Line */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-0.5 h-20 bg-white/20">
        <div 
          className="w-full bg-white transition-all duration-6000 ease-linear"
          style={{
            height: `${((currentIndex + 1) / images.length) * 100}%`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="w-20 h-20 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      <div className="absolute top-10 right-20 opacity-20">
        <div className="w-16 h-16 border border-white/20 rounded-full animate-pulse" />
      </div>

      {/* Glass Effect Downward Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button 
          className={`group relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-500 hover:bg-white/20 hover:scale-110 hover:shadow-2xl transform ${
            isTransitioning 
              ? 'translate-y-full opacity-0' 
              : 'translate-y-0 opacity-100'
          } animate-bounce`}
          style={{ transitionDelay: '600ms' }}
          aria-label="Scroll down"
        >
          {/* Arrow Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
          
          {/* Glass Effect Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border border-white/30 scale-100 group-hover:scale-125 transition-transform duration-500" />
        </button>
        
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default AdvancedHero;