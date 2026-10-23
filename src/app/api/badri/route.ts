import { NextRequest } from "next/server";
import { receiveSubmission } from "@/lib/submissions/server";

export function POST(request: NextRequest) { return receiveSubmission(request, "badri"); }
