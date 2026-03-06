import { RootProvider } from 'fumadocs-ui/provider/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Acontext Docs',
    default: 'Acontext Docs',
  },
  description: 'Acontext — the agent memory stack for production AI Agents',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="flex min-h-screen flex-col">
        <GoogleTagManager gtmId="GTM-KQ7H272M" />
        <GoogleAnalytics gaId="G-Y2R02LY9NV" />
        <RootProvider
          search={{
            options: {
              type: 'static',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
