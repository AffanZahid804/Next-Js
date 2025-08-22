'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import AuthLayout from '@/components/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const router = useRouter();
  const { login, isAuthenticated, checkAuthStatus } = useAuthStore();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #d8b4fe 0%, #fbbf24 50%, #f3e8ff 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{
            color: 'white',
            fontSize: '1.125rem',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred during login. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes and clear errors
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev: { email?: string; password?: string; general?: string }) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev: { email?: string; password?: string; general?: string }) => ({ ...prev, password: undefined }));
    }
  };

  // Check if form is valid for button state
  const isFormValid = email && password && validateEmail(email);

  return (
    <AuthLayout redirectToDashboard={true}>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d8b4fe 0%, #fbbf24 50%, #f3e8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Left side - Login Form */}
          <div style={{ paddingRight: '3rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '300',
                color: '#1f2937',
                lineHeight: '1.2',
                marginBottom: '1rem'
              }}>
                Welcome back
              </h1>
              <p style={{
                color: '#4b5563',
                fontSize: '1.125rem',
                maxWidth: '400px'
              }}>
                Step into our shopping metaverse for an unforgettable shopping experience
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
              {/* General Error Display */}
              {errors.general && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  color: '#dc2626',
                  fontSize: '0.875rem'
                }}>
                  {errors.general}
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.email ? '#dc2626' : '#9ca3af',
                    height: '1.25rem',
                    width: '1.25rem'
                  }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      height: '3.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: `1px solid ${errors.email ? '#dc2626' : '#e5e7eb'}`,
                      borderRadius: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                {errors.email && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginLeft: '0.5rem'
                  }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.password ? '#dc2626' : '#9ca3af',
                    height: '1.25rem',
                    width: '1.25rem'
                  }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      paddingLeft: '3rem',
                      height: '3.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: `1px solid ${errors.password ? '#dc2626' : '#e5e7eb'}`,
                      borderRadius: '0.75rem',
                      color: '#374151',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                {errors.password && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginLeft: '0.5rem'
                  }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={!isFormValid || isLoading}
                style={{
                  width: '100%',
                  height: '3.5rem',
                  backgroundColor: isFormValid && !isLoading ? '#9333ea' : '#9ca3af',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '0.75rem',
                  fontSize: '1.125rem',
                  border: 'none',
                  cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
                  opacity: isFormValid && !isLoading ? 1 : 0.6
                }}
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </button>

              <p style={{ textAlign: 'center', color: '#4b5563', marginTop: '1rem' }}>
                Don't have an account?{" "}
                <button 
                  type="button"
                  style={{
                    color: '#9333ea',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>

          {/* Right side - 3D Graphic and Logo */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem'
          }}>
            {/* 3D Twisted Ribbon */}
            <div style={{ width: '320px', height: '320px' }}>
              <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="30%" stopColor="#A855F7" />
                    <stop offset="60%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  <linearGradient id="ribbonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>

                {/* Main twisted ribbon shape */}
                <path
                  d="M100 200 Q150 100 200 150 Q250 200 300 100 Q350 150 320 200 Q290 250 240 220 Q190 190 140 280 Q90 230 100 200 Z"
                  fill="url(#ribbonGradient)"
                  opacity="0.9"
                />

                {/* Secondary ribbon layer */}
                <path
                  d="M120 180 Q170 120 220 170 Q270 220 320 120 Q370 170 340 220 Q310 270 260 240 Q210 210 160 300 Q110 250 120 180 Z"
                  fill="url(#ribbonGradient2)"
                  opacity="0.7"
                />

                {/* Additional ribbon strands */}
                <path
                  d="M80 220 Q130 140 180 190 Q230 240 280 140 Q330 190 300 240 Q270 290 220 260 Q170 230 120 320 Q70 270 80 220 Z"
                  fill="url(#ribbonGradient)"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* meetus VR Logo */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '300',
                color: '#1f2937',
                letterSpacing: '0.05em'
              }}>
                meetus<span style={{ fontSize: '0.75rem', verticalAlign: 'super', fontWeight: '400' }}>VR</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}