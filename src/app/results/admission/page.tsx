import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import PublicResultsSection from "@/components/PublicResultsSection";
import { getExamResults } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/results/admission", {
  title: "Admission Test Result | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর নতুন শিক্ষাবর্ষের ভর্তি পরীক্ষার ফলাফল এবং নির্বাচিত শিক্ষার্থীদের তালিকা।",
});

async function AdmissionResultPage() {
  const records = (await getExamResults());
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Admission Result Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <PageSeo route="/results/admission" />
        <PublicResultsSection records={records} admission />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
export default editableRoute("/results/admission", AdmissionResultPage);

