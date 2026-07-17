// app/layout.js
import { ClerkProvider } from "@clerk/nextjs";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Headers from "../components/navbar";
import FooterNav from "../components/footer/FooterNav";
import ReferralTracker from "../components/ReferralTracker";
import TrackingScripts from "../components/TrackingScripts";
import "./globals.css";

// Elegant, warm display serif for headings
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Clean, modern humanist sans for body & UI
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title:
    "Wahid Foundation - Transforming Backward and Minority Communities with Zakat & Sadaqa for Education, Healthcare & Empowerment",
  description:
    "Wahid Foundation is a non-profit initiative dedicated to channeling Zakat and Sadaqah efficiently for poverty alleviation, quality education, accessible healthcare, and sustainable community development. Join us to empower lives through transparency and impact-driven programs.",
  keywords: [
    "Wahid foundation",
    "zakat",
    "sadaqah",
    "donate zakat online",
    "charity India",
    "NGO for Muslims",
    "poverty alleviation",
    "education support",
    "healthcare for poor",
    "sustainable community development",
    "Islamic charity",
    "donate online India",
    "social justice",
  ],
  openGraph: {
    type: "website",
    site_name: "Wahid Foundation",
    title:
      "Wahid Foundation - Empowering Backward and Minority Communities with Zakat & Sadaqa for Education, Healthcare & Socio-Economic Empowerment",
    description:
      "Wahid Foundation's Funds transform donations into real impact: poverty alleviation, education, healthcare, and sustainable development. Join our mission to empower backward and minority communities in a centralized way.",
    url: "https://wahid.org.in/",
    image:
      "https://res.cloudinary.com/doxoxzz02/image/upload/v1755268342/Zakath_Fund_zsrpnx.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wahid - Transforming Communities with Zakat, Education & Healthcare",
    description:
      "Wahid channels Zakat and Sadaqah to create sustainable change in poverty alleviation, education, healthcare, and empowerment. Be part of the impact.",
    image:
      "https://res.cloudinary.com/doxoxzz02/image/upload/v1755268342/Zakath_Fund_zsrpnx.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fraunces.variable} ${jakarta.variable} antialiased`}
        >
          <TrackingScripts />
          <ReferralTracker />
          <Headers />
          <main className="min-h-screen">{children}</main>
          <FooterNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
