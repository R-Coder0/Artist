"use client";
import React, { useState, useRef, useEffect } from "react";

const Footer: React.FC = () => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(false);
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

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        { name: 'Instagram', href: 'https://instagram.com' },
        { name: 'Twitter', href: 'https://twitter.com' },
        { name: 'LinkedIn', href: 'https://linkedin.com' },
        { name: 'Behance', href: 'https://behance.net' }
    ];

    const services = [
        'Portrait Commissions',
        'Digital Illustrations',
        'Traditional Artwork',
        'Mixed Media Projects'
    ];

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            <div ref={containerRef}>
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-3">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                            transform: `translate(${mousePosition.x * 8 - 4}px, ${mousePosition.y * 8 - 4}px)`
                        }}
                    />
                </div>

                {/* Floating geometric elements */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-20 left-32 w-20 h-px bg-white/8"
                        style={{
                            transform: `translateX(${mousePosition.x * 15 - 7.5}px) rotate(${mousePosition.x * 2 - 1}deg)`
                        }}
                    />
                    <div
                        className="absolute bottom-32 right-40 w-16 h-px bg-white/8"
                        style={{
                            transform: `translateX(${mousePosition.x * -12 + 6}px) rotate(${mousePosition.x * -1.5 + 0.75}deg)`
                        }}
                    />
                    <div
                        className="absolute top-1/3 right-20 w-px h-12 bg-white/8"
                        style={{
                            transform: `translateY(${mousePosition.y * 10 - 5}px)`
                        }}
                    />
                </div>

                {/* Main Footer Content */}
                <div className="relative z-10 pt-20 pb-8">
                    <div className="container mx-auto px-8">
                        {/* Top Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            {/* Brand Section */}
                            <div 
                                className={`lg:col-span-2 transition-all duration-500 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                {/* Logo/Brand */}
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-8 border border-white/30 transform rotate-45 mr-4" />
                                    <h3 className="text-2xl font-light tracking-wide" style={{ fontFamily: 'serif' }}>
                                        Helen Anderson
                                    </h3>
                                </div>
                                
                                <p className="text-gray-400 font-light text-lg leading-relaxed mb-6 max-w-md">
                                    Creating unique works of art through the blend of traditional media and digital techniques. 
                                    Each piece tells a story that reflects the deep connection with the world around us.
                                </p>

                                {/* Newsletter Signup */}
                                <div className="max-w-md">
                                    <p className="text-sm text-gray-300 font-light tracking-wider uppercase mb-4">
                                        Stay Updated
                                    </p>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="flex-1 bg-transparent border-b border-white/20 py-3 text-white font-light focus:outline-none focus:border-white/50 transition-colors duration-300"
                                        />
                                        <button className="ml-4 px-6 py-3 bg-transparent border border-white/30 text-white font-light text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div 
                                className={`transition-all duration-500 delay-100 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                <h4 className="text-lg font-light text-white mb-6 tracking-wide">Navigation</h4>
                                <ul className="space-y-3">
                                    {quickLinks.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 font-light"
                                            >
                                                <span className="w-3 h-px bg-gray-400 group-hover:bg-white group-hover:w-5 transition-all duration-300 mr-3" />
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services */}
                            <div 
                                className={`transition-all duration-500 delay-200 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                <h4 className="text-lg font-light text-white mb-6 tracking-wide">Services</h4>
                                <ul className="space-y-3">
                                    {services.map((service, index) => (
                                        <li key={index} className="text-gray-400 font-light hover:text-white transition-colors duration-300 cursor-pointer">
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Divider */}
                        <div 
                            className={`h-px bg-white/10 mb-12 transition-all duration-500 delay-300 ${
                                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                            }`}
                            style={{ transformOrigin: 'center' }}
                        />

                        {/* Bottom Section */}
                        <div 
                            className={`flex flex-col md:flex-row justify-between items-center transition-all duration-500 delay-400 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            {/* Social Links */}
                            <div className="flex items-center space-x-8 mb-6 md:mb-0">
                                <p className="text-sm text-gray-400 font-light tracking-wider uppercase mr-6">
                                    Follow
                                </p>
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>

                            {/* Copyright & Contact */}
                            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-center md:text-right">
                                <a 
                                    href="mailto:info@helenanderson.com"
                                    className="text-gray-400 hover:text-white transition-colors duration-300 font-light text-sm"
                                >
                                    info@helenanderson.com
                                </a>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    <span className="text-gray-400 font-light text-sm">Available for projects</span>
                                </div>
                            </div>
                        </div>

                        {/* Final Copyright */}
                        <div 
                            className={`text-center mt-12 pt-8 border-t border-white/5 transition-all duration-500 delay-500 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        >
                            <p className="text-gray-500 font-light text-sm tracking-wider">
                                © 2024 Helen Anderson. All rights reserved. | Crafted with passion for art and design.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Subtle bottom accent line */}
                <div 
                    className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 delay-600 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </div>
        </footer>
    );
};

export default Footer;