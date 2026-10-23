import { stegaClean } from "@sanity/client/stega";
import { editableRoute, editableMetadata } from "@/content/server";
import HeaderBanner from "@/components/HeaderBanner";
import NavigationBar from "@/components/NavigationBar";
import BreakingNewsBar from "@/components/BreakingNewsBar";
import Footer from "@/components/Footer";
import HolidayListTable from "@/components/HolidayListTable";
import { getCalendar } from "@/sanity/lib/queries";

export const generateMetadata = editableMetadata("/functions/holiday", {
  title: "ছুটির তালিকা (Holiday List) | জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী",
  description: "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গীর বাৎসরিক ছুটির তালিকা ও সময়সূচী।",
});

async function HolidayPage() {
  const records = (await getCalendar()).filter((record) => stegaClean(record.kind) === "holiday").map((record, index) => ({ ...record, _type: "calendarEvent", id: index + 1, title: record.title, dateTime: record.dateBn || record.date, description: record.description }));
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* 1. Top Identity Banner */}
      <HeaderBanner />

      {/* 2. Main Navigation Bar */}
      <NavigationBar />

      {/* 3. Breaking News / Notice Ticker Bar */}
      <BreakingNewsBar />

      {/* 4. Main Holiday List Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 w-full flex-1">
        <HolidayListTable records={records} />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
export default editableRoute("/functions/holiday", HolidayPage);

