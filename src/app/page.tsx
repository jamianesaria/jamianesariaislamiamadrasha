import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import HomePrimarySection from "@/components/HomePrimarySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      {/* ১। হেডার: Top Header Banner (public/header.jpeg) */}
      <HeaderBanner />

      {/* নেভিগেশন বার */}
      <NavigationBar />

      {/* ব্রেকিং নিউজ / বিশেষ ঘোষণা */}
      <BreakingNewsBar />

      {/* ২ থেকে ১২ নং সেকশন: প্রধান ব্যানার, স্বাগতম, এক নজরে জামিয়া, লক্ষ্য ও উদ্দেশ্য, শিক্ষা বিভাগসমূহ, পাঠ্যক্রম, ছাত্র প্রশিক্ষণ, নোটিশ, গ্যালারি, ভর্তি আহ্বান ও যোগাযোগ */}
      <main className="w-full flex-1">
        <HomePrimarySection />
      </main>

      {/* ফুটার — ওয়েবসাইটের সর্বশেষ অংশ */}
      <Footer />
    </div>
  );
}
