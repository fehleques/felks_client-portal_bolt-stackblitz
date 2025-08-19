import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const metric = await prisma.thermometerMetric.findUnique({ where: { userId } });
  if (!metric) {
    return NextResponse.json(null);
  }
  return NextResponse.json({
    ...metric,
    cooldownDate: metric.cooldownDate?.toISOString() ?? null,
  });
}
