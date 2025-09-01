"use client";
import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ImpactStats from "../components/ImpactSection";
import ProjectCardsSection from "../components/Project";
import Link from "next/link";
import MobileDonationCategories from "../components/donationtype";

export default function Home() {
  const [quote, setQuote] = useState(null);
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
    async function fetchQuote() {
      try {
        const res = await fetch(
          "https://wahidfoundationadmin-seven.vercel.app/api/homequotesection"
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
        <HeroSection />

        <ProjectCardsSection maxCards={3} />

        <div className="py-10 w-full flex justify-center">
          <Link
            href="/projects"
            className="w-full mx-4 max-w-md lg:w-auto text-center px-6 lg:px-12 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold transition-all duration-200 active:scale-[0.98] rounded-lg"
          >
            See Our Projects
          </Link>
        </div>

        <div className="border-t border-gray-100">
          <ImpactStats />
        </div>

        <section className="py-20 px-5 lg:py-40 lg:px-8 bg-gradient-to-br from-amber-50 to-amber-100 text-center border-y border-amber-100">
          <div className="max-w-sm mx-auto lg:max-w-2xl space-y-4 lg:space-y-6">
            <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
            <p className="italic text-amber-900 font-medium text-base leading-relaxed lg:text-xl lg:leading-relaxed">
              {quote?.text ||
                '"Whoever saves one life - it is as if he had saved mankind entirely."'}
            </p>
            <p className="text-sm text-amber-700 lg:text-base">
              {quote?.reference || "— Surah Al-Ma'idah 5:32"}
            </p>
            <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
          </div>
        </section>

        <div className="border-b border-gray-100">
          <MobileDonationCategories />
        </div>

        <section className="py-20 px-5 lg:py-40 lg:px-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="max-w-md mx-auto lg:max-w-2xl space-y-4 lg:space-y-6">
            <h2 className="text-2xl font-bold text-emerald-800 lg:text-3xl">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed lg:text-lg lg:leading-relaxed">
              Start with just ₹1 per day and join thousands of donors in
              creating lasting change.
            </p>
            <div className="lg:flex lg:justify-center">
              <Link
                href="/donate"
                className="w-full lg:w-auto text-center px-6 lg:px-12 py-3 bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl text-white text-lg font-semibold rounded-md transition-all duration-200 active:scale-[0.98] mt-2 inline-flex items-center justify-center"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
