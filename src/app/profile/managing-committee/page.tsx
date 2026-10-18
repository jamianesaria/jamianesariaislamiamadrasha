import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ManagingCommitteeTable from "@/components/ManagingCommitteeTable";

export const metadata: Metadata = {
  title: "Managing Committe | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর সম্মানিত ম্যানেজিং কমিটির সদস্যদের তালিকা ও পরিচালনা পর্ষদ।",
};

export default function ManagingCommitteePage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Managing Committee Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <ManagingCommitteeTable />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

