"use client";

import { useState } from "react";

import { eventListTableData as _fallback_eventListTableData, EventItem } from "@/data/siteData";
import { Calendar, Eye, MapPin, X, Clock } from "lucide-react";
import { EditableImage as Image, useEditableData, EditableText } from "@/content/client";
import { fieldSource } from "@/content/model";


export default function EventListTable({ records }: { records?: EventItem[] }) {
  const eventListTableData = useEditableData("copy.data.eventListTableData", _fallback_eventListTableData);

  const events = records ?? eventListTableData;
  const [selectedEventRecord, setSelectedEvent] = useState<EventItem | null>(null);
  const selectedEvent = selectedEventRecord ? events.find(event => event.id === selectedEventRecord.id) ?? null : null;

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Table Header Bar - matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Calendar size={18} />
        <span><EditableText document="copy.ui.EventListTable" entry="e1lk195y" fallback={"Event list"} /></span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100/90 text-gray-700 border-b border-gray-300 font-bold">
              <th className="py-2.5 px-3 w-12 text-center"><EditableText document="copy.ui.EventListTable" entry="emqlpgp" fallback={"#"} /></th>
              <th className="py-2.5 px-3 w-24 sm:w-28 text-center"><EditableText document="copy.ui.EventListTable" entry="e1vto9yz" fallback={"Photo"} /></th>
              <th className="py-2.5 px-4"><EditableText document="copy.ui.EventListTable" entry="e1w35wkb" fallback={"Event name"} /></th>
              <th className="py-2.5 px-4 w-44"><EditableText document="copy.ui.EventListTable" entry="e1156pwu" fallback={"Date and time"} /></th>
              <th className="py-2.5 px-3 w-20 text-center"><EditableText document="copy.ui.EventListTable" entry="e25q7et" fallback={"View"} /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr
                key={event.id}
                className="hover:bg-teal-50/40 transition-colors group"
              >
                {/* 1. Index # */}
                <td className="py-3 px-3 text-center font-medium text-gray-600">
                  {index + 1}
                </td>

                {/* 2. Photo */}
                <td className="py-3 px-3 text-center">
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 mx-auto rounded overflow-hidden border border-gray-200 bg-gray-50 shadow-2xs">
                    {event.photo ? (
                      <Image document="copy.ui.EventListTable" entry="ejx2d9h" source={fieldSource(event, "photo")}
                        src={event.photo}
                        alt={event.eventName}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100"><EditableText document="copy.ui.EventListTable" entry="e13buu2m" fallback={"No Image"} /></div>
                    )}
                  </div>
                </td>

                {/* 3. Event Name */}
                <td className="py-3 px-4">
                  <p className="font-semibold text-gray-900 group-hover:text-[#8B111A] transition-colors leading-snug">
                    {event.eventName}
                  </p>
                  {event.venue && (
                    <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin size={11} className="text-[#8B111A]" />
                      <span>{event.venue}</span>
                    </p>
                  )}
                </td>

                {/* 4. Date and Time */}
                <td className="py-3 px-4 text-gray-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gray-400 shrink-0" />
                    <span>{event.dateTime}</span>
                  </div>
                </td>

                {/* 5. View Button */}
                <td className="py-3 px-3 text-center">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="inline-flex items-center justify-center gap-1 bg-[#126b59] hover:bg-[#0c4c3f] text-white text-xs px-2.5 py-1 rounded transition-colors shadow-2xs cursor-pointer"
                    title="View details"
                  >
                    <Eye size={13} />
                    <span><EditableText document="copy.ui.EventListTable" entry="e1nmjww9" fallback={"View"} /></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Details Modal Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between font-bold">
              <span><EditableText document="copy.ui.EventListTable" entry="etaql94" fallback={"ইভেন্টের বিস্তারিত তথ্য"} /></span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-sm text-gray-800">
              {selectedEvent.photo && (
                <div className="relative w-full h-48 rounded overflow-hidden border border-gray-200">
                  <Image document="copy.ui.EventListTable" entry="e1s5hb9k" source={fieldSource(selectedEvent, "photo")}
                    src={selectedEvent.photo}
                    alt={selectedEvent.eventName}
                    fill
                    sizes="500px"
                    className="object-cover"
                  />
                </div>
              )}

              <div>
                <h3 className="font-bold text-base sm:text-lg text-[#8B111A] leading-snug">
                  {selectedEvent.eventName}
                </h3>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm text-gray-600 border-y border-gray-200 py-3">
                <p className="flex items-center gap-2">
                  <Clock size={14} className="text-[#126b59]" />
                  <span className="font-semibold text-gray-800"><EditableText document="copy.ui.EventListTable" entry="e13oy4bn" fallback={"সময়:"} /></span>
                  <span>{selectedEvent.dateTime}</span>
                </p>
                {selectedEvent.venue && (
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#8B111A]" />
                    <span className="font-semibold text-gray-800"><EditableText document="copy.ui.EventListTable" entry="e1cp8cgf" fallback={"স্থান:"} /></span>
                    <span>{selectedEvent.venue}</span>
                  </p>
                )}
              </div>

              {selectedEvent.description && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {selectedEvent.description}
                </p>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded transition-colors"
                ><EditableText document="copy.ui.EventListTable" entry="e622s2n" fallback={"বন্ধ করুন"} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

