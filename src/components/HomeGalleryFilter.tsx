"use client";

import { useState } from "react";

import { EditableImage as Image, EditableText, useEditableData } from "@/content/client";
import { fieldSource } from "@/content/model";


interface GalleryCategory {
  id: string;
  title: string;
  image?: string;
  caption?: string;
}

interface GalleryItem {
  id: string | number;
  categoryId?: string;
  categoryTitle?: string;
  title: string;
  image: string;
  caption: string;
}

interface HomeGalleryFilterProps {
  title: string;
  subtitle: string;
  categories: GalleryCategory[];
  items: GalleryItem[];
}

export default function HomeGalleryFilter({
  title,
  subtitle,
  categories: initialCategories,
  items: initialItems,
}: HomeGalleryFilterProps) {
  const categories = useEditableData("copy.data.homePageContent", initialCategories, ["gallery", "categories"]);
  const items = useEditableData("copy.data.homePageContent", initialItems, ["gallery", "items"]);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>("all");

  const filteredGallery =
    activeGalleryCategory === "all"
      ? items
      : items.filter(
          (item) => (item.categoryId || item.id) === activeGalleryCategory
        );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3.5 mb-6 border-b-2 border-[#016332]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-6 bg-[#8B111A] rounded-full inline-block" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveGalleryCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full border cursor-pointer transition-all ${
              activeGalleryCategory === "all"
                ? "bg-[#016332] text-white border-[#016332] shadow-2xs"
                : "bg-[#F9FAF8] text-gray-700 border-gray-300 hover:border-[#016332]"
            }`}
          ><EditableText document="copy.ui.HomeGalleryFilter" entry="ej4bffj" fallback={"সকল ছবি"} /></button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveGalleryCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full border cursor-pointer transition-all ${
                activeGalleryCategory === cat.id
                  ? "bg-[#8B111A] text-white border-[#8B111A] shadow-2xs"
                  : "bg-[#F9FAF8] text-gray-700 border-gray-300 hover:border-[#8B111A]"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200/90 rounded-xl bg-white overflow-hidden group shadow-xs hover:shadow-md hover:border-[#016332]/60 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-100">
              <Image document="copy.ui.HomeGalleryFilter" entry="e28bn1t" source={fieldSource(item, "image")}
                src={item.image || "/drone_poster.jpg"}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              {"categoryTitle" in item && item.categoryTitle && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[11px] font-bold bg-[#016332]/95 text-white px-2.5 py-0.5 rounded-full shadow-xs border border-white/20">
                    {String(item.categoryTitle)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

