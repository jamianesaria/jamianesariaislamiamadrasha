"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function TimeDateWidget() {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      const day = now.getDate();
      const monthName = MONTHS[now.getMonth()];
      const dayName = DAYS[now.getDay()];
      setDateStr(`${monthName} ${getOrdinal(day)}, ${dayName}.`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header bar matching olive/gold-green */}
      <div className="bg-[#8fae27] text-white px-3.5 py-2 font-bold text-sm sm:text-base flex items-center gap-2 shadow-xs">
        <Clock size={16} />
        <span>সময় ও তারিখ</span>
      </div>

      {/* Clock display */}
      <div className="p-4 text-center">
        <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-wider font-mono">
          {time || "00:00"}
        </div>
        <div className="text-sm font-semibold text-gray-600 mt-1">
          {dateStr || "Loading..."}
        </div>
      </div>
    </div>
  );
}
