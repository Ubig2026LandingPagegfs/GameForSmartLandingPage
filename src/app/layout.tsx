import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../assets/webfont/tabler-icons.min.css";
import "../assets/css/swiper-bundle.min.css";
import "./globals.css";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";

import Preloader from "@/components/shared/Preloader";
import NotificationArea from "@/components/shared/NotificationArea";
import ConnectWalletModal from "@/components/shared/ConnectWalletModal";
import UserAccountPopup from "@/components/features/auth/UserAccountPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "GameForSmart - Belajar Coding Interaktif",
    description: "Kuasai teknologi masa depan dengan platform belajar coding terbaik untuk anak muda.",
};

import { SearchProvider } from "@/context/SearchContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/assets/img/gameforsmartlogo.png" type="image/x-icon" />
            </head>
            <body className={`${inter.className} overflow-x-hidden relative max-w-[1920px] mx-auto`}>
                <SearchProvider>
                    <Preloader />   
                    <div className="cursor"></div>
                    <NotificationArea />
                    <ConnectWalletModal />
                    <UserAccountPopup />
                    {children}
                </SearchProvider>

                {/* Legacy Scripts */}
                <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
                <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/SplitText.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/ScrollMagic.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/animation.gsap.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/lenis.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
                <Script src="/assets/js/vanilla-tilt.js" strategy="afterInteractive" />
                <Script src="/assets/js/apexcharts.js" strategy="afterInteractive" />
                <Script src="/assets/js/gsap-customization.js" strategy="afterInteractive" />
                <Script src="/assets/js/main.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
