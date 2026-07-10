// src/components/dynamic-slider.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart, Calendar, Users, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface DynamicSliderProps {
  slides: Slide[];
}

export default function DynamicSlider({ slides }: DynamicSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Slide content variants for Framer Motion
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="relative w-full overflow-hidden bg-white text-navy min-h-[600px] lg:min-h-[700px] flex items-center border-b border-slate-100">
      {/* Background soft blue/white gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-blue/40 via-white to-white pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full px-6 py-12 lg:py-24 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left text stack */}
        <div className="lg:col-span-6 flex flex-col justify-center min-h-[350px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-6"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] sm:text-xs font-bold tracking-widest uppercase py-1.5 px-3.5 rounded-full w-fit">
                <Award className="w-3.5 h-3.5" />
                Historic Social welfare Trust
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-navy">
                {currentSlide.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {currentSlide.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Link
                  href="/get-involved"
                  className="bg-accent-blue hover:bg-blue-700 text-white font-heading text-xs font-bold uppercase tracking-wider py-3.5 px-7 rounded-xl shadow-md hover:-translate-y-[1px] active:translate-y-[0px] transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  Get Involved
                </Link>
                <Link
                  href="/about"
                  className="border border-slate-300 hover:border-primary-blue hover:bg-primary-blue/5 text-primary-blue font-heading text-xs font-bold uppercase tracking-wider py-3.5 px-7 rounded-xl transition-all"
                >
                  About Us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right image display */}
        <div className="lg:col-span-6 relative w-full h-[350px] sm:h-[450px] rounded-card overflow-hidden shadow-2xl group border border-slate-100 bg-slate-50">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentSlide.imageUrl}
                alt="DPACA Children Learning"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Impact Statistics */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 z-20">
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-100 flex flex-col justify-center items-center shadow-md">
              <span className="text-accent-blue font-heading font-extrabold text-base sm:text-xl">1942</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Established</span>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-100 flex flex-col justify-center items-center shadow-md">
              <span className="text-accent-blue font-heading font-extrabold text-base sm:text-xl">80+ Yrs</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Welfare Service</span>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-100 flex flex-col justify-center items-center shadow-md">
              <span className="text-accent-blue font-heading font-extrabold text-base sm:text-xl">300+</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Daily Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows (only if multiple slides) */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-6 lg:left-12 flex items-center gap-2 z-20">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-slate-200 hover:border-accent-blue rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-600 hover:text-accent-blue transition-all active:scale-95 shadow-sm"
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 border border-slate-200 hover:border-accent-blue rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-slate-600 hover:text-accent-blue transition-all active:scale-95 shadow-sm"
            aria-label="Next slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slider dots indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 lg:right-12 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                idx === currentIndex ? "bg-accent-blue w-6" : "bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
