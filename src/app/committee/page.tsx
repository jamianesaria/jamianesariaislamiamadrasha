import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ManagingCommitteeSection from "@/components/ManagingCommitteeSection";
import { getCommitteeMembers, getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "পরিচালনা পরিষদ ও জমিদাতাবৃন্দ | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার সম্মানিত পরিচালনা পরিষদ (সভাপতি, মুতাওয়াল্লী ও সদস্যবৃন্দ) এবং প্রতিষ্ঠাতা জমিদাতাগণের পূর্ণাঙ্গ পরিচিতি।",
};

export default async function ManagingCommitteePage() {
  const [committee, siteData, newsTicker] = await Promise.all([
    getCommitteeMembers(),
    getSiteSettings(),
    getNewsTicker(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      <HeaderBanner initialSettings={siteData} />
      <NavigationBar />
      <BreakingNewsBar newsItems={newsTicker} />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <ManagingCommitteeSection initialMembers={committee} initialSettings={siteData} />
      </main>

      <Footer initialSettings={siteData} />
    </div>
  );
}
