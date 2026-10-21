import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, message: "নাম, মোবাইল নম্বর ও বার্তা আবশ্যক।" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "contactMessage",
      name: body.name,
      phone: body.phone,
      email: body.email || "",
      subject: body.subject || "সাধারণ যোগাযোগ",
      message: body.message,
      isRead: false,
      receivedAt: new Date().toISOString(),
    };

    if (process.env.SANITY_API_TOKEN) {
      await writeClient.create(doc);
    }

    return NextResponse.json({
      success: true,
      message: "আপনার বার্তাটি মাদরাসা কর্তৃপক্ষের নিকট সফলভাবে পাঠানো হয়েছে।",
    });
  } catch (err: any) {
    console.error("Contact message error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি ফোন করুন।",
      },
      { status: 500 }
    );
  }
}

