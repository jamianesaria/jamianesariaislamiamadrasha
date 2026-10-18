import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ApplyOnlineForm from "@/components/ApplyOnlineForm";

export const metadata: Metadata = {
  title: "Online Admission Registration | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীতে অনলাইনে ভর্তির আবেদন ফরম (Online Registration)।",
};

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Online Registration Form Content Area */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <ApplyOnlineForm />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

