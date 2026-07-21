import type { Metadata } from "next";
import localFont from "next/font/local";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL } from "@/config/site";
import "./globals.css";

const iranYekan = localFont({
  src: [
    {
      path: "../assets/fonts/IRANYekanXFaNum-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanXFaNum-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "فروش آنلاین لوازم خانگی با ارسال مطمئن و پشتیبانی اتکالاین",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "فروش آنلاین لوازم خانگی با ارسال مطمئن و پشتیبانی اتکالاین",
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${iranYekan.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#F1F5F9] pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <DirectionProvider direction="rtl">
          <Providers>
            <Header />
            {children}
            <Toaster />
            <Footer />
          </Providers>
        </DirectionProvider>
      </body>
    </html>
  );
}
