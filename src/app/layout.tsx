import type { Metadata } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/providers";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Etkaline",
  description: "Etkaline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <DirectionProvider direction="rtl">
          <Providers>
            {children}
            <Footer />
          </Providers>
        </DirectionProvider>
      </body>
    </html>
  );
}
