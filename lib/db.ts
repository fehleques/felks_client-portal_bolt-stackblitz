import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID, createHash } from 'crypto';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  role: 'client' | 'designer';
}

const dataFile = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<UserRecord[]> {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data) as UserRecord[];
  } catch {
    return [];
  }
}

async function writeUsers(users: UserRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2), 'utf8');
}

export async function findUserByEmail(email: string): Promise<UserRecord | undefined> {
  const users = await readUsers();
  return users.find(u => u.email === email);
}

export async function createUser(user: Omit<UserRecord, 'id' | 'password'> & { password: string }): Promise<UserRecord> {
  const users = await readUsers();
  const record: UserRecord = { id: randomUUID(), ...user };
  users.push(record);
  await writeUsers(users);
  return record;
}

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
