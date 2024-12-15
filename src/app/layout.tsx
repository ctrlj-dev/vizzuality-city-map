import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Cycle Map',
  description:
    'Discover bike networks around the world. Plan your routes and explore cycling paths with ease.',
  openGraph: {
    title: 'Cycle Map - Worldwide Bike Networks',
    description:
      'Explore bike networks and cycling routes worldwide. Your ultimate guide for cycling enthusiasts.',
    url: '/',
    siteName: 'Cycle Map',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cycle Map - Worldwide Bike Networks',
    description:
      'Discover cycling paths and bike networks worldwide. Plan your cycling routes with Cycle Map.',
    site: '@cyclemap',
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} md:overflow-y-hidden font-sans antialiased`}
      >
        <main className="main-container">{children}</main>
      </body>
    </html>
  );
}
