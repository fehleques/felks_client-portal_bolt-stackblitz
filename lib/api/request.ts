import { DesignRequest } from '@/types';

export async function fetchRequests(): Promise<DesignRequest[]> {
  const res = await fetch('/api/requests');
  if (!res.ok) {
    throw new Error('Failed to fetch requests');
  }
  return res.json();
}

export async function createRequest(data: Partial<DesignRequest>): Promise<DesignRequest> {
  const res = await fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create request');
  }
  return res.json();
}
