import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { getStorefront } from "@/config/storefront";
import { auth } from "@/features/auth/lib/auth";
import { SITE_TYPES } from "@/lib/api-site-type";
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
  variable: "--font-iran-yekan",
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
    url: getStorefront(SITE_TYPES.supermarket).absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="fa" dir="rtl" className={`${iranYekan.variable} h-full antialiased`}>
      <body
        className={`${iranYekan.className} flex min-h-full flex-col bg-[#F1F5F9] pb-[calc(4.5rem+env(safe-area-inset-bottom))] font-sans! text-base! leading-normal! font-normal! lg:bg-white lg:pb-0`}
      >
        <DirectionProvider direction="rtl">
          <Providers session={session}>
            {children}
            <Toaster />
            <Script src="/js/map-service.js" strategy="afterInteractive" />
          </Providers>
        </DirectionProvider>
      </body>
    </html>
  );
}
