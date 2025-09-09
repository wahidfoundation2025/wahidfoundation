import { Suspense } from "react";
import DonatePage from "../../../components/DonateClient";

async function getProjectIdFromSlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/slug/${slug}`
  ).then((res) => res.json());
  return res.projectId;
}

export default async function ProjectDonatePage({ params, searchParams }) {
  const { slug } = params;
  const { type, amount, frequency } = searchParams;

  const projectId = await getProjectIdFromSlug(slug);
  const propParams = { projectId, type, amount, frequency };

  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-gray-500">Loading...</div>
      }
    >
      <DonatePage searchParams={propParams} />
    </Suspense>
  );
}
