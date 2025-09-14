import { cache } from "react";
import About from "../../components/AboutClient";

const fetchAboutData = cache(getAboutData);

async function getAboutData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/aboutherosection`,
    {
      // because data is almost always static
      cache: "force-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}

export async function generateMetadata() {
  const aboutData = await fetchAboutData();

  return {
    title: aboutData.metatitle || aboutData.title || "About Us",
    description:
      aboutData.metadescription ||
      aboutData.subtitle ||
      "Learn more about our mission and impact.",
    keywords: aboutData.target_keywords || [],
    openGraph: {
      title: aboutData.ogtitle || aboutData.metatitle || aboutData.title,
      description:
        aboutData.ogdescription ||
        aboutData.metadescription ||
        aboutData.subtitle,
      url: aboutData.ogurl || `www.wahid.org.in/about`,
    },
  };
}

export default async function AboutPage() {
  const aboutData = await fetchAboutData();

  return (
    <>
      {aboutData.schemaMarkup &&
        Object.keys(aboutData.schemaMarkup).length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(aboutData.schemaMarkup),
            }}
          />
        )}

      <About />
    </>
  );
}
