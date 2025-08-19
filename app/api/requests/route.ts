import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId") || undefined;
  const designerId = searchParams.get("designerId") || undefined;
  const status = searchParams.get("status") || undefined;

  const where: any = {};
  if (clientId) where.clientId = clientId;
  if (designerId) where.designerId = designerId;
  if (status === "active") {
    where.NOT = { status: "completed" };
  } else if (status) {
    where.status = status;
  }

  const requests = await prisma.designRequest.findMany({ where });
  const serialized = requests.map((r) => ({
    ...r,
    deadline: r.deadline.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));

  return NextResponse.json(serialized);
}
