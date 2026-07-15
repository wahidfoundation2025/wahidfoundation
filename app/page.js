"use client";

import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ImpactStats from "../components/ImpactSection";
import ProjectCardsSection from "../components/ProjectCardsSection";
import Link from "next/link";
import MobileDonationCategories from "../components/donationtype";
import useResponsiveLimit from "./hooks/useResponsiveLimit";
import { ArrowRight } from "lucide-react";

async function getHeroData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/homeherosection`,
      {
        cache: "force-cache",
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    return null;
  }
}

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [heroData, setHeroData] = useState(null);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://wahid.org.in/#organization",
        name: "Wahid",
        alternateName: "Wahid Foundation",
        url: "https://wahid.org.in",
        logo: "https://res.cloudinary.com/doxoxzz02/image/upload/v1755268285/Wahid_Logo_Green_xwcrq8.png",
        sameAs: [
          "https://www.facebook.com/wahid.org.in",
          "https://www.instagram.com/wahid.foundation",
          "https://www.linkedin.com/company/wahid-foundation-india/",
          "https://x.com/wahid_trust",
          "https://www.youtube.com/@wahid.foundation",
        ],
        description:
          "Wahid Foundation is a non-profit social welfare initiative that unites Indian backward and minority communities by collecting Re.1 a day per person to fund education, healthcare, scholarships, entrepreneurship, and community development projects.",
        foundingDate: "2024-10-09",
        founder: [
          {
            "@type": "Person",
            name: "Harab Rasheed",
            jobTitle: "Founder & CEO",
            description:
              "Founder of Wahid Foundation, Marhaba Haji and Revivoheal, a serial entrepreneur, IIM Bombay graduate, with experience in strategy consulting and halal tourism.",
            sameAs: [
              "https://www.linkedin.com/in/harabrasheed",
              "https://www.facebook.com/harabrasheed/",
              "https://x.com/harabrasheed",
              "https://www.instagram.com/harabrasheed/",
            ],
          },
          {
            "@type": "Person",
            name: "Raashid Sherif",
            jobTitle: "Co-Founder & COO",
            description:
              "Co-Founder of Wahid Foundation, COO of Rehbar, Hafiz-e-Qur'an, Islamic finance scholar with over a decade of experience in Sharia-compliant financial solutions.",
            sameAs: ["https://www.linkedin.com/in/raashidsherif"],
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "info@wahid.org.in",
          telephone: "+91-9480389296",
          areaServed: "IN",
          availableLanguage: "en",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "India",
        },
        knowsAbout: [
          "Zakat",
          "Sadaqah",
          "Islamic Finance",
          "Healthcare",
          "Education",
          "Community Empowerment",
          "Scholarship Funds",
          "Microfinance",
        ],
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#general-zakath-fund",
        name: "General Zakath Fund",
        description:
          "Fund dedicated to collecting and distributing zakath for social welfare and poverty alleviation.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/general-zakath-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#general-sadqa-fund",
        name: "General Sadqa Fund",
        description:
          "Charity-based fund for immediate social relief and community aid initiatives.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/general-sadqa-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#interest-purification-fund",
        name: "Interest Income Purification Fund",
        description:
          "Fund used for purification of riba income and channeling it towards public welfare.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/interest-purification-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#ias-ips-coaching-fund",
        name: "IAS/IPS Coaching Scholarship Fund",
        description:
          "Scholarship fund to support minority students preparing for IAS/IPS competitive exams.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/ias-ips-coaching-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#school-development-fund",
        name: "Minority Modern School Development Fund",
        description:
          "Fund to develop modern schools providing quality education for minority communities.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/school-development-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#prisoner-release-fund",
        name: "Release Innocent Prisoners Fund",
        description:
          "Support fund to legally and financially assist in releasing innocent prisoners.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/prisoner-release-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#microfinance-fund",
        name: "Minority Entrepreneur Micro Finance Fund",
        description:
          "Micro-finance fund to empower minority entrepreneurs with small-scale business support.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/microfinance-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#lawyers-scholarship-fund",
        name: "100 Minority Community Lawyers' Scholarship Fund",
        description:
          "Scholarship program to create 100 qualified minority community lawyers.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/lawyers-scholarship-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#al-ansaar-trust-fund",
        name: "Al Ansaar Trust Fund",
        description:
          "Dedicated trust fund supporting local mosque programs for community welfare in Bangalore through aid for healthcare, education, economic upliftment, and Ramadan community meals.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/al-ansaar-trust-fund",
        areaServed: "Bangalore",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#hospital-development-fund",
        name: "Minority Modern Hospital Development Fund",
        description:
          "Fund to develop modern hospitals with advanced healthcare facilities for minority communities.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/hospital-development-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#cancer-treatment-fund",
        name: "Cancer Treatment Fund for Poor",
        description:
          "Fund to provide financial assistance for poor patients battling cancer.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/cancer-treatment-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#dialysis-treatment-fund",
        name: "Dialysis Treatment Fund for Poor",
        description:
          "Fund to support dialysis treatments for underprivileged patients with kidney issues.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/dialysis-treatment-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#doctors-scholarship-fund",
        name: "100 Minority Doctors' Scholarship Fund",
        description:
          "Scholarship program to create 100 doctors from minority communities.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/doctors-scholarship-fund",
      },
      {
        "@type": "Project",
        "@id": "https://wahid.org.in/#news-channel-fund",
        name: "Minority News Channel Development Fund",
        description:
          "Fund to build and operate a modern news channel to empower minority voices.",
        parentOrganization: { "@id": "https://wahid.org.in/#organization" },
        url: "https://wahid.org.in/projects/news-channel-fund",
      },
      {
        "@type": "WebSite",
        "@id": "https://wahid.org.in/#website",
        url: "https://wahid.org.in",
        name: "Wahid",
        publisher: { "@id": "https://wahid.org.in/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://wahid.org.in/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://wahid.org.in/#webpage",
        url: "https://wahid.org.in",
        name: "Wahid - Social Welfare Projects & Funds",
        isPartOf: { "@id": "https://wahid.org.in/#website" },
        about: { "@id": "https://wahid.org.in/#organization" },
        primaryImageOfPage:
          "https://res.cloudinary.com/doxoxzz02/image/upload/v1755268342/Zakath_Fund_zsrpnx.jpg",
        datePublished: "2024-10-09",
        dateModified: "2025-09-01",
        inLanguage: "en",
        potentialAction: [
          {
            "@type": "DonateAction",
            target: "https://wahid.org.in/donate",
            recipient: { "@id": "https://wahid.org.in/#organization" },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://wahid.org.in/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Wahid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wahid is a social welfare initiative collecting Re.1 per day from Indians to fund education, healthcare, scholarships, and community development.",
            },
          },
          {
            "@type": "Question",
            name: "How can I donate to Wahid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can donate through our official website wahid.org.in using secure payment methods. Even Re.1 a day makes a big impact.",
            },
          },
          {
            "@type": "Question",
            name: "Which projects does Wahid support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Wahid supports 14 ongoing projects including scholarships, healthcare funds, microfinance, school and hospital development, prisoner release, and more.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://wahid.org.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://wahid.org.in/projects",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    async function fetchHero() {
      const data = await getHeroData();
      setHeroData(data);
    }

    fetchHero();
  }, []);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/homequotesection`,
          {
            next: { revalidate: 3600 },
          }
        );

        const data = await res.json();
        setQuote(data);
      } catch (e) {
        setQuote(null);
      }
    }
    fetchQuote();
  }, []);

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>

      <div className="flex flex-col bg-white">

        <HeroSection hero={heroData} />

        {/* Featured projects */}
        <section className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Where your giving goes
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-emerald-900 sm:text-4xl">
              Featured Causes
            </h2>
            <p className="mt-3 text-gray-600">
              Real projects, transparent impact. Choose a cause close to your
              heart and start giving today.
            </p>
          </div>
        </section>

        {(() => {
          const limit = useResponsiveLimit();
          return <ProjectCardsSection initialLimit={limit} infiniteScroll={false} />;
        })()}

        <div className="flex w-full justify-center pb-16 pt-4">
          <Link href="/projects" className="btn-outline mx-4">
            See All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ImpactStats />

        {/* Quote */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 px-5 py-24 text-center lg:py-32">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl space-y-6">
            <div className="mx-auto text-5xl leading-none text-amber-300/80 font-display">“</div>
            <p className="font-display text-2xl font-medium italic leading-relaxed text-white lg:text-3xl lg:leading-relaxed">
              {quote?.text ||
                "Whoever saves one life — it is as if he had saved mankind entirely."}
            </p>
            <p className="text-sm font-medium tracking-wide text-emerald-200 lg:text-base">
              {quote?.reference || "— Surah Al-Ma'idah 5:32"}
            </p>
          </div>
        </section>

        <MobileDonationCategories />

        {/* Final CTA */}
        <section className="container-x py-20 lg:py-28">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100 px-6 py-16 text-center shadow-sm lg:px-8 lg:py-20">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-200/50 blur-2xl" />
            <div className="relative mx-auto max-w-2xl space-y-5">
              <h2 className="font-display text-3xl font-bold text-emerald-900 lg:text-4xl">
                Ready to Make a Difference?
              </h2>
              <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                Start with just ₹1 per day and join thousands of donors in
                creating lasting change.
              </p>
              <div className="flex justify-center pt-2">
                <Link
                  href="/projects/general-sadqa-fund"
                  className="btn-primary w-full text-lg sm:w-auto"
                >
                  Donate Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
