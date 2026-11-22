import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Instrument_Serif, Cinzel } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-heading",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "NoiROBO | Robot & Car Tools Rental",
  description:
    "Rent robotics kits, AI hardware, 3D printers and car workshop tools with NoiROBO.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="noirobo"
      className={`${inter.variable} ${instrument.variable} ${cinzel.variable}`}
    >
      <body>
        <AuthProvider>
          <Suspense fallback={<div className="h-16 w-full" />}>
            <Navbar />
          </Suspense>
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}