import { NextRequest, NextResponse } from "next/server";
import { getHeat, recordRequest } from "@/lib/heat";

export async function GET(_req: NextRequest, { params }: { params: { clientId: string } }) {
  const data = getHeat(params.clientId);
  return NextResponse.json(data);
}

export async function POST(_req: NextRequest, { params }: { params: { clientId: string } }) {
  const result = recordRequest(params.clientId);
  const status = result.blocked ? 429 : 200;
  return NextResponse.json(result.data, { status });
}
