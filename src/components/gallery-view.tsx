// src/components/gallery-view.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Folder, ChevronRight as ChevronIcon, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  subcategory?: string | null;
}

interface GalleryViewProps {
  initialItems: GalleryItem[];
}

const DEFAULT_CATEGORIES = ["All", "Education", "Recreation", "Vocational", "Shishugruha", "Infrastructure"];

export default function GalleryView({ initialItems }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Compute categories dynamically based on seed data + default categories
  const categories = useMemo(() => {
    const dbCategories = Array.from(new Set(initialItems.map((item) => item.category).filter(Boolean)));
    // Keep DEFAULT_CATEGORIES order, and append any other unique DB categories
    const allCats = [...DEFAULT_CATEGORIES.filter((c) => c !== "All")];
    dbCategories.forEach((cat) => {
      if (!allCats.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        allCats.push(cat);
      }
    });
    return ["All", ...allCats];
  }, [initialItems]);

  // Reset subcategory selection when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
    setLightboxIndex(null);
  };

  // Get items in the selected category
  const categoryItems = useMemo(() => {
    if (selectedCategory === "All") {
      return initialItems;
    }
    return initialItems.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [initialItems, selectedCategory]);

  // Extract subfolders inside the selected category
  const subfolders = useMemo(() => {
    if (selectedCategory === "All") return [];
    
    // Group items by subcategory
    const folderMap: Record<string, { name: string; count: number; items: GalleryItem[] }> = {};
    
    categoryItems.forEach((item) => {
      if (item.subcategory && item.subcategory.trim() !== "") {
        const subName = item.subcategory.trim();
        if (!folderMap[subName]) {
          folderMap[subName] = { name: subName, count: 0, items: [] };
        }
        folderMap[subName].count += 1;
        folderMap[subName].items.push(item);
      }
    });
    
    return Object.values(folderMap).sort((a, b) => a.name.localeCompare(b.name));
  }, [categoryItems, selectedCategory]);

  // Filter items based on active subcategory drill-down
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return categoryItems;
    }
    // If category has subfolders but user hasn't picked one, don't show the images in the subfolders yet
    if (subfolders.length > 0) {
      if (selectedSubcategory) {
        return categoryItems.filter(
          (item) => item.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase()
        );
      }
      // Return images that DO NOT have a subcategory (uncategorized under this category)
      return categoryItems.filter(
        (item) => !item.subcategory || item.subcategory.trim() === ""
      );
    }
    return categoryItems;
  }, [categoryItems, selectedCategory, subfolders, selectedSubcategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Category Filter Pills bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`font-heading text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-accent-blue text-white shadow-md shadow-blue-500/20 scale-105"
                  : "bg-white text-primary-blue border border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Breadcrumbs & Navigation */}
      {selectedCategory !== "All" && (
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 border border-slate-200/60 rounded-2xl py-3.5 px-5 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <button 
              onClick={() => handleCategoryChange("All")}
              className="hover:text-accent-blue transition-colors shrink-0 cursor-pointer"
            >
              Gallery
            </button>
            <ChevronIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button 
              onClick={() => setSelectedSubcategory(null)}
              className={`hover:text-accent-blue transition-colors truncate cursor-pointer ${!selectedSubcategory ? "text-slate-800 font-bold" : ""}`}
            >
              {selectedCategory}
            </button>
            {selectedSubcategory && (
              <>
                <ChevronIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-slate-800 font-bold truncate">{selectedSubcategory}</span>
              </>
            )}
          </div>

          {selectedSubcategory && (
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="flex items-center gap-1.5 text-accent-blue hover:text-blue-700 transition-colors text-[11px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Folders
            </button>
          )}
        </div>
      )}

      {/* SUB-FOLDER INDEX (Google Drive Style Card Grid) */}
      {selectedCategory !== "All" && !selectedSubcategory && subfolders.length > 0 && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-400">
            Folders
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subfolders.map((folder) => (
              <div
                key={folder.name}
                onClick={() => setSelectedSubcategory(folder.name)}
                className="flex flex-col bg-white border border-slate-200 hover:border-blue-300 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Image Cover Preview */}
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  {folder.items[0]?.imageUrl ? (
                    <Image
                      src={folder.items[0].imageUrl}
                      alt={folder.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Folder className="w-10 h-10 fill-slate-100 text-slate-300" />
                    </div>
                  )}
                  {/* Folder count badge overlay on image */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-navy/85 backdrop-blur-sm rounded-full text-[10px] text-white font-bold uppercase tracking-wider shadow-sm z-10 flex items-center gap-1">
                    <Folder className="w-3.5 h-3.5 fill-white/10 text-white" />
                    {folder.count} {folder.count === 1 ? "Photo" : "Photos"}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex items-center justify-between gap-2 bg-slate-50 border-t border-slate-100 flex-grow">
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-slate-800 truncate">
                      {folder.name}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-accent-blue group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300 shrink-0 shadow-sm">
                    <ChevronIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Grid Container */}
      <div className="flex flex-col gap-4">
        {selectedCategory !== "All" && !selectedSubcategory && subfolders.length > 0 && filteredItems.length > 0 && (
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-400 mt-4">
            Loose Photos
          </h3>
        )}

        {filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-white/50 backdrop-blur-sm rounded-card border border-slate-200/50 shadow-sm"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden group shadow-sm border border-slate-100 cursor-pointer bg-slate-100"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                    <span className="text-accent-blue text-[10px] font-bold uppercase tracking-widest mb-1.5 w-fit">
                      {item.category} {item.subcategory ? `> ${item.subcategory}` : ""}
                    </span>
                    <p className="text-white font-heading font-semibold text-sm leading-snug">
                      {item.caption}
                    </p>
                    <ZoomIn className="w-5 h-5 text-white absolute top-4 right-4 opacity-75 hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty state for the current folder/drill-down level */
          (!subfolders.length || selectedSubcategory) && (
            <div className="text-center py-20 bg-white rounded-card border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 animate-fade-in">
              <p className="font-heading font-bold text-slate-400 text-lg">No gallery items found in this section.</p>
              <button 
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSubcategory(null);
                }}
                className="text-xs font-heading font-bold uppercase tracking-wider text-accent-blue cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div 
            className="fixed inset-0 bg-primary-blue/95 backdrop-blur-md z-[100] flex flex-col justify-between p-6"
            onClick={closeLightbox}
          >
            {/* Close button top right */}
            <div className="flex justify-end w-full">
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle slider container */}
            <div className="flex-grow flex items-center justify-between gap-4 max-w-6xl mx-auto w-full">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Main Image */}
              <div 
                className="relative flex-grow h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Caption pane */}
            <div className="text-center text-white pb-6 z-10 max-w-2xl mx-auto animate-fade-in" onClick={(e) => e.stopPropagation()}>
              <span className="text-accent-blue text-xs font-bold uppercase tracking-widest mb-1.5 block">
                {filteredItems[lightboxIndex].category} {filteredItems[lightboxIndex].subcategory ? `> ${filteredItems[lightboxIndex].subcategory}` : ""}
              </span>
              <p className="font-heading font-bold text-lg sm:text-xl leading-normal text-slate-100">
                {filteredItems[lightboxIndex].caption}
              </p>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-2 block">
                Image {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
