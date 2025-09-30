import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LubbMind",
  description: "Medical practice management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nextProvider i18n={i18n}>
            <div className="flex h-screen bg-background">
              <Sidebar />
              <main className="flex-1 overflow-auto lg:ml-0 ml-0">
                <div className="lg:hidden h-16" />
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
