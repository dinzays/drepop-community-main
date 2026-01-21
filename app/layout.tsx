import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: 'Drepop Community | %s',
    default: 'Drepop Community | Rewards Leaderboard'
  },
  description: 'Join the ultimate rewards challenge. Play, climb, and claim your rewards.',
  keywords: ['rewards', 'leaderboard', 'affiliate', 'gaming', 'crypto'],
  icons: {
    icon: '/icon1.png',
    shortcut: '/icon1.png',
    apple: '/icon1.png',
  },
  openGraph: {
    title: 'Drepop Community',
    description: 'A modern rewards leaderboard with referral challenges.',
    url: 'https://myrewards.local',
    siteName: 'Drepopcommunity',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drepop Community',
    description: 'Join the ultimate rewards challenge.'
  }
};

export const viewport: Viewport = {
  themeColor: '#131313',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="overflow-x-hidden">
        <div className="accent-gradient fixed inset-0 pointer-events-none" />
        <Navbar />
        <main className="container-inner py-6 sm:py-8 min-h-[70vh] relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


