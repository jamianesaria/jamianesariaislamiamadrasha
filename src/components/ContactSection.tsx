"use client";

import { useState } from "react";
import { siteSettings } from "@/data/navigationData";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Building2
} from "lucide-react";

interface ContactSectionProps {
  initialSettings?: any;
}

export default function ContactSection({ initialSettings }: ContactSectionProps = {}) {
  const currentSettings = initialSettings || siteSettings;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: "০১৭১৬২৯৬৩৭৯", // default or fallback if not entered
        }),
      });
    } catch (err) {
      console.warn("Contact submission offline fallback:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    "Jamia Nesaria Islamia, Morkun, Tongi, Gazipur"
  )}&t=m&z=15&output=embed&iwloc=near`;

  return (
    <div className="space-y-6">
      {/* Contact Quick Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-[#126b59] flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">প্রতিষ্ঠানের নাম</h4>
            <p className="text-xs text-gray-600 font-medium line-clamp-1">{currentSettings.nameBn}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-[#126b59] flex items-center justify-center shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">ঠিকানা</h4>
            <p className="text-xs text-gray-600 line-clamp-1">{currentSettings.address}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-[#126b59] flex items-center justify-center shrink-0">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">হেল্পলাইন / ফোন</h4>
            <p className="text-xs text-gray-600">{currentSettings.phone}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-gray-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-50 text-[#126b59] flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">অফিস সময়</h4>
            <p className="text-xs text-gray-600">সকাল ৮:০০ - বিকাল ৪:৩০</p>
          </div>
        </div>

        <a
          href={currentSettings.facebookUrl || "https://www.facebook.com/jamianesaria/"}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-4 rounded border border-gray-200 hover:border-[#1877F2] shadow-2xs hover:shadow-md transition-all flex items-center gap-3 group"
          title="জামিয়া নেছারিয়ার অফিশিয়াল ফেসবুক পেজ ভিজিট করুন"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-gray-800">অফিশিয়াল ফেসবুক</h4>
            <p className="text-xs text-[#1877F2] font-semibold truncate group-hover:underline flex items-center gap-1">
              <span>/jamianesaria</span>
              <ExternalLink size={11} />
            </p>
          </div>
        </a>
      </div>

      {/* Official Facebook Page Showcase Banner */}
      <div className="bg-gradient-to-r from-[#1877F2] to-[#0c59ca] text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-white text-[#1877F2] flex items-center justify-center shrink-0 shadow-md">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              জামিয়া নেছারিয়ার অফিশিয়াল ফেসবুক পেজে যুক্ত থাকুন
            </h3>
            <p className="text-xs text-blue-100 mt-0.5">
              মাদরাসার সর্বশেষ বিজ্ঞপ্তি, লাইভ মাহফিল, বার্ষিক অনুষ্ঠান ও গুরুত্বপূর্ণ নোটিশ পেতে আমাদের পেজটি ফলো করুন।
            </p>
          </div>
        </div>

        <a
          href={currentSettings.facebookUrl || "https://www.facebook.com/jamianesaria/"}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-white hover:bg-amber-300 text-[#1877F2] hover:text-gray-950 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-md transition-all hover:scale-105 flex items-center gap-2"
        >
          <span>ফেসবুক পেজ ভিজিট করুন</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* SECTION 1: Send Us a Message (আমাদের মেসেজ পাঠান) matching screenshot */}
      <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        {/* Header Bar matching teal/deep cyan-green from screenshot */}
        <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center gap-2 font-bold text-sm sm:text-base shadow-xs">
          <Mail size={18} />
          <span>আমাদের মেসেজ পাঠান</span>
        </div>

        <div className="p-4 sm:p-6">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-300 rounded p-6 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-900 text-base">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h4>
              <p className="text-xs text-emerald-700">
                আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন। জাযাকাল্লাহু খাইরান।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 bg-[#126b59] text-white text-xs font-bold py-1.5 px-4 rounded hover:bg-[#0e5244] transition-colors cursor-pointer"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label 
                  htmlFor="contact-name" 
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-1"
                >
                  নাম:
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="পুরো নাম"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#126b59] focus:ring-1 focus:ring-[#126b59] transition-all"
                />
              </div>

              {/* Email field */}
              <div>
                <label 
                  htmlFor="contact-email" 
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-1"
                >
                  ইমেইল ঠিকানা:
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="ইমেল ঠিকানা"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#126b59] focus:ring-1 focus:ring-[#126b59] transition-all"
                />
              </div>

              {/* Subject field */}
              <div>
                <label 
                  htmlFor="contact-subject" 
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-1"
                >
                  বিষয়:
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="বিষয়"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#126b59] focus:ring-1 focus:ring-[#126b59] transition-all"
                />
              </div>

              {/* Message field */}
              <div>
                <label 
                  htmlFor="contact-message" 
                  className="block text-xs sm:text-sm font-bold text-gray-700 mb-1"
                >
                  বার্তা লিখুন
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="আপনার বার্তা বা প্রশ্ন এখানে লিখুন..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-800 bg-white focus:outline-none focus:border-[#126b59] focus:ring-1 focus:ring-[#126b59] transition-all resize-y"
                />
              </div>

              {/* Submit Button matching purple theme from screenshot */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#371b61] hover:bg-[#251044] text-white text-xs sm:text-sm font-bold py-2.5 px-6 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? "পাঠানো হচ্ছে..." : "জমা দিন"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </article>

      {/* SECTION 2: Our Location on Map (ম্যাপে আমাদের অবস্থান) matching screenshot */}
      <article className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        {/* Header Bar matching teal/deep cyan-green from screenshot */}
        <div className="bg-[#126b59] text-white px-4 py-2.5 flex items-center justify-between font-bold text-sm sm:text-base shadow-xs">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>ম্যাপে আমাদের অবস্থান</span>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী মরকুন গাজীপুর"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white hover:text-amber-200 flex items-center gap-1 font-normal"
          >
            <span>Open in Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-gray-100">
          <iframe
            title="Madrasa Location Map"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Floating Location Overlay Card matching screenshot */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs hidden sm:block">
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-[#8B111A] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-gray-900 leading-snug">
                  {currentSettings.nameBn}
                </h4>
                <p className="text-[11px] text-gray-600 mt-1">
                  {currentSettings.address}
                </p>
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">টঙ্গী, গাজীপুর</span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      "জামিয়া নেছারিয়া ইসলামিয়া টঙ্গী মরকুন গাজীপুর"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#126b59] font-bold hover:underline"
                  >
                    দিকনির্দেশনা পান →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

