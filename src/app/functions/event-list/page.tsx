import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import EventListTable from "@/components/EventListTable";

export const metadata: Metadata = {
  title: "Event List | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর সকল সাম্প্রতিক এবং আসন্ন ইভেন্টের তালিকা।",
};

export default function EventListPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar with FUNCTIONS Dropdown */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Event List Content Area (Full width container matching screenshot) */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <EventListTable />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

