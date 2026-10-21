import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import HomePrimarySection from "@/components/HomePrimarySection";
import Footer from "@/components/Footer";
import {
  getHomepageContent,
  getNotices,
  getSiteSettings,
  getAcademicDepartments,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [homeData, notices, siteData, departments] = await Promise.all([
    getHomepageContent(),
    getNotices(),
    getSiteSettings(),
    getAcademicDepartments({ homepageOnly: true }),
  ]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      {/* ১। হেডার: Top Header Banner */}
      <HeaderBanner initialSettings={siteData} />

      {/* নেভিগেশন বার */}
      <NavigationBar />

      {/* ব্রেকিং নিউজ / বিশেষ ঘোষণা (Sanity CMS Live Data) */}
      <BreakingNewsBar newsItems={homeData?.newsTicker} />

      {/* ২ থেকে ১২ নং সেকশন */}
      <main className="w-full flex-1">
        <HomePrimarySection
          initialData={homeData}
          initialSettings={siteData}
          initialNotices={notices}
          initialDepartments={departments}
        />
      </main>

      {/* ফুটার */}
      <Footer initialSettings={siteData} initialData={homeData} />
    </div>
  );
}
