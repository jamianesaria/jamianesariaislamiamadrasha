import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";
import { getSiteSettings, getNewsTicker, getBlogPosts } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/blog", {
  title: "মাদরাসা ব্লগ, সাময়িকী ও সমকালীন প্রবন্ধ | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর অফিসিয়াল ব্লগ ও জ্ঞান মঞ্জিল - কুরআন-সুন্নাহর আলো, সমকালীন ইসলামি দর্শন, তারবিয়াত, অভিভাবকত্ব ও সুন্নাহসম্মত আদর্শ জীবনধারার নিয়মিত কলাম ও গবেষণামূলক প্রবন্ধ।",
});

async function BlogPage() {
  const [siteData, newsTicker, blogPosts] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
    getBlogPosts(),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      {/* ১। শীর্ষ ব্যানার */}
      <HeaderBanner initialSettings={siteData} />

      {/* ২। প্রধান নেভিগেশন বার */}
      <NavigationBar />

      {/* ৩। জরুরি ঘোষণা ও নোটিশ টিকার */}
      <BreakingNewsBar newsItems={newsTicker} />

      {/* ৪। প্রধান ব্লগ ও সাময়িকী পাতা */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <PageSeo route="/blog" />
        <BlogSection initialPosts={blogPosts} />
      </main>

      {/* ৫। ফুটার */}
      <Footer initialSettings={siteData} />
    </div>
  );
}
export default editableRoute("/blog", BlogPage);
