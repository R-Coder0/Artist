"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect, forwardRef } from "react";

// Define the type for the artwork data
interface Artwork {
    title: string;
    imageUrl: string;
    medium: string;
    year: string;
}

const AdvancedShowcase = forwardRef<HTMLElement>((props, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Enhanced artwork data for drawing artist
    const works: Artwork[] = [
        {
            title: "Portrait Study",
            imageUrl: "/hero2.png",
            medium: "Graphite",
            year: "2024"
        },
        {
            title: "Abstract Lines",
            imageUrl: "/shwocase.png",
            medium: "Charcoal",
            year: "2024"
        },
        {
            title: "Nature Sketch",
            imageUrl: "/hero.webp",
            medium: "Ink",
            year: "2023"
        },
        {
            title: "Urban Forms",
            imageUrl: "/hero2.png",
            medium: "Pencil",
            year: "2023"
        },
        {
            title: "Figure Drawing",
            imageUrl: "/shwocase.png",
            medium: "Charcoal",
            year: "2024"
        },
        {
            title: "Still Life",
            imageUrl: "/hero.webp",
            medium: "Graphite",
            year: "2024"
        }
    ];

    // Track mouse movement for subtle effects
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
            ref={ref}
            className="relative py-20 bg-black text-white overflow-hidden"
        >
            <div ref={containerRef}>
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                            backgroundSize: '50px 50px',
                            transform: `translate(${mousePosition.x * 10 - 5}px, ${mousePosition.y * 10 - 5}px)`
                        }}
                    />
                </div>

                {/* Minimalist floating lines */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-32 left-20 w-24 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * 20 - 10}px) rotate(${mousePosition.x * 5 - 2.5}deg)`
                        }}
                    />
                    <div
                        className="absolute bottom-40 right-32 w-16 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * -15 + 7.5}px) rotate(${mousePosition.x * -3 + 1.5}deg)`
                        }}
                    />
                </div>

                {/* Header Section */}
                <div className="text-center mb-10 relative z-10">
                    <div 
                        className={`inline-block mb-6 transition-all duration-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <span className="px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 font-light tracking-wider uppercase">
                            Portfolio
                        </span>
                    </div>

                    <h2 
                        className={`text-5xl md:text-6xl font-light mb-6 text-white tracking-tight transition-all duration-400 delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Helen Anderson’s Art Portfolio
                    </h2>

                    <p 
                        className={`text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-400 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Explore the creative world of Helen Anderson, a passionate artist who brings stories to life through her hand-painted artworks. Her portfolio features a diverse collection of landscapes, abstracts, and portraits – each one carefully crafted to evoke emotion and connect with the viewer.
                    </p>

                    {/* Simple line accent */}
                    <div 
                        className={`flex justify-center mt-4 transition-all duration-400 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div className="w-16 h-px bg-white/30" />
                    </div>
                </div>

                {/* Clean Grid Layout */}
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {works.map((work, index) => (
                            <div
                                key={index}
                                className={`group relative cursor-pointer transition-all duration-500 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                                style={{ transitionDelay: `${400 + index * 100}ms` }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Main Card Container */}
                                <div className="relative">
                                    {/* Image Container with Paper Effect */}
                                    <div
                                        className="relative h-80 overflow-hidden bg-gray-100 transition-all duration-700 ease-out"
                                        style={{
                                            transform: hoveredIndex === index
                                                ? `translateY(-8px) rotateX(2deg) rotateY(${(mousePosition.x - 0.5) * 3}deg)`
                                                : 'translateY(0) rotateX(0) rotateY(0)',
                                            transformStyle: 'preserve-3d',
                                            boxShadow: hoveredIndex === index
                                                ? '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                                                : '0 8px 25px rgba(0, 0, 0, 0.6)',
                                        }}
                                    >
                                        {/* Artwork Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                                            style={{
                                                backgroundImage: `url(${work.imageUrl})`,
                                                transform: hoveredIndex === index
                                                    ? 'scale(1.05)'
                                                    : 'scale(1)',
                                                filter: 'grayscale(20%) contrast(1.1)'
                                            }}
                                        />

                                        {/* Subtle overlay */}
                                        <div
                                            className="absolute inset-0 transition-all duration-500"
                                            style={{
                                                background: hoveredIndex === index
                                                    ? 'rgba(0, 0, 0, 0.1)'
                                                    : 'rgba(0, 0, 0, 0.05)'
                                            }}
                                        />

                                        {/* Paper corner fold effect */}
                                        <div
                                            className={`absolute top-0 right-0 w-8 h-8 transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            style={{
                                                background: 'linear-gradient(-45deg, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.05) 55%)',
                                                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
                                            }}
                                        />
                                    </div>

                                    {/* Content Below Image */}
                                    <div className="pt-6 space-y-3">
                                        {/* Medium and Year */}
                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <span className="font-light tracking-wide">{work.medium}</span>
                                            <span className="font-light">{work.year}</span>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className={`text-xl font-light text-white transition-all duration-300 ${hoveredIndex === index ? 'text-gray-200' : 'text-white'
                                                }`}
                                        >
                                            {work.title}
                                        </h3>

                                        {/* Subtle line under title */}
                                        <div
                                            className="h-px bg-white transition-all duration-500"
                                            style={{
                                                width: hoveredIndex === index ? '100%' : '0%',
                                                opacity: hoveredIndex === index ? 0.2 : 0
                                            }}
                                        />

                                        {/* View option - appears on hover */}
                                        <div
                                            className={`transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                                }`}
                                        >
                                            <Link href="details" className="cursor-pointer text-sm text-gray-300 hover:text-white transition-colors duration-300 font-light tracking-wide">
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Section */}
                    <div 
                        className={`text-center mt-10 transition-all duration-500 delay-1000 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div className="inline-flex flex-col items-center space-y-4">
                            <Link href='/portfolio' className="cursor-pointer group relative px-8 py-3 bg-transparent border border-white/30 text-white font-light text-sm tracking-wider uppercase transition-all duration-500 hover:bg-white hover:text-black">
                                <span className="relative z-10">View Complete Portfolio</span>
                            </Link>

                            <div className="w-px h-8 bg-white/20" />

                            <p className="text-xs text-gray-500 font-light tracking-widest uppercase">
                                Available for Commissions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

// Display name set karo for better debugging
AdvancedShowcase.displayName = "AdvancedShowcase";

export default AdvancedShowcase;