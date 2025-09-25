"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/20 py-4' 
          : 'bg-black/60 backdrop-blur-sm border-b border-white/10 py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo/Artist Name */}
        <Link href="/" className="group relative z-10">
          <div className="flex items-center">
            {/* Artistic Logo Icon */}
            <div className="relative mr-3">
              <div className="w-8 h-8 border border-white/30 rounded-sm transform rotate-45 transition-transform duration-300 group-hover:rotate-90">
                <div className="absolute inset-1 bg-white/10 rounded-sm" />
              </div>
            </div>
            
            <span
              className={`font-light tracking-wider transition-all duration-300 ${
                scrolled ? 'text-xl' : 'text-2xl'
              } md:text-2xl lg:text-3xl text-white group-hover:text-gray-200`}
              style={{ fontFamily: "var(--font-aston, serif)" }}
            >
              Helen Anderson
            </span>
          </div>
          
          {/* Underline effect */}
          <div className="absolute bottom-0 left-0 w-0 h-px bg-white/50 transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-base lg:text-lg">
          {links.map((link, index) => {
            const active = pathname === link.href;
            return (
              <div key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 px-1 font-light tracking-wide transition-all duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-white transition-all duration-300" />
                  )}
                  
                  {/* Hover effect */}
                  {!active && (
                    <div className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 transition-all duration-300 hover:w-full" />
                  )}
                </Link>
                
                {/* Subtle number indicators */}
                <span className="absolute -top-2 -right-2 text-xs text-white/30 font-mono">
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center group"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-4 flex flex-col justify-between">
            <span 
              className={`block h-px w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'rotate-0 translate-y-0'
              }`}
            />
            <span 
              className={`block h-px w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`block h-px w-full bg-white transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'rotate-0 translate-y-0'
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ zIndex: -1 }}
        />

        {/* Mobile Navigation */}
        <nav 
          className={`md:hidden fixed top-0 right-0 w-64 h-screen bg-black/90 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 40 }}
        >
          {/* Mobile Menu Close Button */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex flex-col justify-center items-center group"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-4 flex flex-col justify-center">
                <span className="block h-px w-full bg-white transform rotate-45 transition-all duration-300 group-hover:bg-gray-300" />
                <span className="block h-px w-full bg-white transform -rotate-45 -translate-y-px transition-all duration-300 group-hover:bg-gray-300" />
              </div>
            </button>
          </div>

          <div className="flex flex-col pt-24 px-8 space-y-8">
            {/* Mobile Menu Header */}
            <div className="mb-8">
              <div className="w-12 h-px bg-white/30 mb-4" />
              <p className="text-sm text-white/50 font-light tracking-widest uppercase">
                Navigation
              </p>
            </div>

            {/* Mobile Links */}
            {links.map((link, index) => {
              const active = pathname === link.href;
              return (
                <div 
                  key={link.href} 
                  className={`transform transition-all duration-500 ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <Link
                    href={link.href}
                    className={`block text-2xl font-light tracking-wide transition-all duration-300 ${
                      active
                        ? "text-white"
                        : "text-white/60 hover:text-white hover:translate-x-2"
                    }`}
                  >
                    <div className="flex items-center justify-between group">
                      <span>{link.label}</span>
                      <span className="text-xs text-white/30 font-mono group-hover:text-white/50 transition-colors duration-300">
                        0{index + 1}
                      </span>
                    </div>
                    
                    {/* Active/Hover line */}
                    <div 
                      className={`mt-2 h-px transition-all duration-300 ${
                        active 
                          ? 'w-full bg-white' 
                          : 'w-0 bg-white/50 group-hover:w-1/3'
                      }`}
                    />
                  </Link>
                </div>
              );
            })}

            {/* Mobile Menu Footer */}
            <div 
              className={`pt-12 transform transition-all duration-500 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="w-12 h-px bg-white/30 mb-4" />
              <p className="text-xs text-white/40 font-light">
                Artist Portfolio
              </p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}