import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'client' | 'designer';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'client' | 'designer';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'client' | 'designer';
  }
}
