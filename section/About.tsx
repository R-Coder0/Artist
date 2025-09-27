import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

// interface Stat {
//   number: string;
//   label: string;
// }

const About: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-12 bg-black text-white overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 15 - 7.5}px, ${mousePosition.y * 15 - 7.5}px)`
          }}
        />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-40 left-20 w-32 h-px bg-white/10"
          style={{
            transform: `translateX(${mousePosition.x * 25 - 12.5}px) rotate(${mousePosition.x * 3 - 1.5}deg)`
          }}
        />
        <div
          className="absolute bottom-60 right-32 w-24 h-px bg-white/10"
          style={{
            transform: `translateX(${mousePosition.x * -20 + 10}px) rotate(${mousePosition.x * -2 + 1}deg)`
          }}
        />
        <div
          className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * 10 - 5}px)`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-block mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 font-light tracking-wider uppercase">
              About the Artist
            </span>
          </div>

          <h2
            className={`text-5xl md:text-6xl font-light mb-8 text-white tracking-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            The Journey Behind the Art
          </h2>

          <div
            className={`flex justify-center transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-24 h-px bg-white/30" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Artist Image */}
          <div
            className={`relative flex-shrink-0 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Image container with artistic border */}
              <div
                ref={imageRef}
                className="relative w-80 h-96 overflow-hidden bg-gray-800"
                style={{
                  transform: `rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * 3}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Artist photo */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                  style={{
                    backgroundImage: 'url("/artist.png")',
                    filter: 'grayscale(30%) contrast(1.1)',
                    transform: `scale(${1 + mousePosition.x * 0.05})`
                  }}
                />

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Artistic frame effect */}
                <div className="absolute inset-0 border-2 border-white/20" />
                <div className="absolute -inset-2 border border-white/10" />
              </div>

              {/* Floating shadow */}
              <div
                className="absolute inset-0 bg-black/40 blur-xl -z-10"
                style={{
                  transform: 'translateY(20px) scale(0.9)',
                  opacity: 0.6
                }}
              />

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border border-white/30 rotate-45" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 border border-white/20 rotate-45" />
            </div>
          </div>

          {/* Artist Bio */}
          <div className="flex-1 space-y-8">
            <div
              className={`transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <h3 className="text-3xl font-light mb-6 text-white">
                Hello, I&apos;m Helen Anderson
              </h3>

              <div className="w-16 h-px bg-white/40 mb-8" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p
                className={`text-gray-300 font-light transition-all duration-1000 delay-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
               I am a passionate artist whose hand-painted works celebrate color, texture, and emotion. Each piece she creates tells a story, inviting viewers to connect with art on a deeply personal level. Her work reflects a balance of creativity and craftsmanship, turning ordinary spaces into inspiring environments.

              </p>

              <p
                className={`text-gray-400 font-light transition-all duration-1000 delay-1200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Helen’s portfolio spans a variety of styles including landscapes, abstracts, and portraits, each created with meticulous attention to detail. Her use of color and brush techniques results in paintings that feel alive – whether it’s a calming scenery or a bold, expressive composition. She believes art should not just be seen but experienced, and her goal is to evoke emotion in every viewer.

              </p>

              <p
                className={`text-gray-300 font-light transition-all duration-1000 delay-1400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
               This website has been thoughtfully designed to showcase Helen’s unique style in a simple, elegant, and mobile-friendly way. Visitors can explore a carefully curated gallery featuring her latest and past works, view artwork details such as size and medium, and even request a custom 
              </p>
            </div>

            {/* Stats/Achievements */}
            {/* <div
              className={`grid grid-cols-3 gap-8 pt-12 transition-all duration-1000 delay-1600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                { number: '8+', label: 'Years Experience' },
                { number: '200+', label: 'Artworks Created' },
                { number: '15+', label: 'Exhibitions' }
              ].map((stat: Stat, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-light text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-light tracking-wide">
                    {stat.label}
                  </div>
                  <div className="w-8 h-px bg-white/20 mx-auto mt-2" />
                </div>
              ))}
            </div> */}

            {/* CTA */}
            <div
              className={`pt-8 transition-all duration-1000 delay-1800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link href='/about' className="group relative px-8 py-3 bg-transparent border border-white/30 text-white font-light text-sm tracking-wider uppercase transition-all duration-500 hover:bg-white hover:text-black">
                <span className="relative z-10">Know More</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div
          className={`text-center mt-6 transition-all duration-1000 delay-2000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl text-white/10 font-serif mb-2">&ldquo;</div>
            <blockquote className="text-xl md:text-2xl font-light text-gray-300 italic leading-relaxed">
              Art is not what you see, but what you make others see. Every stroke, every line,
              every shadow carries the weight of emotion and the lightness of dreams.
            </blockquote>
            <div className="w-16 h-px bg-white/30 mx-auto mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
