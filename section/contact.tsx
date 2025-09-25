"use client";
import React, { useState, useRef, useEffect, forwardRef } from "react";

const Contact = forwardRef<HTMLElement>((props, ref) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

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
                        className="absolute top-32 left-20 w-32 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * 20 - 10}px) rotate(${mousePosition.x * 3 - 1.5}deg)`
                        }}
                    />
                    <div
                        className="absolute bottom-40 right-32 w-24 h-px bg-white/10"
                        style={{
                            transform: `translateX(${mousePosition.x * -15 + 7.5}px) rotate(${mousePosition.x * -2 + 1}deg)`
                        }}
                    />
                    <div
                        className="absolute top-1/2 right-20 w-16 h-px bg-white/10"
                        style={{
                            transform: `translateY(${mousePosition.y * 15 - 7.5}px) rotate(90deg)`
                        }}
                    />
                </div>

                {/* Header Section */}
                <div className="text-center mb-16 relative z-10">
                    <div 
                        className={`inline-block mb-6 transition-all duration-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <span className="px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 font-light tracking-wider uppercase">
                            Get in Touch
                        </span>
                    </div>

                    <h2 
                        className={`text-5xl md:text-6xl font-light mb-6 text-white tracking-tight transition-all duration-400 delay-100 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Let&apos;s Create Together
                    </h2>

                    <p 
                        className={`text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-400 delay-200 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        Interested in commissioning artwork or discussing a creative project?
                        I&lsquo;d love to hear about your vision and bring it to life.
                    </p>

                    {/* Simple line accent */}
                    <div 
                        className={`flex justify-center mt-6 transition-all duration-400 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <div className="w-16 h-px bg-white/30" />
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <form 
                                    onSubmit={handleSubmit}
                                    className={`space-y-8 transition-all duration-500 delay-400 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                >
                                    {/* Name Field */}
                                    <div className="group relative">
                                        <label 
                                            htmlFor="name" 
                                            className={`absolute left-0 text-sm font-light tracking-wide transition-all duration-300 ${
                                                focusedField === 'name' || formData.name ? 'text-white -translate-y-6' : 'text-gray-400 translate-y-4'
                                            }`}
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-0 border-b border-white/20 py-4 text-white font-light text-lg focus:outline-none focus:border-white/50 transition-all duration-300"
                                            required
                                        />
                                        <div 
                                            className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                                                focusedField === 'name' ? 'w-full opacity-100' : 'w-0 opacity-0'
                                            }`}
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="group relative">
                                        <label 
                                            htmlFor="email" 
                                            className={`absolute left-0 text-sm font-light tracking-wide transition-all duration-300 ${
                                                focusedField === 'email' || formData.email ? 'text-white -translate-y-6' : 'text-gray-400 translate-y-4'
                                            }`}
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full bg-transparent border-0 border-b border-white/20 py-4 text-white font-light text-lg focus:outline-none focus:border-white/50 transition-all duration-300"
                                            required
                                        />
                                        <div 
                                            className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                                                focusedField === 'email' ? 'w-full opacity-100' : 'w-0 opacity-0'
                                            }`}
                                        />
                                    </div>

                                    {/* Message Field */}
                                    <div className="group relative">
                                        <label 
                                            htmlFor="message" 
                                            className={`absolute left-0 text-sm font-light tracking-wide transition-all duration-300 ${
                                                focusedField === 'message' || formData.message ? 'text-white -translate-y-6' : 'text-gray-400 translate-y-4'
                                            }`}
                                        >
                                            Project Details
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            rows={4}
                                            className="w-full bg-transparent border-0 border-b border-white/20 py-4 text-white font-light text-lg focus:outline-none focus:border-white/50 transition-all duration-300 resize-none"
                                            required
                                        />
                                        <div 
                                            className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
                                                focusedField === 'message' ? 'w-full opacity-100' : 'w-0 opacity-0'
                                            }`}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-8">
                                        <button 
                                            type="submit" 
                                            className="group relative px-12 py-4 bg-transparent border border-white/30 text-white font-light text-sm tracking-wider uppercase transition-all duration-500 hover:bg-white hover:text-black overflow-hidden"
                                        >
                                            <span className="relative z-10">Send Message</span>
                                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div 
                                className={`space-y-12 transition-all duration-500 delay-600 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            >
                                {/* Direct Contact */}
                                <div>
                                    <h3 className="text-xl font-light text-white mb-2 tracking-wide">Direct Contact</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-400 font-light tracking-wider uppercase mb-1">Email</p>
                                            <a 
                                                href="mailto:artist@example.com"
                                                className="text-white hover:text-gray-300 transition-colors duration-300 font-light"
                                            >
                                                artist@example.com
                                            </a>
                                        </div>
                                       
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h3 className="text-xl font-light text-white mb-6 tracking-wide">Follow My Work</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Instagram', url: 'https://instagram.com' },
                                            { name: 'Twitter', url: 'https://twitter.com' },
                                            { name: 'LinkedIn', url: 'https://linkedin.com' }
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300"
                                            >
                                                <span className="w-4 h-px bg-gray-400 group-hover:bg-white group-hover:w-6 transition-all duration-300" />
                                                <span className="font-light tracking-wide">{social.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-green-400" />
                                        <span className="text-sm text-gray-300 font-light tracking-wider uppercase">Available for Projects</span>
                                    </div>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                                        Currently accepting commissions for portraits, illustrations, and custom artwork. 
                                        Let&lsquo;s discuss your creative vision.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Contact.displayName = "Contact";

export default Contact;