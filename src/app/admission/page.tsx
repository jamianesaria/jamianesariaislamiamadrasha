import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import AdmissionInfoSection from "@/components/AdmissionInfoSection";
import { getSiteSettings, getNewsTicker, getAdmissionInfo } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/admission", {
  title: "ভর্তি তথ্য, নিয়মাবলি ও ভর্তি নির্দেশিকা | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার নতুন শিক্ষাবর্ষের ভর্তি তথ্য, বিভাগভিত্তিক যোগ্যতা, বয়সসীমা, ভর্তি ফি ও মাসিক খরচ তালিকা, প্রয়োজনীয় কাগজপত্র ও ভর্তি নির্দেশিকা।",
});

async function AdmissionPage() {
  const [siteData, newsTicker, admissionData] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
    getAdmissionInfo(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner initialSettings={siteData} />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar newsItems={newsTicker} />

      {/* 4. Main Admission Information Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 w-full flex-1">
        <PageSeo route="/admission" />
        <AdmissionInfoSection initialAdmissionData={admissionData} />
      </main>

      {/* 5. Footer */}
      <Footer initialSettings={siteData} />
    </div>
  );
}
export default editableRoute("/admission", AdmissionPage);
