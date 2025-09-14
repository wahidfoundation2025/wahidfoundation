// app/about/page.js
import { cache } from "react";
import Impact from "../../components/ImpactClient";

const fetchImpactData = cache(getImpactData);

async function getImpactData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/impactherosection`,
    {
      cache: "force-cache",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch Impact data");
  return res.json();
}

export async function generateMetadata() {
  const impactData = await fetchImpactData();

  return {
    title: impactData.metatitle || impactData.title || "Impact",
    description:
      impactData.metadescription ||
      impactData.subtitle ||
      "Learn more about our mission and impact.",
    keywords: impactData.target_keywords || [],
    openGraph: {
      title: impactData.ogtitle || impactData.metatitle || impactData.title,
      description:
        impactData.ogdescription ||
        impactData.metadescription ||
        impactData.subtitle,
      url: impactData.ogurl || `www.wahid.org.in/impact`,
    },
  };
}

export default async function ImpactPage() {
  const impactData = await fetchImpactData();

  return (
    <>
      {impactData.schemaMarkup &&
        Object.keys(impactData.schemaMarkup).length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(impactData.schemaMarkup),
            }}
          />
        )}

      <Impact />
    </>
  );
}
