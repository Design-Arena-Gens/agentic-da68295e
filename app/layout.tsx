import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral Video Creator AI Agent',
  description: 'Generate viral hooks, scripts, voiceovers, visuals, captions, and hashtags in Hinglish.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container-width py-10">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Viral Video Creator AI Agent</h1>
            <p className="text-gray-400 mt-2">Simple Hindi + Hinglish. 30?60 sec. Trend-optimized.</p>
          </header>
          {children}
          <footer className="mt-10 text-xs text-gray-500">Built for fast deployment on Vercel.</footer>
        </div>
      </body>
    </html>
  );
}
