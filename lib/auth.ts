export type UserRole = 'client' | 'designer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Mock user data for demo purposes
const MOCK_USERS: User[] = [
  {
    id: 'client1',
    name: 'John Doe',
    email: 'client@example.com',
    role: 'client'
  },
  {
    id: 'designer1', 
    name: 'Jane Smith',
    email: 'designer@example.com',
    role: 'designer'
  }
];

export class AuthService {
  private static readonly STORAGE_KEY = 'auth_user';

  static async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store user in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    
    return user;
  }

  static async signup(name: string, email: string, password: string, role: UserRole): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${role}${Date.now()}`,
      name,
      email,
      role
    };
    
    // In a real app, you'd save to database
    MOCK_USERS.push(newUser);
    
    // Store user in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser));
    }
    
    return newUser;
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') {
      return null;
    }
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return null;
    }
    
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
