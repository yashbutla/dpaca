// src/components/public-nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, Shield, Landmark } from "lucide-react";

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Gallery", href: "/gallery" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full relative">
      {/* Top Credentials Utility bar */}
      <div className="bg-primary-blue text-white text-[11px] font-medium tracking-wider py-2 px-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 opacity-90">
            <Landmark className="w-3.5 h-3.5 text-accent-blue" />
            Registered NGO (Reg No. E-87 Ahilyanagar)
          </span>
          <span className="hidden md:inline-block w-[1px] h-3 bg-white/20"></span>
          <span className="hidden md:inline-flex items-center gap-1.5 opacity-90">
            <Shield className="w-3.5 h-3.5 text-accent-blue" />
            Collector of Ahilyanagar Ex-Officio Chairman
          </span>
        </div>
        <div></div>
      </div>

      {/* Main glassmorphic navbar */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand container */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/Dpaca-logo.png"
              alt="DPACA Logo"
              className="w-24 h-24 object-contain group-hover:scale-105 transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-primary-blue text-[15px] sm:text-base tracking-tight leading-tight group-hover:text-accent-blue transition-colors">
                DPACA AHILYANAGAR
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase leading-none mt-0.5">
                Estd 1942 | Observation Home
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading text-sm font-semibold tracking-wide transition-all duration-150 relative py-1 hover:text-accent-blue ${
                    isActive ? "text-primary-blue font-bold" : "text-slate-600"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/get-involved"
              className="bg-accent-blue text-white font-heading text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-sm hover:bg-blue-700 hover:-translate-y-[1px] active:translate-y-[0px] transition-all duration-150 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donate Now
            </Link>
          </div>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary-blue hover:text-accent-blue p-1 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-white z-40 border-t border-slate-100 flex flex-col p-6 animate-fade-up">
          <nav className="flex flex-col gap-6 mb-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-lg font-bold ${
                    isActive ? "text-primary-blue" : "text-primary-blue"
                  } hover:text-accent-blue transition-colors`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-4 mt-auto">
            <Link
              href="/get-involved"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-accent-blue text-white font-heading text-center text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donate Now
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="border border-slate-300 text-slate-600 font-heading text-center text-sm font-semibold py-3.5 rounded-xl"
            >
              System Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
