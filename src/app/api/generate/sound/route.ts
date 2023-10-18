import { generateSound } from "@/helpers/generateSound";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { caption } = await req.json();

  const output = await generateSound(caption);
  console.log(output);

  return NextResponse.json({ output });
}
