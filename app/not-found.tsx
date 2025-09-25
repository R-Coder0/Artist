"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [glitchEffect, setGlitchEffect] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

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

    // Page visibility animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Glitch effect trigger
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchEffect(true);
            setTimeout(() => setGlitchEffect(false), 150);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const redirectToHome = () => {
        setGlitchEffect(true);
        setTimeout(() => {
            router.push("/");
        }, 600);
    };

    return (
        <div className="mt-24 relative min-h-screen bg-black text-white overflow-hidden">
            <div ref={containerRef} className="relative min-h-screen">
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
                            transform: `translate(${mousePosition.x * 8 - 4}px, ${mousePosition.y * 8 - 4}px)`
                        }}
                    />
                </div>

                {/* Floating geometric elements */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-32 left-20 w-24 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * 15 - 7.5}px) rotate(${mousePosition.x * 3 - 1.5}deg)`
                        }}
                    />
                    <div
                        className="absolute bottom-40 right-32 w-20 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * -12 + 6}px) rotate(${mousePosition.x * -2 + 1}deg)`
                        }}
                    />
                    <div
                        className="absolute top-1/3 right-24 w-px h-16 bg-white/10"
                        style={{
                            transform: `translateY(${mousePosition.y * 12 - 6}px)`
                        }}
                    />
                    <div
                        className="absolute bottom-1/3 left-32 w-16 h-16 border border-white/8 transform rotate-45"
                        style={{
                            transform: `rotate(${45 + mousePosition.x * 5}deg) scale(${1 + mousePosition.y * 0.1})`
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8">
                    
                    {/* 404 Section */}
                    <div className={`text-center mb-4 transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}>
                        
                        {/* Large 404 Text */}
                        <div className="relative mb-8">
                            <h1 
                                className={`text-8xl md:text-9xl lg:text-[12rem] font-thin tracking-[0.2em] mb-4 transition-all duration-300 ${
                                    glitchEffect ? 'transform skew-x-1 text-red-400' : 'text-white'
                                }`}
                                style={{
                                    textShadow: glitchEffect 
                                        ? '2px 0 #ff3333, -2px 0 #33ff33' 
                                        : '0 0 40px rgba(255,255,255,0.2)'
                                }}
                            >
                                404
                            </h1>
                            
                            {/* Glitch overlay lines */}
                            {glitchEffect && (
                                <>
                                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-red-400/80 animate-pulse" />
                                    <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-green-400/60 animate-pulse" />
                                </>
                            )}
                        </div>

                        {/* Page Not Found Badge */}
                        <div className={`inline-block mb-8 transition-all duration-500 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <span className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 font-light tracking-[0.3em] uppercase">
                                Page Not Found
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2 className={`text-3xl md:text-4xl font-light mb-6 text-white tracking-wide transition-all duration-500 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            Lost in the Digital Void
                        </h2>

                        {/* Description */}
                        <div className={`max-w-2xl mx-auto mb-8 transition-all duration-500 delay-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                            <p className="text-lg text-gray-400 font-light leading-relaxed mb-4">
                                The page you&lsquo;re looking for has drifted into the artistic ether, 
                                lost among unfinished canvases and digital dreams.
                            </p>
                            
                            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-sm">
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                                <span className="text-orange-300 font-light text-sm tracking-wide">
                                    Other pages are under construction
                                </span>
                            </div>
                        </div>

                        {/* Decorative line */}
                        <div className={`flex justify-center mb-4 transition-all duration-500 delay-500 ${
                            isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                        }`}>
                            <div className="w-24 h-px bg-white/30" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`space-y-6 transition-all duration-500 delay-600 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        
                        {/* Primary CTA */}
                        <button
                            onClick={redirectToHome}
                            className={`cursor-pointer group relative px-12 py-4 bg-transparent border border-white/30 text-white font-light text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-white hover:text-black overflow-hidden ${
                                glitchEffect ? 'animate-pulse border-red-400' : ''
                            }`}
                        >
                            <span className="relative z-10">Return to Home</span>
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </button>

                        {/* Secondary Actions */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button 
                                onClick={() => window.history.back()}
                                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 font-light text-sm tracking-wide"
                            >
                                <span className="w-4 h-px bg-gray-400 group-hover:bg-white group-hover:w-6 transition-all duration-300 mr-3" />
                                Go Back
                            </button>
                            
                            <div className="w-px h-4 bg-white/20 hidden sm:block" />
                            
                            <button 
                                onClick={() => window.location.reload()}
                                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 font-light text-sm tracking-wide"
                            >
                                <span className="w-4 h-px bg-gray-400 group-hover:bg-white group-hover:w-6 transition-all duration-300 mr-3" />
                                Refresh Page
                            </button>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className={`mt-16 transition-all duration-500 delay-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <div className="flex flex-col items-center space-y-4">
                            {/* System Status */}
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                                    glitchEffect ? 'bg-red-400' : 'bg-green-400'
                                }`} />
                                <span className="text-xs text-gray-400 font-light tracking-[0.3em] uppercase">
                                    {glitchEffect ? 'System Anomaly Detected' : 'Portfolio System Online'}
                                </span>
                            </div>

                            {/* Error Code */}
                            <div className="text-center">
                                <div className="text-xs text-gray-500 font-light tracking-[0.2em] uppercase mb-1">
                                    Error Reference
                                </div>
                                <div className="text-sm text-white/70 font-light font-mono">
                                    404.ART.NOT.FOUND
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corner Branding */}
                <div className="absolute bottom-8 left-8 text-left">
                    <div className="text-xs text-gray-500 font-light tracking-[0.2em] uppercase mb-1">
                        Helen Anderson
                    </div>
                    <div className="text-sm text-white/70 font-light">
                        Digital Art Portfolio
                    </div>
                </div>

                {/* Corner Info */}
                <div className="absolute top-8 right-8 text-right">
                    <div className="text-xs text-gray-500 font-light tracking-[0.2em] uppercase mb-1">
                        Page Status
                    </div>
                    <div className="text-sm text-white/70 font-light">
                        Under Development
                    </div>
                </div>

                {/* Glitch Overlay */}
                {glitchEffect && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-black/20" />
                        <div 
                            className="absolute inset-0 opacity-30"
                            style={{
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,100,100,0.1) 2px, rgba(255,100,100,0.1) 4px)',
                                animation: 'scanlines 0.1s linear infinite'
                            }}
                        />
                    </div>
                )}
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes scanlines {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); }
                }
            `}</style>
        </div>
    );
};

export default NotFound;