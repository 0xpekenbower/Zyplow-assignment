import React from 'react';
import '../styles/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zyplow Assignment',
  description: 'Init the project Structure'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
