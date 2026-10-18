import Image from "next/image";
import Link from "next/link";
import { recentVideos, recentEvents } from "@/data/siteData";
import { Video, Calendar, PlayCircle, MapPin, ChevronRight } from "lucide-react";

export default function MediaAndEventsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* 1. Recent Videos (সাম্প্রতিক ভিডিওসমূহ) */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
        <div>
          {/* Deep Purple Header matching screenshot */}
          <div className="bg-[#4a148c] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Video size={16} />
              <span>সাম্প্রতিক ভিডিওসমূহ</span>
            </div>
            <Link
              href="/videos"
              className="text-xs text-purple-200 hover:text-white underline font-normal"
            >
              সকল ভিডিও
            </Link>
          </div>

          {/* Videos Grid / List */}
          <div className="p-3.5 space-y-3">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="group border border-gray-100 rounded overflow-hidden hover:border-[#4a148c] transition-all bg-gray-50/50 flex flex-col sm:flex-row gap-3 p-2"
              >
                <div className="relative w-full sm:w-36 h-24 shrink-0 rounded overflow-hidden bg-black">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10">
                    <PlayCircle size={30} className="text-white drop-shadow-md" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-[13px] font-semibold text-gray-800 group-hover:text-[#4a148c] leading-snug line-clamp-2">
                    {video.title}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Recent Events (সাম্প্রতিক ইভেন্টসমূহ) */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between">
        <div>
          {/* Deep Purple Header matching screenshot */}
          <div className="bg-[#4a148c] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>সাম্প্রতিক ইভেন্টসমূহ</span>
            </div>
            <Link
              href="/events"
              className="text-xs text-purple-200 hover:text-white underline font-normal"
            >
              সকল ইভেন্ট
            </Link>
          </div>

          {/* Events List */}
          <div className="p-3.5 space-y-3">
            {recentEvents.map((evt) => (
              <Link
                key={evt.id}
                href={evt.link}
                className="block p-3 rounded border border-gray-100 hover:border-[#4a148c] bg-gray-50/50 hover:bg-purple-50/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-xs sm:text-[13px] font-bold text-gray-800 group-hover:text-[#4a148c] leading-snug">
                    {evt.title}
                  </h5>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-[#4a148c] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-[#8B111A]" />
                    <span>{evt.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-[#8B111A]" />
                    <span>{evt.location}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

