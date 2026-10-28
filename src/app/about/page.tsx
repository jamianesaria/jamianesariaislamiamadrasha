import PageSeo from "@/components/PageSeo";
import { EditablePage, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import AboutJamiaSection from "@/components/AboutJamiaSection";
import { getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/about", {
  title: "জামিয়া পরিচিতি | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার পরিচয়, প্রতিষ্ঠাকাল ও ইতিহাস, জমিদাতাদের অবদান, লক্ষ্য ও উদ্দেশ্য, শিক্ষাদর্শন, বৈশিষ্ট্য এবং সরকারি ও শিক্ষা বোর্ড নিবন্ধন পরিচিতি।",
});

export default async function AboutPage() {
  const [siteData, newsTicker] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
  ]);

  return (
    <EditablePage route="/about"><div className="min-h-screen bg-[#F4F5F0] flex flex-col">
      <HeaderBanner initialSettings={siteData} />
      <NavigationBar />
      <BreakingNewsBar newsItems={newsTicker} />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <PageSeo route="/about" />
        <AboutJamiaSection />
      </main>

      <Footer initialSettings={siteData} />
    </div></EditablePage>
  );
}
