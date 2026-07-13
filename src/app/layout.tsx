import type { Metadata } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL } from "@/shared/config/site";
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
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
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
