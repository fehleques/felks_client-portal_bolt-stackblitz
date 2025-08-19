import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import type { ApiResponse, DesignRequest } from '@/types';

// In-memory store for design requests
const requests: DesignRequest[] = [];

// Zod schemas for validation
const RequestCategoryEnum = z.enum([
  'Logo Design',
  'Web Design',
  'Social Media Graphics',
  'Print Design',
  'Brand Identity',
  'UI/UX Design',
  'Illustrations',
  'Packaging Design',
  'Other',
]);

const RequestStatusEnum = z.enum([
  'pending',
  'in_progress',
  'completed',
  'revision',
  'cancelled',
]);

const RequestPriorityEnum = z.enum(['low', 'medium', 'high', 'urgent']);

const createSchema = z.object({
  clientId: z.string(),
  title: z.string(),
  description: z.string(),
  category: RequestCategoryEnum,
  priority: RequestPriorityEnum,
  deadline: z.string(),
});

const updateSchema = createSchema
  .partial()
  .extend({ id: z.string(), status: RequestStatusEnum.optional(), designerId: z.string().optional() });

const deleteSchema = z.object({ id: z.string() });

const roleSchema = z.enum(['client', 'designer']);

function getRole(req: NextRequest) {
  const role = req.headers.get('x-user-role');
  if (!role) return null;
  const parsed = roleSchema.safeParse(role);
  return parsed.success ? parsed.data : null;
}

export async function GET(req: NextRequest) {
  const role = getRole(req);
  if (!role) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json<ApiResponse<DesignRequest[]>>({ success: true, data: requests });
}

export async function POST(req: NextRequest) {
  const role = getRole(req);
  if (role !== 'client') {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
  const now = new Date().toISOString();
  const newRequest: DesignRequest = {
    id: randomUUID(),
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    ...parsed.data,
  };
  requests.push(newRequest);
  return NextResponse.json<ApiResponse<DesignRequest>>({ success: true, data: newRequest }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const role = getRole(req);
  if (role !== 'designer') {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const json = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
  const index = requests.findIndex((r) => r.id === parsed.data.id);
  if (index === -1) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Not found' }, { status: 404 });
  }
  const updated: DesignRequest = {
    ...requests[index],
    ...parsed.data,
    updatedAt: new Date().toISOString(),
  };
  requests[index] = updated;
  return NextResponse.json<ApiResponse<DesignRequest>>({ success: true, data: updated });
}

export async function DELETE(req: NextRequest) {
  const role = getRole(req);
  if (role !== 'designer') {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const json = await req.json().catch(() => null);
  const parsed = deleteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
  const index = requests.findIndex((r) => r.id === parsed.data.id);
  if (index === -1) {
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'Not found' }, { status: 404 });
  }
  const [removed] = requests.splice(index, 1);
  return NextResponse.json<ApiResponse<{ id: string }>>({ success: true, data: { id: removed.id } });
}

