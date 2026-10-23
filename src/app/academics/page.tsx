import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import AcademicsPageSection from "@/components/AcademicsPageSection";
import { getSiteSettings, getNewsTicker, getAcademicDepartments } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/academics", {
  title: "শিক্ষা বিভাগ ও পাঠ্যক্রম | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার মক্তব, হিফজ, হিফজ রিভিশন, কিতাব ও মাদানি নেসাব বিভাগ, পূর্ণাঙ্গ সিলেবাস, ছাত্র প্রশিক্ষণ এবং ভবিষ্যৎ শিক্ষা পরিকল্পনা।",
});

async function AcademicsPage() {
  const [siteData, newsTicker, departments] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
    getAcademicDepartments(),
  ]);

  return (
    <div className="min-h-screen bg-[#F4F5F0] flex flex-col">
      <HeaderBanner initialSettings={siteData} />
      <NavigationBar />
      <BreakingNewsBar newsItems={newsTicker} />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <AcademicsPageSection initialDepartments={departments} />
      </main>

      <Footer initialSettings={siteData} />
    </div>
  );
}
export default editableRoute("/academics", AcademicsPage);
