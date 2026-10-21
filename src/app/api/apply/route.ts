import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.studentName || !body.fatherName || !body.fatherMobile) {
      return NextResponse.json(
        { success: false, message: "প্রয়োজনীয় তথ্যগুলো সঠিকভাবে পূরণ করুন।" },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicationId = `JNI-2026-${randomSuffix}`;

    const doc = {
      _type: "admissionApplication",
      applicationId,
      studentName: body.studentName,
      admissionClass: body.admissionClass || "সাধারণ",
      residentialStatus: body.residentialStatus || "অনাবাসিক",
      status: "pending",
      dateOfBirth: body.dateOfBirth || "",
      birthCertificateNumber: body.birthCertificateNumber || "",
      fatherName: body.fatherName,
      fatherMobile: body.fatherMobile,
      fatherNid: body.fatherNid || "",
      motherName: body.motherName || "",
      presentAddress: body.presentAddress || "",
      permanentAddress: body.permanentAddress || "",
      submittedAt: new Date().toISOString(),
    };

    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create(doc);
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: "আপনার ভর্তি আবেদনটি সফলভাবে গৃহীত ও সংরক্ষিত হয়েছে।",
    });
  } catch (err: any) {
    console.error("Admission form submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "সার্ভারে ত্রুটি দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
      },
      { status: 500 }
    );
  }
}

