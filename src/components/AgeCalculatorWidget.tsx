"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export default function AgeCalculatorWidget() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculateAge = (dobString: string) => {
    setBirthDate(dobString);
    if (!dobString) {
      setResult(null);
      return;
    }

    const birth = new Date(dobString);
    const now = new Date();

    if (isNaN(birth.getTime())) return;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult(`${years} বছর ${months} মাস ${days} দিন`);
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header bar matching olive/gold-green */}
      <div className="bg-[#8fae27] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
        <Calculator size={16} />
        <span>বয়স ক্যালকুলেশন</span>
      </div>

      <div className="p-3.5 space-y-2">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => calculateAge(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-[#8fae27]"
        />
        {result && (
          <div className="bg-amber-50 text-amber-900 border border-amber-200 rounded p-2 text-xs font-semibold text-center">
            বয়স: {result}
          </div>
        )}
      </div>
    </div>
  );
}

