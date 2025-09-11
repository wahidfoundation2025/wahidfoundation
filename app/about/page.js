// app/about/page.js
import About from "../../components/AboutClient";

async function getAboutData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/aboutherosection`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch About data");
  return res.json();
}

export async function generateMetadata() {
  const aboutData = await getAboutData();

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
  const aboutData = await getAboutData();

  return (
    <>
      {aboutData.schemaMarkup &&
        Object.keys(aboutData.schemaMarkup).length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(aboutData.schemaMarkup, null, 2),
            }}
          />
        )}

      <About />
    </>
  );
}
