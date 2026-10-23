import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ClassRoutineSection from "@/components/ClassRoutineSection";
import { getClassRoutines } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/functions/class-routine", {
  title: "ক্লাস রুটিন (Class Routine) | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর সকল শ্রেণির ক্লাস রুটিন ও সময়সূচী।",
});

async function ClassRoutinePage() {
  const records = await getClassRoutines();
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Class Routine Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <ClassRoutineSection records={records} />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
export default editableRoute("/functions/class-routine", ClassRoutinePage);

