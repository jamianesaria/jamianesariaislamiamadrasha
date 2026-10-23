"use client";

import { useState } from "react";

import { sampleGalleryVideos as _fallback_sampleGalleryVideos, GalleryVideoItem } from "@/data/siteData";
import { Video as VideoIcon, Play, X, Calendar, Clock, User, ExternalLink } from "lucide-react";
import { EditableImage as Image, useEditableData, EditableText, useGalleryRecords } from "@/content/client";
import { fieldSource } from "@/content/model";


const videoCategories = [
  { id: "all", label: "সব ভিডিও" },
  { id: "quran", label: "কুরআন তেলাওয়াত" },
  { id: "waz", label: "তাফসির ও নসিহত" },
  { id: "events", label: "অনুষ্ঠান ও সম্মেলন" },
  { id: "madrasa", label: "মাদ্রাসা কার্যক্রম" },
];

export default function VideoGallerySection() {
  const fallbackVideos = useEditableData("copy.data.sampleGalleryVideos", _fallback_sampleGalleryVideos);
  const sampleGalleryVideos = useGalleryRecords()?.videos ?? fallbackVideos;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedVideo, setActiveVideo] = useState<GalleryVideoItem | null>(null);
  const activeVideo = selectedVideo ? sampleGalleryVideos.find((video) => video.id === selectedVideo.id) ?? null : null;

  const filteredVideos =
    activeCategory === "all"
      ? sampleGalleryVideos
      : sampleGalleryVideos.filter((v) => v.category === activeCategory);

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot with video icon and text 'ভিডিও' */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center justify-between font-bold text-sm sm:text-base shadow-xs">
        <div className="flex items-center gap-2">
          <VideoIcon size={18} />
          <span><EditableText document="copy.ui.VideoGallerySection" entry="eyn3zo5" fallback={"ভিডিও (Video Gallery)"} /></span>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-normal"><EditableText document="copy.ui.VideoGallerySection" entry="e8ociwk" fallback={"মোট ভিডিও: "} />{filteredVideos.length}<EditableText document="copy.ui.VideoGallerySection" entry="e17dbglz" fallback={" টি"} /></span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
          {videoCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveVideo(null);
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

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                onClick={() => setActiveVideo(video)}
              >
                {/* Video Thumbnail with Play Button Overlay */}
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <Image document="copy.ui.VideoGallerySection" entry="etb7tl8" source={fieldSource(video, "thumbnail")}
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  {/* YouTube style Red Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-13 h-10 bg-[#b91c1c] text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-700 transition-all">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Clock size={11} />
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Video Info below thumbnail (matching screenshot layout) */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#126b59] transition-colors line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                    {video.speaker && (
                      <p className="text-xs text-gray-600 mt-1.5 flex items-center gap-1">
                        <User size={13} className="text-gray-400 shrink-0" />
                        <span>{video.speaker}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {video.date}
                    </span>
                    <span className="text-[#126b59] font-semibold group-hover:underline inline-flex items-center gap-1"><EditableText document="copy.ui.VideoGallerySection" entry="e1e7ayth" fallback={"ভিডিও দেখুন"} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400">
            <VideoIcon size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm"><EditableText document="copy.ui.VideoGallerySection" entry="e19d9xwe" fallback={"এই ক্যাটাগরিতে কোনো ভিডিও পাওয়া যায়নি।"} /></p>
          </div>
        )}
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2 line-clamp-1 pr-2">
                <VideoIcon size={18} className="shrink-0" />
                <span>{activeVideo.title}</span>
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Iframe Container (16:9 ratio) */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.localVideoUrl ? (
                <video src={activeVideo.localVideoUrl} poster={activeVideo.thumbnail} controls autoPlay playsInline className="w-full h-full" />
              ) : <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />}
            </div>

            {/* Modal Footer Details */}
            <div className="p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-200">
              <div className="text-xs text-gray-600 space-y-1">
                {activeVideo.speaker && (
                  <p>
                    <span className="font-bold text-gray-800"><EditableText document="copy.ui.VideoGallerySection" entry="ewe3luu" fallback={"বক্তা / পরিবেশক:"} /></span> {activeVideo.speaker}
                  </p>
                )}
                <p className="text-gray-400"><EditableText document="copy.ui.VideoGallerySection" entry="e1367jxx" fallback={"প্রকাশের তারিখ: "} />{activeVideo.date}</p>
              </div>

              <div className="flex items-center gap-2">
                {!activeVideo.localVideoUrl && <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#b91c1c] hover:bg-red-800 text-white text-xs font-semibold py-1.5 px-3 rounded inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span><EditableText document="copy.ui.VideoGallerySection" entry="e1qe2jzj" fallback={"ইউটিউবে দেখুন"} /></span>
                </a>}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold py-1.5 px-3 rounded transition-colors cursor-pointer"
                ><EditableText document="copy.ui.VideoGallerySection" entry="ea6gn28" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

