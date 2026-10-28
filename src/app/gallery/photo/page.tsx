import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import PhotoGallerySection from "@/components/PhotoGallerySection";

export const generateMetadata = editableMetadata("/gallery/photo", {
  title: "Photo Gallery | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর ফটো গ্যালারি - মাদ্রাসা ক্যাম্পাস, অনুষ্ঠান, পাঠদান ও বিভিন্ন কার্যক্রমের স্থিরচিত্র।",
});

function PhotoGalleryPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Photo Gallery Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <PageSeo route="/gallery/photo" />
        <PhotoGallerySection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
export default editableRoute("/gallery/photo", PhotoGalleryPage);

