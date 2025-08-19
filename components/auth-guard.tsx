"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/lib/auth';
import { PageLoadingSpinner } from './loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function AuthGuard({ children, requiredRole, redirectTo = '/auth/login' }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        // Redirect to appropriate dashboard if wrong role
        const dashboardPath = user?.role === 'client' ? '/client/dashboard' : '/designer/dashboard';
        router.push(dashboardPath);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router, redirectTo]);

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null; // Router redirect will handle this
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null; // Router redirect will handle this
  }

  return <>{children}</>;
}
