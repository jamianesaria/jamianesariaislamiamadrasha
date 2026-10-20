import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import OrphanageSection from "@/components/OrphanageSection";

export const metadata: Metadata = {
  title: "এতিমখানা ও সহযোগিতা | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া এতিমখানা পরিচিতি, ছাত্রাবাসের চতুর্থ তলা নির্মাণ প্রকল্প, সরকারি নিবন্ধন (ঢ-০৫০৪), সহযোগিতার আবেদন, সাধারণ ও গোরাবা ফান্ড, এবং বিকাশ ও ব্যাংক অনুদান পাঠানোর মাধ্যম।",
};

export default function OrphanagePage() {
  return (
    <div className="min-h-screen bg-[#F4F5F0] flex flex-col">
      <HeaderBanner />
      <NavigationBar />
      <BreakingNewsBar />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 w-full flex-1">
        <OrphanageSection />
      </main>

      <Footer />
    </div>
  );
}

