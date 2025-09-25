import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const silentMovie = localFont({
  src: "../public/fonts/silentinamovie_regular.ttf",
  variable: "--font-silent",
  display: "swap",
});
const astonScripts = localFont({
  src: "../public/fonts/Aston Script.ttf",
  variable: "--font-aston",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARTISTNAME — Dimensional Art",
  description: "Drawing + 3D experiments for bold brands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${silentMovie.variable} ${astonScripts.variable} ${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white antialiased`}
      >
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
