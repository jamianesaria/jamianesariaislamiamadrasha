"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import {
  sampleGalleryPhotos as _fallback_sampleGalleryPhotos,
  sampleGalleryVideos as _fallback_sampleGalleryVideos,
  GalleryPhotoItem,
  GalleryVideoItem,
} from "@/data/siteData";
import {
  Camera,
  Film,
  Play,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Clock,
  Sparkles,
  Search,
  Maximize2,
  Share2,
  Check,
} from "lucide-react";
import { EditableImage as Image, useEditableData, EditableText, useGalleryRecords } from "@/content/client";
import { fieldSource } from "@/content/model";


type MediaTab = "photos" | "videos" | "all";
type CategoryFilter = "all" | "campus" | "hifz" | "kitab" | "classroom" | "events" | "quran" | "waz" | "madrasa";

function GalleryContent() {
  const fallbackPhotos = useEditableData("copy.data.sampleGalleryPhotos", _fallback_sampleGalleryPhotos);
  const fallbackVideos = useEditableData("copy.data.sampleGalleryVideos", _fallback_sampleGalleryVideos);
  const galleryRecords = useGalleryRecords();
  const sampleGalleryPhotos = galleryRecords?.photos ?? fallbackPhotos;
  const sampleGalleryVideos = galleryRecords?.videos ?? fallbackVideos;

  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("type") as MediaTab) || "photos";
  const initialCategory = (searchParams.get("category") as CategoryFilter) || "all";

  const [activeTab, setActiveTab] = useState<MediaTab>(initialTab);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Lightbox modal states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedVideo, setActiveVideo] = useState<GalleryVideoItem | null>(null);
  const activeVideo = selectedVideo ? sampleGalleryVideos.find((video) => video.id === selectedVideo.id) ?? null : null;
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Filtered Photos
  const filteredPhotos = useMemo(() => {
    if (activeTab === "videos") return [];
    let list = [...sampleGalleryPhotos];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, activeCategory, searchQuery, sampleGalleryPhotos]);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    if (activeTab === "photos") return [];
    let list = [...sampleGalleryVideos];

    if (activeCategory !== "all") {
      list = list.filter(
        (v) =>
          v.category === activeCategory ||
          (activeCategory === "campus" && v.category === "madrasa") ||
          (activeCategory === "hifz" && v.category === "quran")
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.speaker && v.speaker.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeTab, activeCategory, searchQuery, sampleGalleryVideos]);

  // Lightbox handlers
  const openLightbox = (photoId: GalleryPhotoItem["id"]) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        if (e.key === "ArrowLeft") handlePrevPhoto();
        if (e.key === "ArrowRight") handleNextPhoto();
      }
      if (activeVideo !== null && e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const currentPhoto =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* =====================================================================
          ১। SLEEK GALLERY HEADER: Photo-first Studio Header
      ===================================================================== */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#016332] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          <Camera size={13} />
          <span><EditableText document="copy.ui.MainGallerySection" entry="e1yl7i7k" fallback={"ফটোগ্রাফি ও মিডিয়া আর্কাইভ"} /></span>
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight"><EditableText document="copy.ui.MainGallerySection" entry="e1eu7nqm" fallback={"ছবি ও ভিডিও গ্যালারি"} /></h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed"><EditableText document="copy.ui.MainGallerySection" entry="e1eyoaoc" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসার ক্যাম্পাস, শিক্ষাকার্যক্রম, হিফজুল কুরআন ও দ্বীনি মাহফিলের প্রামাণ্য চিত্রশালা।"} /></p>
      </div>

      {/* =====================================================================
          ২। CONTROLS BAR: Segmented Tabs, Category Pills & Live Search
      ===================================================================== */}
      <div className="space-y-4">
        {/* Top Controls: Main Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Segmented Media Type Toggle */}
          <div className="inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("photos")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "photos"
                  ? "bg-[#016332] text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <Camera size={16} />
              <span><EditableText document="copy.ui.MainGallerySection" entry="eopm6ol" fallback={"স্থিরচিত্র (ছবি)"} /></span>
              <span
                className={`text-[11px] font-mono px-2 py-0.2 rounded-full font-bold ${
                  activeTab === "photos"
                    ? "bg-amber-300 text-gray-900"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {sampleGalleryPhotos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("videos")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "videos"
                  ? "bg-[#8B111A] text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <Film size={16} />
              <span><EditableText document="copy.ui.MainGallerySection" entry="e1hxw8tl" fallback={"ভিডিও ও ড্রোন"} /></span>
              <span
                className={`text-[11px] font-mono px-2 py-0.2 rounded-full font-bold ${
                  activeTab === "videos"
                    ? "bg-amber-300 text-gray-900"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {sampleGalleryVideos.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "all"
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Sparkles size={14} />
              <span><EditableText document="copy.ui.MainGallerySection" entry="e1sfxt9k" fallback={"সবগুলো"} /></span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ছবি বা ভিডিও খুঁজুন..."
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm bg-white border border-gray-300 focus:border-[#016332] rounded-xl outline-none shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {[
            { id: "all", label: "সকল ক্যাটাগরি" },
            { id: "campus", label: "ক্যাম্পাস ও ভবন" },
            { id: "hifz", label: "হিফজুল কুরআন বিভাগ" },
            { id: "kitab", label: "কিতাব বিভাগ ও দারস" },
            { id: "events", label: "অনুষ্ঠান ও মাহফিল" },
            { id: "classroom", label: "শ্রেণিকক্ষ" },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#016332] text-white border-[#016332] shadow-xs"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          ৩। FEATURED REEL / PANORAMIC PREVIEW (Top Showcase)
      ===================================================================== */}
      {activeTab !== "photos" && activeCategory === "all" && !searchQuery && (
        <div className="relative rounded-3xl overflow-hidden bg-black shadow-xl group border-2 border-stone-800">
          <div className="relative aspect-[21/9] sm:aspect-[21/8] min-h-[220px] sm:min-h-[340px] w-full">
            <Image document="copy.ui.MainGallerySection" entry="eithl6p"
              src="/drone_poster.jpg"
              alt="জামিয়া নেছারিয়া ক্যাম্পাস ও ড্রোন শট"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

            {/* Play Button & Details */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider"><EditableText document="copy.ui.MainGallerySection" entry="e1vvgoqi" fallback={"অফিশিয়াল ড্রোন ফুটেজ"} /></span>
                <span className="text-xs text-amber-300 font-mono font-bold"><EditableText document="copy.ui.MainGallerySection" entry="e12qjscs" fallback={"০১:৪৫ মিনিট"} /></span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1 max-w-2xl">
                  <h2 className="text-lg sm:text-2xl font-black text-white leading-tight"><EditableText document="copy.ui.MainGallerySection" entry="e1g8k0tn" fallback={"পাখির চোখে জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা"} /></h2>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-1"><EditableText document="copy.ui.MainGallerySection" entry="e1p278lq" fallback={"মরকুন, তিস্তা গেট–আনোয়ার সিল্ক মিলস সংলগ্ন সুবিশাল ৪ তলা ক্যাম্পাস ও প্রাঙ্গণের আকাশদৃশ্য।"} /></p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveVideo({
                      id: 1,
                      title: "পাখির চোখে জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও ক্যাম্পাস (অফিশিয়াল ড্রোন ফুটেজ)",
                      category: "madrasa",
                      youtubeId: "",
                      localVideoUrl: "/drone_shot_of_madrasha.mp4",
                      thumbnail: "/drone_poster.jpg",
                      date: "২০ অক্টোবর ২০২৪",
                      duration: "০১:৪৫",
                      speaker: "জামিয়া নেছারিয়া মিডিয়া সেল",
                    })
                  }
                  className="inline-flex items-center gap-2 bg-[#8B111A] hover:bg-[#a81b26] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Play size={16} className="fill-white" />
                  <span><EditableText document="copy.ui.MainGallerySection" entry="e14tsqgi" fallback={"ড্রোন ভিডিও দেখুন"} /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ৪। PURE PHOTOGRAPHY & VIDEO MASONRY GRID (True Gallery Layout!)
      ===================================================================== */}
      {filteredPhotos.length === 0 && filteredVideos.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-3">
          <Camera size={40} className="mx-auto text-gray-400" />
          <h3 className="text-base font-bold text-gray-800"><EditableText document="copy.ui.MainGallerySection" entry="eitorpx" fallback={"কোনো ছবি বা ভিডিও পাওয়া যায়নি"} /></h3>
          <p className="text-xs text-gray-500"><EditableText document="copy.ui.MainGallerySection" entry="e1jfdhx" fallback={"আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ছবি নেই।"} /></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* PHOTO ITEMS: Image-Dominant Gallery Cards with Hover Scrim */}
          {filteredPhotos.map((photo) => (
            <div
              key={`photo-${photo.id}`}
              onClick={() => openLightbox(photo.id)}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] border border-gray-200/80"
            >
              <Image document="copy.ui.MainGallerySection" entry="eaajngl" source={fieldSource(photo, "imageUrl")}
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover Dark Gradient Overlay (Text only shows on hover, like a true gallery!) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#016332] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    {photo.category === "campus"
                      ? "ক্যাম্পাস"
                      : photo.category === "hifz"
                      ? "হিফজ বিভাগ"
                      : photo.category === "kitab"
                      ? "কিতাব বিভাগ"
                      : photo.category === "events"
                      ? "অনুষ্ঠান"
                      : "শ্রেণিকক্ষ"}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                    <ZoomIn size={16} />
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base leading-snug text-white drop-shadow-sm">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 flex items-center gap-1">
                    <Calendar size={11} />
                    <span>{photo.date}</span>
                  </p>
                </div>
              </div>

              {/* Persistent Minimal Corner Pill when not hovered */}
              <div className="absolute bottom-2.5 left-2.5 group-hover:opacity-0 transition-opacity duration-200">
                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {photo.category === "campus"
                    ? "ক্যাম্পাস"
                    : photo.category === "hifz"
                    ? "হিফজুল কুরআন"
                    : photo.category === "kitab"
                    ? "কিতাব দারস"
                    : "গ্যালারি"}
                </span>
              </div>
            </div>
          ))}

          {/* VIDEO ITEMS: Cinema Thumbnail with Centered Play Button */}
          {filteredVideos.map((video) => (
            <div
              key={`video-${video.id}`}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-2xl overflow-hidden bg-black shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[16/10] border-2 border-red-500/30"
            >
              <Image document="copy.ui.MainGallerySection" entry="e12sgre9" source={fieldSource(video, "thumbnail")}
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover opacity-85 group-hover:scale-108 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Dark Overlay with Centered Red Play Button */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-115 transition-all">
                  <Play size={22} className="ml-1 fill-white" />
                </div>
              </div>

              {/* Top Video Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-[#8B111A] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-sm">
                  {video.localVideoUrl ? "ড্রোন ফুটেজ" : "ভিডিও"}
                </span>
              </div>

              {/* Duration Pill */}
              {video.duration && (
                <div className="absolute top-3 right-3">
                  <span className="bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
              )}

              {/* Bottom Title Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 text-white space-y-0.5">
                <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1 leading-snug">
                  {video.title}
                </h3>
                {video.speaker && (
                  <p className="text-[10px] text-amber-300 truncate">
                    {video.speaker}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          ৫। FULLSCREEN PHOTO LIGHTBOX MODAL (Pure Studio Exhibition Mode)
      ===================================================================== */}
      {currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full text-white flex flex-col max-h-[94vh] justify-between"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3 text-xs text-gray-400">
              <span className="font-mono text-sm font-bold text-white"><EditableText document="copy.ui.MainGallerySection" entry="erug8ny" fallback={"ছবি "} />{lightboxIndex! + 1}<EditableText document="copy.ui.MainGallerySection" entry="e1tyehfl" fallback={" / "} />{filteredPhotos.length}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="লিংক শেয়ার"
                >
                  {copiedLink ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                </button>
                <a
                  href={currentPhoto.imageUrl}
                  download
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="ডাউনলোড"
                >
                  <Download size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage: High-Res Photo with Prev/Next buttons */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[520px] flex items-center justify-center">
              <Image document="copy.ui.MainGallerySection" entry="edk114n" source={fieldSource(currentPhoto, "imageUrl")}
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                fill
                className="object-contain"
              />

              {/* Prev Button */}
              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                  aria-label="পূর্ববর্তী ছবি"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {/* Next Button */}
              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                  aria-label="পরবর্তী ছবি"
                >
                  <ChevronRight size={28} />
                </button>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="pt-3 text-center space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentPhoto.title}
              </h3>
              {currentPhoto.description && (
                <p className="text-xs text-gray-300 max-w-2xl mx-auto line-clamp-2">
                  {currentPhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ৬। THEATER VIDEO MODAL (Cinema Experience)
      ===================================================================== */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setActiveVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-black text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col"
          >
            {/* Top Bar */}
            <div className="p-4 bg-stone-900 flex items-center justify-between gap-3">
              <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-xl">
                {activeVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-red-600 text-white transition-colors cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeVideo.localVideoUrl ? (
                <video
                  src={activeVideo.localVideoUrl}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryRoute() { const params = useSearchParams(); return <GalleryContent key={params.toString()} />; }

export default function MainGallerySection() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-gray-500 space-y-3">
          <div className="w-10 h-10 border-4 border-[#016332] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold"><EditableText document="copy.ui.MainGallerySection" entry="e1ks35lc" fallback={"গ্যালারি লোড হচ্ছে..."} /></p>
        </div>
      }
    >
      <GalleryRoute />
    </Suspense>
  );
}
