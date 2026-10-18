"use client";

import { useState } from "react";
import Image from "next/image";
import { sampleBlogPosts, BlogPostItem } from "@/data/siteData";
import { 
  FileText, 
  Calendar, 
  ThumbsUp, 
  MessageSquare, 
  ArrowRight, 
  X, 
  User, 
  Tag, 
  Share2,
  Check
} from "lucide-react";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "শিক্ষা", "অভিভাবকত্ব", "স্বাস্থ্য ও সচেতনতা", "দ্বীনি শিক্ষা", "হিফজুল কুরআন", "পাঠ্যক্রম"];

  const filteredPosts = activeCategory === "all" 
    ? sampleBlogPosts 
    : sampleBlogPosts.filter((p) => p.category === activeCategory);

  const handleLike = (id: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot with icon and title 'ব্লগ তালিকা' */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center justify-between font-bold text-sm sm:text-base shadow-xs">
        <div className="flex items-center gap-2">
          <FileText size={18} />
          <span>ব্লগ তালিকা</span>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-normal">
          মোট ব্লগ: {filteredPosts.length} টি
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#126b59] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat === "all" ? "সব পোস্ট" : cat}
              </button>
            );
          })}
        </div>

        {/* Blog Cards Grid matching screenshot layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const currentLikes = post.likesCount + (likes[post.id] || 0);

            return (
              <div
                key={post.id}
                className="bg-white rounded border border-gray-200 hover:border-teal-500 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Blog Image */}
                <div 
                  className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-2xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {post.category}
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Post Title */}
                    <h3 
                      onClick={() => setSelectedPost(post)}
                      className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#126b59] transition-colors cursor-pointer line-clamp-1"
                    >
                      {post.title}
                    </h3>

                    {/* Meta Row matching screenshot: Calendar, Like, Comment icons */}
                    <div className="flex items-center gap-3 text-[12px] text-gray-500 mt-2 pb-2 border-b border-gray-100">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-teal-700" />
                        <span>{post.date}</span>
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={13} className="text-teal-700" />
                        <span>{currentLikes}</span>
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={13} className="text-teal-700" />
                        <span>{post.commentsCount}</span>
                      </span>
                    </div>

                    {/* Excerpt text matching screenshot */}
                    <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More link */}
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-semibold text-[#126b59] hover:text-[#8B111A] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Read More ..</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => handleLike(post.id)}
                      className="text-[11px] text-gray-500 hover:text-teal-700 flex items-center gap-1 cursor-pointer transition-colors"
                      title="পছন্দ করুন"
                    >
                      <ThumbsUp size={12} />
                      <span>লাইক</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div className="max-w-3xl w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#126b59] text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm sm:text-base flex items-center gap-2 line-clamp-1 pr-2">
                <FileText size={18} className="shrink-0" />
                <span>{selectedPost.title}</span>
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 shrink-0 cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="relative aspect-16/9 w-full rounded-md overflow-hidden bg-gray-100 shadow-2xs">
                <Image
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2.5 pb-3 border-b border-gray-100">
                  <span className="flex items-center gap-1 text-teal-800 font-semibold">
                    <User size={14} />
                    <span>{selectedPost.author}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>{selectedPost.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 bg-teal-50 text-teal-800 px-2 py-0.5 rounded text-[11px] font-bold">
                    <Tag size={11} />
                    <span>{selectedPost.category}</span>
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-800 italic bg-gray-50 p-3 rounded border-l-4 border-[#126b59]">
                  {selectedPost.excerpt}
                </p>
                <p>{selectedPost.content}</p>
                <p>
                  আমাদের জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী শিক্ষার্থীদের আত্মবিশ্বাস ও মানসিক বিকাশে সর্বদা সচেষ্ট। শিক্ষার প্রতিটি ধাপে শিক্ষক ও অভিভাবকের সম্মিলিত প্রচেষ্টা ছাত্র-ছাত্রীদের কাঙ্ক্ষিত গন্তব্যে পৌঁছাতে সহায়তা করে।
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    className="bg-teal-50 hover:bg-teal-100 text-[#126b59] font-bold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ThumbsUp size={14} />
                    <span>লাইক ({selectedPost.likesCount + (likes[selectedPost.id] || 0)})</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                    <span>{copied ? "কপি হয়েছে!" : "শেয়ার লিংক"}</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-[#126b59] hover:bg-[#0e5244] text-white text-xs font-semibold py-1.5 px-4 rounded transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

