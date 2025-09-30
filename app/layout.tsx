import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto lg:ml-0 ml-0">
              <div className="lg:hidden h-16" /> {/* Spacer for mobile menu button */}
              <div className="p-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
