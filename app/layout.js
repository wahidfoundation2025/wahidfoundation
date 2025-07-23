// app/layout.tsx or app/layout.js

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Headers from "./components/navbar";
import FooterNav from "./components/FooterNav";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Wahid Foundation",
  description: "One People. One Purpose. One Strong Future",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
          <Headers />
          {children}
          <FooterNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
