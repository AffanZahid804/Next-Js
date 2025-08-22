'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
  redirectToDashboard,
}: {
  children?: React.ReactNode;
  redirectToDashboard?: boolean;
}) {
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // If we want to redirect to dashboard when authenticated (for login page)
  // or redirect to login when not authenticated (for protected pages)
  useEffect(() => {
    if (redirectToDashboard && isAuthenticated) {
      router.push('/dashboard');
    } else if (redirectToDashboard === false && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, redirectToDashboard, router]);

  return <>{children}</>;
}