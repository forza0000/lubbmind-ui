import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";

const geistSans = GeistSans({
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={inter.className}>
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
