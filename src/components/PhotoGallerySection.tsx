"use client";

import { useState } from "react";
import Image from "next/image";
import { sampleGalleryPhotos, GalleryPhotoItem } from "@/data/siteData";
import { Image as ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Calendar, Download } from "lucide-react";

const categories = [
  { id: "all", label: "সব ছবি" },
  { id: "campus", label: "ক্যাম্পাস ও পরিবেশ" },
  { id: "events", label: "অনুষ্ঠান ও সম্মেলন" },
  { id: "classroom", label: "শ্রেণিকক্ষ ও ল্যাব" },
  { id: "hifz", label: "হিফজুল কুরআন" },
];

export default function PhotoGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "all"
      ? sampleGalleryPhotos
      : sampleGalleryPhotos.filter((photo) => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  };

  const activePhoto: GalleryPhotoItem | null =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center justify-between font-bold text-sm sm:text-base shadow-xs">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} />
          <span>ছবি (Photo Gallery)</span>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-normal">
          মোট ছবি: {filteredPhotos.length} টি
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#126b59] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(idx)}
                className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all cursor-pointer flex flex-col"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-4/3 w-full bg-gray-200 overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="bg-white/90 text-[#126b59] p-2 rounded-full shadow-md">
                      <ZoomIn size={18} />
                    </span>
                  </div>
                </div>

                {/* Caption / Title */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-[#126b59] transition-colors">
                      {photo.title}
                    </h3>
                    {photo.description && (
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                        {photo.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} />
                      {photo.date}
                    </span>
                    <span className="text-[#126b59] font-medium group-hover:underline">
                      বড় করে দেখুন
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি।</p>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200">
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  {activePhoto.title}
                </h3>
                {activePhoto.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {activePhoto.description}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {activePhoto.date}
                  </span>
                  <span>
                    ছবি {selectedPhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePhoto.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#126b59] hover:bg-[#0e5244] text-white text-xs font-semibold py-2 px-3.5 rounded transition-colors inline-flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>মূল ছবি দেখুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

