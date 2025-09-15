import { Suspense } from "react";
import DonatePage from "../../../components/DonateClient";

async function getProjectIdFromSlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slug/${slug}`, {
    next: { revalidate: 3600 }, // revalidate every hour
  });

  if (!res.ok) throw new Error("Failed to fetch project ID", res.body);

  const data = await res.json();
  return data.projectId;
}

export default async function ProjectDonatePage({ params, searchParams }) {
  const { slug } = await params;
  const searchparams = await searchParams;
  const projectId = await getProjectIdFromSlug(slug);

  console.log({ ...searchparams, projectId });

  return (
    <>
      {projectId ? (
        <Suspense
          fallback={
            <div className="p-10 text-center text-gray-500">Loading...</div>
          }
        >
          <DonatePage searchParams={{ ...searchparams, projectId }} />
        </Suspense>
      ) : (
        <div className="p-10 text-center text-gray-500">Project not found.</div>
      )}
    </>
  );
}
