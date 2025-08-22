import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Login Dashboard App',
  description: 'A login form with dashboard implementation',
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}