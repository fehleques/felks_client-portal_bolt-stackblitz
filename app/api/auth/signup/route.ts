import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, hashPassword } from '@/lib/db';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
  await createUser({ name, email, password: hashPassword(password), role: 'client' });
  return NextResponse.json({ ok: true });
}
