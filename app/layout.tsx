import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { ChatbotFAB } from '@/components/chatbot-fab';
import { VoiceController } from '@/components/voice-controller';

const inter = Inter({ subsets: ['latin'] });

// Static export mode

export const metadata: Metadata = {
  metadataBase: new URL('https://ayonix-ai.pages.dev'),
  title: 'Ayonix AI - Enterprise AI Solutions',
  description:
    'Empowering businesses with intelligent AI agents and solutions for Healthcare, Corporate, Finance, and Government sectors.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Ayonix AI - Enterprise AI Solutions',
    description:
      'Empowering businesses with intelligent AI agents and solutions for Healthcare, Corporate, Finance, and Government sectors.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navigation />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <ChatbotFAB />
          <VoiceController />
        </Providers>
      </body>
    </html>
  );
}
