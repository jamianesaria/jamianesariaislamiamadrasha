import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import BadriKafilaSection from "@/components/BadriKafilaSection";
import { getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/badri-kafila", {
  title: "৩১৩ জন বদরি কাফেলা | আজীবন দাতা সদস্য প্রকল্প | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার সার্বিক উন্নয়ন ও দ্বীনি শিক্ষার অগ্রযাত্রায় ‘৩১৩ জন বদরি কাফেলা’ আজীবন দাতা সদস্য প্রকল্প। ৩১৩ সংখ্যার বরকতময় রহস্য, বার্ষিক অনুদান ও অনলাইন সদস্য আবেদন।",
});

async function BadriKafilaPage() {
  const [siteData, newsTicker] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
  ]);

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex flex-col">
      {/* 1. Header Banner */}
      <HeaderBanner initialSettings={siteData} />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News Ticker */}
      <BreakingNewsBar newsItems={newsTicker} />

      {/* 4. Main 313 Badri Kafila Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 w-full flex-1">
        <PageSeo route="/badri-kafila" />
        <BadriKafilaSection />
      </main>

      {/* 5. Footer */}
      <Footer initialSettings={siteData} />
    </div>
  );
}
export default editableRoute("/badri-kafila", BadriKafilaPage);
