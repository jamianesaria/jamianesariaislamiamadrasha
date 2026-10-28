import PageSeo from "@/components/PageSeo";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { getSiteSettings, getNewsTicker } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/contact", {
  title: "যোগাযোগ | জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
  description:
    "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানার সাথে যোগাযোগ করুন - ঠিকানা, হেল্পলাইন নম্বর, সরাসরি মেসেজ পাঠানোর ফরম ও অবস্থান।",
});

async function ContactPage() {
  const [siteData, newsTicker] = await Promise.all([
    getSiteSettings(),
    getNewsTicker(),
  ]);

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner initialSettings={siteData} />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar newsItems={newsTicker} />

      {/* 4. Main Contact Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <PageSeo route="/contact" />
        <ContactSection initialSettings={siteData} />
      </main>

      {/* 5. Footer */}
      <Footer initialSettings={siteData} />
    </div>
  );
}
export default editableRoute("/contact", ContactPage);
