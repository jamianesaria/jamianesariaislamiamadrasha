"use client";

import { useState, useEffect, useMemo } from "react";
import { stegaClean } from "@sanity/client/stega";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { blogPath } from "@/data/seoData";
import { sampleBlogPosts as _fallback_sampleBlogPosts, BlogPostItem } from "@/data/siteData";
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
  Check,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Quote,
  LayoutGrid,
  ListFilter,
  SlidersHorizontal,
  Send,
  Phone,
  ZoomIn,
  ZoomOut,
  Heart,
} from "lucide-react";
import { EditableImage as Image, useEditableData, EditableText } from "@/content/client";
import { fieldSource } from "@/content/model";


interface BlogSectionProps {
  initialPosts?: BlogPostItem[];
}

export default function BlogSection({ initialPosts }: BlogSectionProps = {}) {
  const sampleBlogPosts = useEditableData("copy.data.sampleBlogPosts", _fallback_sampleBlogPosts);

  const posts = initialPosts ?? sampleBlogPosts;
  const router = useRouter();

  const [selectedPostRecord, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [fontSize, setFontSize] = useState<number>(15); // for modal reader text

  const selectedPost = posts.find((post) => post.id === selectedPostRecord?.id) || null;

  // Hash changes are browser events; the first check runs after the page is mounted.
  useEffect(() => {
    const openHash = () => {
      const match = window.location.hash.match(/^#post-(.+)$/);
      const found = match ? posts.find((post) => String(post.id) === decodeURIComponent(match[1])) : undefined;
      if (found) router.replace(blogPath(stegaClean(found.slug)));
    };
    const frame = requestAnimationFrame(openHash);
    window.addEventListener("hashchange", openHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", openHash); };
  }, [posts, router]);

  // Categories list with distinct counts
  const categories = useMemo(() => {
    const cats = ["all", "দ্বীনি শিক্ষা", "শিক্ষা", "অভিভাবকত্ব", "হিফজুল কুরআন", "স্বাস্থ্য ও সচেতনতা", "পাঠ্যক্রম"];
    return cats;
  }, []);

  // Filtered and searched posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "all" || stegaClean(post.category) === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  // Spotlight post (Featured)
  const spotlightPost = useMemo(() => {
    if (activeCategory === "all" && !searchQuery.trim() && filteredPosts.length > 0) {
      return filteredPosts[0];
    }
    return null;
  }, [activeCategory, searchQuery, filteredPosts]);

  // Remaining posts when spotlight is active
  const regularPosts = useMemo(() => {
    if (spotlightPost) {
      return filteredPosts.slice(1);
    }
    return filteredPosts;
  }, [spotlightPost, filteredPosts]);

  const handleLike = (id: BlogPostItem["id"], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isAlreadyLiked = likedPosts[id];
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (isAlreadyLiked ? -1 : 1),
    }));
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !isAlreadyLiked,
    }));
  };

  const handleShare = (post?: BlogPostItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = post
        ? `${window.location.origin}${blogPath(stegaClean(post.slug))}`
        : window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* =====================================================================
          ১। HERO SHOWCASE BANNER (Islamic Journal & Magazine Header)
      ===================================================================== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#012e16] via-[#014d26] to-[#016332] text-white p-6 sm:p-10 shadow-xl border-2 border-emerald-600/40">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          {/* Breadcrumb & Badge */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-emerald-200">
            <span className="text-amber-300 font-semibold"><EditableText document="copy.ui.BlogSection" entry="e196gy13" fallback={"মাদরাসা ব্লগ ও সাময়িকী"} /></span>
            <span className="bg-[#8B111A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/30 ml-2"><EditableText document="copy.ui.BlogSection" entry="ebg0lua" fallback={"জ্ঞান মঞ্জিল"} /></span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug text-white"><EditableText document="copy.ui.BlogSection" entry="e1k5g3tn" fallback={"জামিয়া বার্তা, গবেষণা ও সমকালীন প্রবন্ধ"} /></h1>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 max-w-3xl leading-relaxed"><EditableText document="copy.ui.BlogSection" entry="es6vfln" fallback={"কুরআন-সুন্নাহর আলোকবর্তিকা, সমকালীন ইসলামি দর্শন, তারবিয়াত, অভিভাবকত্ব ও আদর্শ মানবচরিত্র গঠনের দিকনির্দেশনামূলক নিয়মিত লেখা।"} /></p>
          </div>

          {/* Search Bar & Quick Metrics */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ব্লগ বা লেখকের নাম দিয়ে অনুসন্ধান করুন..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-gray-900 placeholder:text-emerald-200 focus:placeholder:text-gray-400 pl-10 pr-9 py-2.5 rounded-xl border border-emerald-400/30 focus:border-amber-400 focus:outline-none transition-all text-xs sm:text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-200 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-emerald-100 bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10 shrink-0">
              <BookOpen size={14} className="text-amber-300" />
              <span><EditableText document="copy.ui.BlogSection" entry="enpf8bb" fallback={"মোট লেখা: "} /><strong className="text-white">{filteredPosts.length}</strong><EditableText document="copy.ui.BlogSection" entry="em0tc1w" fallback={" টি"} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ২। CATEGORY PILLS & VIEW TOGGLE TOOLBAR
      ===================================================================== */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const count =
              cat === "all"
                ? posts.length
                : posts.filter((p) => stegaClean(p.category) === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#016332] text-white shadow-xs scale-102"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-[#016332]"
                }`}
              >
                <span>{cat === "all" ? "সকল বিষয়" : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/25 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-gray-100">
          <span className="text-xs text-gray-400 mr-1 hidden sm:inline"><EditableText document="copy.ui.BlogSection" entry="ew6j80" fallback={"লেআউট:"} /></span>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
              viewMode === "grid"
                ? "bg-[#016332] text-white border-[#016332]"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
            title="গ্রিড ভিউ"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
              viewMode === "list"
                ? "bg-[#016332] text-white border-[#016332]"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
            title="ম্যাগাজিন লিস্ট ভিউ"
          >
            <ListFilter size={15} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          ৩। SPOTLIGHT / EDITOR'S PICK (Magazine Hero Article)
      ===================================================================== */}
      {spotlightPost && (
        <article
          onClick={() => setSelectedPost(spotlightPost)}
          className="group relative bg-white rounded-2xl border-2 border-amber-500/30 hover:border-[#016332] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Spotlight Cover Photo */}
          <div className="relative aspect-16/10 lg:aspect-auto lg:h-full lg:col-span-7 overflow-hidden bg-gray-100 min-h-[260px] sm:min-h-[340px]">
            <Image document="copy.ui.BlogSection" entry="e1e739o3" source={fieldSource(spotlightPost, "thumbnail")}
              src={spotlightPost.thumbnail}
              alt={spotlightPost.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />

            {/* Floating Top Badges */}
            <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300">
                <Sparkles size={13} className="fill-amber-950" />
                <span><EditableText document="copy.ui.BlogSection" entry="e8s2djh" fallback={"সম্পাদকীয় বিশেষ লেখা"} /></span>
              </span>
              <span className="bg-[#8B111A] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                {spotlightPost.category}
              </span>
            </div>

            {spotlightPost.readTime && (
              <div className="absolute top-3.5 right-3.5">
                <span className="bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Clock size={12} />
                  <span>{spotlightPost.readTime}</span>
                </span>
              </div>
            )}
          </div>

          {/* Spotlight Content Area */}
          <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between space-y-4 bg-gradient-to-b from-white via-[#FAF7F0]/40 to-white">
            <div className="space-y-3">
              {/* Meta row */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1 font-semibold text-emerald-800">
                  <User size={14} />
                  <span>{spotlightPost.author}</span>
                </span>
                <span><EditableText document="copy.ui.BlogSection" entry="e1n8obvo" fallback={"•"} /></span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{spotlightPost.date}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#016332] transition-colors leading-snug">
                <Link href={blogPath(stegaClean(spotlightPost.slug))} onClick={(event) => event.stopPropagation()}>{spotlightPost.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-l-3 border-[#016332] pl-3 py-0.5 bg-emerald-50/40 rounded-r-md">
                {spotlightPost.excerpt}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <Link
                href={blogPath(stegaClean(spotlightPost.slug))}
                onClick={(event) => event.stopPropagation()}
                className="bg-[#016332] hover:bg-[#8B111A] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer"
              >
                <span><EditableText document="copy.ui.BlogSection" entry="el13m62" fallback={"সম্পূর্ণ প্রবন্ধ পড়ুন"} /></span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleLike(spotlightPost.id, e)}
                  className={`p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs ${
                    likedPosts[spotlightPost.id]
                      ? "bg-rose-50 text-rose-600 border-rose-200"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                  title="লাইক দিন"
                >
                  <Heart
                    size={15}
                    className={likedPosts[spotlightPost.id] ? "fill-rose-500 text-rose-500" : ""}
                  />
                  <span>
                    {spotlightPost.likesCount + (likes[spotlightPost.id] || 0)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleShare(spotlightPost, e)}
                  className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
                  title="শেয়ার লিংক কপি করুন"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* =====================================================================
          ৪। MAIN CONTENT AREA: ARTICLES GRID + UNIQUE SIDEBAR
      ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Articles List / Grid (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
              <FileText size={44} className="text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800"><EditableText document="copy.ui.BlogSection" entry="eujawxt" fallback={"কোনো ব্লগ পাওয়া যায়নি"} /></h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto"><EditableText document="copy.ui.BlogSection" entry="e13b9roh" fallback={"আপনার অনুসন্ধানকৃত শব্দ বা ক্যাটাগরিতে কোনো নিবন্ধ পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।"} /></p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="bg-[#016332] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#8B111A] transition-colors"
              ><EditableText document="copy.ui.BlogSection" entry="e1ycq5a2" fallback={"সকল ব্লগ দেখুন"} /></button>
            </div>
          ) : viewMode === "grid" ? (
            /* ================= GRID VIEW ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regularPosts.map((post) => {
                const currentLikes = post.likesCount + (likes[post.id] || 0);
                const isLiked = likedPosts[post.id];

                return (
                  <article
                    key={post.id}
                    id={`post-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white rounded-xl border border-gray-200/90 hover:border-[#016332] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer scroll-mt-24"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden">
                        <Image document="copy.ui.BlogSection" entry="e3a7api" source={fieldSource(post, "thumbnail")}
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-bold bg-[#8B111A] text-white px-2.5 py-0.5 rounded shadow-xs">
                            {post.category}
                          </span>
                        </div>
                        {post.readTime && (
                          <div className="absolute top-3 right-3">
                            <span className="text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded shadow-xs">
                              {post.readTime}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-4 sm:p-5 space-y-2">
                        {/* Meta */}
                        <div className="flex items-center gap-2.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1 font-medium text-emerald-800">
                            <User size={13} />
                            <span>{post.author}</span>
                          </span>
                          <span><EditableText document="copy.ui.BlogSection" entry="e1fp3hma" fallback={"•"} /></span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{post.date}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 group-hover:text-[#016332] transition-colors text-base leading-snug line-clamp-2">
                          <Link href={blogPath(stegaClean(post.slug))} onClick={(event) => event.stopPropagation()}>{post.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] group-hover:text-[#016332] transition-colors">
                        <span><EditableText document="copy.ui.BlogSection" entry="exmkft8" fallback={"বিস্তারিত পড়ুন"} /></span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => handleLike(post.id, e)}
                          className={`flex items-center gap-1 text-[11px] transition-colors ${
                            isLiked ? "text-rose-600 font-bold" : "text-gray-400 hover:text-rose-600"
                          }`}
                          title="লাইক দিন"
                        >
                          <Heart size={13} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                          <span>{currentLikes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleShare(post, e)}
                          className="text-gray-400 hover:text-[#016332] transition-colors"
                          title="লিংক কপি করুন"
                        >
                          <Share2 size={13} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* ================= MAGAZINE LIST VIEW ================= */
            <div className="space-y-4">
              {regularPosts.map((post) => {
                const currentLikes = post.likesCount + (likes[post.id] || 0);
                const isLiked = likedPosts[post.id];

                return (
                  <article
                    key={post.id}
                    id={`post-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white rounded-xl border border-gray-200/90 hover:border-[#016332] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 group cursor-pointer scroll-mt-24"
                  >
                    {/* Small List Thumbnail */}
                    <div className="relative aspect-16/10 sm:w-52 sm:h-36 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image document="copy.ui.BlogSection" entry="ebotvi" source={fieldSource(post, "thumbnail")}
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 220px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-bold bg-[#8B111A] text-white px-2 py-0.5 rounded shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* List Content */}
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5 text-xs text-gray-500">
                          <span className="font-medium text-emerald-800">{post.author}</span>
                          <span><EditableText document="copy.ui.BlogSection" entry="e12peqzx" fallback={"•"} /></span>
                          <span>{post.date}</span>
                          {post.readTime && (
                            <>
                              <span><EditableText document="copy.ui.BlogSection" entry="e1cmv0g5" fallback={"•"} /></span>
                              <span className="text-gray-400">{post.readTime}</span>
                            </>
                          )}
                        </div>

                        <h3 className="font-bold text-gray-900 group-hover:text-[#016332] transition-colors text-base sm:text-lg leading-snug">
                          <Link href={blogPath(stegaClean(post.slug))} onClick={(event) => event.stopPropagation()}>{post.title}</Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8B111A] group-hover:text-[#016332]">
                          <span><EditableText document="copy.ui.BlogSection" entry="edkkr7n" fallback={"সম্পূর্ণ প্রবন্ধ পড়ুন"} /></span>
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => handleLike(post.id, e)}
                            className="text-xs text-gray-500 hover:text-rose-600 flex items-center gap-1"
                          >
                            <Heart size={13} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                            <span>{currentLikes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* =====================================================================
            ৫। RIGHT SIDEBAR (Unique Islamic Knowledge & Patron Widgets)
        ===================================================================== */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Widget 1: মুহতামিম সাহেবের নসিহত (Patron's Word) */}
          <div className="bg-gradient-to-br from-[#023e1e] to-[#015c2d] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-600/50 relative overflow-hidden">
            <Quote
              size={70}
              className="absolute -right-3 -bottom-3 text-white/10 pointer-events-none"
            />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider"><EditableText document="copy.ui.BlogSection" entry="e1um5vt3" fallback={"মুহতামিমের বিশেষ বার্তা"} /></span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed"><EditableText document="copy.ui.BlogSection" entry="e7gxa8n" fallback={"“ইলম অর্জন কেবল সনদ পাওয়ার জন্য নয়; বরং অন্তরে তাকওয়া, চরিত্র গঠন ও মানুষের কল্যাণে নিজেকে বিলিয়ে দেওয়ার জন্যই প্রকৃত ইলম। আমাদের শিক্ষার্থীদের প্রতিটি পদক্ষেপে এই শিক্ষার চর্চা নিশ্চিত করা হয়।”"} /></p>
              <div className="pt-2 border-t border-emerald-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white"><EditableText document="copy.ui.BlogSection" entry="edd71by" fallback={"মাওলানা মুফতি উবায়দুল্লাহ"} /></div>
                  <div className="text-[11px] text-emerald-200"><EditableText document="copy.ui.BlogSection" entry="e1j1i2ik" fallback={"মুহতামিম ও শায়খুল হাদিস"} /></div>
                </div>
                <Link
                  href="/about"
                  className="text-[11px] text-amber-300 hover:underline"
                ><EditableText document="copy.ui.BlogSection" entry="e1xg68go" fallback={"পরিচিতি →"} /></Link>
              </div>
            </div>
          </div>

          {/* Widget 2: বিষয়ভিত্তিক ক্যাটাগরি তালিকা */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2.5">
              <Tag size={15} className="text-[#016332]" />
              <span><EditableText document="copy.ui.BlogSection" entry="ehou03t" fallback={"বিষয়ভিত্তিক ব্লগসমূহ"} /></span>
            </h4>
            <div className="space-y-1.5">
              {categories
                .filter((c) => c !== "all")
                .map((cat) => {
                  const count = posts.filter((p) => stegaClean(p.category) === cat).length;
                  const isCurrent = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-emerald-50 text-[#016332] font-bold border border-emerald-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B111A]" />
                        <span>{cat}</span>
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">
                        {count}<EditableText document="copy.ui.BlogSection" entry="e8bxeym" fallback={" টি"} /></span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Widget 3: লেখক হতে চান? (Submit an Article) */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Send size={16} className="text-[#8B111A]" />
              <span><EditableText document="copy.ui.BlogSection" entry="e1e1r92" fallback={"লেখা পাঠাতে চান?"} /></span>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed"><EditableText document="copy.ui.BlogSection" entry="e1cdwqpq" fallback={"মাদরাসার শিক্ষক, শিক্ষার্থী বা শুভাকাঙ্ক্ষী হিসেবে আপনার মৌলিক গবেষণামূলক দ্বীনি প্রবন্ধ বা শিক্ষণীয় ভাবনা আমাদের সম্পাদকীয় সেলে পাঠাতে পারেন।"} /></p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 w-full bg-[#8B111A] hover:bg-[#a81b26] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition-colors text-center"
            >
              <span><EditableText document="copy.ui.BlogSection" entry="eiqhbf5" fallback={"লেখা প্রেরণের নিয়মাবলী"} /></span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Widget 4: সরাসরি ভর্তি ও তথ্য সহায়িকা */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Phone size={15} className="text-[#016332]" />
              <span><EditableText document="copy.ui.BlogSection" entry="ev9h1ua" fallback={"জরুরি তথ্য ও যোগাযোগ"} /></span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed"><EditableText document="copy.ui.BlogSection" entry="emt96lf" fallback={"দ্বীনি শিক্ষা, ভর্তি ও এতিমখানা তহবিলে অনুদান সংক্রান্ত যে কোনো তথ্যের জন্য আমাদের হেল্পডেস্কে যোগাযোগ করতে পারেন।"} /></p>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:01712218086"
                className="flex items-center justify-between text-xs font-bold text-[#016332] bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <span><EditableText document="copy.ui.BlogSection" entry="ec4zju" fallback={"অফিস হটলাইন:"} /></span>
                <span><EditableText document="copy.ui.BlogSection" entry="esmlmpc" fallback={"০১৭১২-২১৮০৮৬"} /></span>
              </a>
              <Link
                href="/admission"
                className="text-center text-xs text-gray-600 hover:text-[#8B111A] py-1 font-semibold"
              ><EditableText document="copy.ui.BlogSection" entry="e1o1fy07" fallback={"অনলাইন ভর্তি তথ্য দেখুন →"} /></Link>
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          ৬। ENHANCED FULL ARTICLE READER MODAL (Interactive Reader Experience)
      ===================================================================== */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-gray-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="bg-[#014d26] text-white px-5 py-3.5 flex items-center justify-between border-b border-emerald-700">
              <div className="flex items-center gap-2 pr-2">
                <BookOpen size={17} className="text-amber-300 shrink-0" />
                <span className="font-bold text-xs sm:text-sm line-clamp-1">
                  {selectedPost.title}
                </span>
              </div>

              {/* Reader Controls: Font Resize & Close */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(13, s - 1))}
                  className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="লেখা ছোট করুন"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(22, s + 1))}
                  className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="লেখা বড় করুন"
                >
                  <ZoomIn size={16} />
                </button>
                <div className="w-[1px] h-4 bg-emerald-600 mx-1" />
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body / Reader Area */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {/* Cover Image */}
              <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                <Image document="copy.ui.BlogSection" entry="e1aapfa7" source={fieldSource(selectedPost, "thumbnail")}
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#8B111A] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                    {selectedPost.category}
                  </span>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
                  <Link href={blogPath(stegaClean(selectedPost.slug))}>{selectedPost.title}</Link>
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pb-3 border-b border-gray-100">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <User size={14} />
                    <span>{selectedPost.author}</span>
                  </span>
                  <span><EditableText document="copy.ui.BlogSection" entry="euy06ix" fallback={"•"} /></span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>{selectedPost.date}</span>
                  </span>
                  {selectedPost.readTime && (
                    <>
                      <span><EditableText document="copy.ui.BlogSection" entry="e18ukn0e" fallback={"•"} /></span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Clock size={13} />
                        <span>{selectedPost.readTime}</span>
                      </span>
                    </>
                  )}
                  <span><EditableText document="copy.ui.BlogSection" entry="et26gsj" fallback={"•"} /></span>
                  <span className="flex items-center gap-1 text-rose-600 font-semibold">
                    <Heart size={13} className="fill-rose-500" />
                    <span>{selectedPost.likesCount + (likes[selectedPost.id] || 0)}<EditableText document="copy.ui.BlogSection" entry="e13jyod9" fallback={" পছন্দ"} /></span>
                  </span>
                </div>
              </div>

              {/* Lead Excerpt Quote */}
              <div className="bg-[#FAF7F0] border-l-4 border-[#016332] p-4 rounded-r-xl space-y-1">
                <div className="text-[11px] font-bold text-[#016332] uppercase tracking-wider"><EditableText document="copy.ui.BlogSection" entry="e1shiww7" fallback={"সারসংক্ষেপ"} /></div>
                <p className="text-xs sm:text-sm text-gray-800 italic leading-relaxed"><EditableText document="copy.ui.BlogSection" entry="e13r9nc7" fallback={"“"} />{selectedPost.excerpt}<EditableText document="copy.ui.BlogSection" entry="ed8wft" fallback={"”"} /></p>
              </div>

              {/* Full Article Content */}
              <div
                className="text-gray-800 leading-relaxed space-y-4"
                style={{ fontSize: `${fontSize}px` }}
              >
                <p>{selectedPost.content}</p>
                <p><EditableText document="copy.ui.BlogSection" entry="e14wg591" fallback={"আমাদের প্রিয় নবি হজরত মুহাম্মদ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম ইরশাদ করেছেন: “তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শিখে এবং অন্যকে শিক্ষা দেয়।” দ্বীনি শিক্ষার প্রতিটি শাখায় শিক্ষার্থীদের মননশীলতা, মানবিক মূল্যবোধ ও সহমর্মিতা অর্জনের উপর সর্বাধিক গুরুত্বারোপ করা হয়।"} /></p>
                <p><EditableText document="copy.ui.BlogSection" entry="e1pj82f1" fallback={"একটি সুন্দর ভবিষ্যৎ গড়ার প্রত্যয়ে পরিবার, সমাজ ও শিক্ষাপ্রতিষ্ঠানকে যৌথভাবে কাজ করতে হবে। আল্লাহ তাআলা আমাদের সকলকে সহীহ দ্বীনি জ্ঞান অর্জন এবং সেই অনুযায়ী আমল করার তাওফিক দান করুন। আমিন।"} /></p>
              </div>

              {/* Author Signature Box */}
              <div className="mt-8 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#016332] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs"><EditableText document="copy.ui.BlogSection" entry="e1mdhjv3" fallback={"✍️"} /></div>
                  <div>
                    <div className="font-bold text-sm text-gray-900">{selectedPost.author}</div>
                    <div className="text-xs text-gray-600"><EditableText document="copy.ui.BlogSection" entry="e109vnki" fallback={"জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা, টঙ্গী"} /></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLike(selectedPost.id, e)}
                  className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                    likedPosts[selectedPost.id]
                      ? "bg-rose-500 text-white border-rose-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <Heart size={14} className={likedPosts[selectedPost.id] ? "fill-white" : ""} />
                  <span>{likedPosts[selectedPost.id] ? "পছন্দ হয়েছে" : "পছন্দ করুন"}</span>
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(selectedPost)}
                  className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-semibold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copied ? "লিংক কপি হয়েছে!" : "শেয়ার করুন"}</span>
                </button>

                <span className="text-xs text-gray-500 hidden sm:inline"><EditableText document="copy.ui.BlogSection" entry="ey8auxo" fallback={"(লিংকটি সরাসরি ফেসবুক বা হোয়াটসঅ্যাপে পাঠাতে পারেন)"} /></span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="bg-[#016332] hover:bg-[#8B111A] text-white text-xs font-bold py-2 px-5 rounded-lg transition-colors cursor-pointer shadow-xs"
              ><EditableText document="copy.ui.BlogSection" entry="emrcc5y" fallback={"বন্ধ করুন"} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
