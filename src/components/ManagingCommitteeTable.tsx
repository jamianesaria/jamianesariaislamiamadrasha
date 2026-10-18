"use client";

import { useState } from "react";
import Image from "next/image";
import { committeeYears, committeeMembersData, CommitteeMember } from "@/data/siteData";
import { Users, Eye, X, Phone, MapPin, Calendar } from "lucide-react";

export default function ManagingCommitteeTable() {
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  const currentMembers = committeeMembersData[selectedYear] || [];

  return (
    <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar matching teal/deep cyan-green from screenshot */}
      <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
        <Users size={18} />
        <span>ম্যানেজিং কমিটি</span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Year Filter Section matching screenshot */}
        <div className="max-w-md">
          <label
            htmlFor="year-select"
            className="block text-xs font-bold text-gray-700 mb-1"
          >
            Year
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs sm:text-sm text-gray-700 bg-white focus:outline-none focus:border-[#126b59] shadow-2xs cursor-pointer"
          >
            <option value="">Please Select year</option>
            {committeeYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Committee Table matching screenshot */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100/90 text-gray-700 border-b border-gray-300 font-bold">
                  <th className="py-2.5 px-3 w-14 text-center">#</th>
                  <th className="py-2.5 px-3 w-24 text-center">ছবি</th>
                  <th className="py-2.5 px-4 text-center">নাম</th>
                  <th className="py-2.5 px-4 text-center">পদবী</th>
                  <th className="py-2.5 px-3 w-28 text-center">দেখুন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentMembers.length > 0 ? (
                  currentMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      className="hover:bg-teal-50/30 transition-colors group"
                    >
                      <td className="py-3 px-3 text-center font-medium text-gray-600">
                        {index + 1}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="relative w-12 h-14 mx-auto rounded overflow-hidden border border-gray-300 bg-gray-100 shadow-2xs">
                          {member.photo ? (
                            <Image
                              src={member.photo}
                              alt={member.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Users size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-gray-900 group-hover:text-[#8B111A] transition-colors">
                        {member.name}
                      </td>

                      <td className="py-3 px-4 text-center text-gray-600 font-medium">
                        {member.designation}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="inline-flex items-center justify-center gap-1 bg-[#371b61] hover:bg-[#251044] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>আরও দেখুন</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 text-xs">
                      নির্বাচিত বছরের জন্য কোনো তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-200">
            <div className="bg-[#126b59] text-white px-4 py-3 flex items-center justify-between font-bold">
              <span>সদস্যের বিস্তারিত তথ্য</span>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-white hover:text-gray-200 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-gray-800">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-24 h-28 rounded overflow-hidden border border-gray-300 shadow-sm shrink-0">
                  {selectedMember.photo && (
                    <Image
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-base sm:text-lg text-[#8B111A]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#126b59] mt-0.5">
                    {selectedMember.designation}
                  </p>
                  {selectedMember.term && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                      <Calendar size={12} />
                      <span>মেয়াদকাল: {selectedMember.term}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-3 text-xs sm:text-sm text-gray-600">
                {selectedMember.mobile && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-[#8B111A]" />
                    <span className="font-semibold text-gray-800">মোবাইল:</span>
                    <span>{selectedMember.mobile}</span>
                  </p>
                )}
                {selectedMember.address && (
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#8B111A]" />
                    <span className="font-semibold text-gray-800">ঠিকানা:</span>
                    <span>{selectedMember.address}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

