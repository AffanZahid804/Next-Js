'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '2rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Welcome back, {user.name}! 👋
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem'
          }}>
            You're successfully logged into your account.
          </p>
        </div>

        {/* User Information */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #f59e0b'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '0.5rem'
            }}>
              User ID
            </h3>
            <p style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#78350f'
            }}>
              {user.id}
            </p>
          </div>

          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '0.5rem'
            }}>
              User Name
            </h3>
            <p style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1e3a8a'
            }}>
              {user.name}
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div style={{
          backgroundColor: '#dcfce7',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #22c55e'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '0.5rem'
          }}>
            Account Status
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#22c55e',
              borderRadius: '50%'
            }}></div>
            <span style={{
              color: '#166534',
              fontWeight: '500'
            }}>
              Active and Authenticated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}