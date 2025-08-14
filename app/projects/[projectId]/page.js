"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { MapPin, Mail, Phone, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params?.projectId;
  const { isSignedIn } = useUser();
  const [project, setProject] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `https://wahidfoundationadmin-seven.vercel.app/api/projects/${projectId}`
        );
        const data = await res.json();
        setProject(data);

        console.log("Fetched project:", data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }

    if (projectId) fetchProject();
  }, [projectId]);
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-600">
        <p className="text-lg font-medium mb-6">Loading project details...</p>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-emerald-500"
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  const handleDonateClick = (projectId) => {
    if (!isSignedIn) {
      // Redirect to Clerk sign-in page with redirect back
      router.push(`/login?redirect_url=/donate?project=${projectId}`);
    } else {
      router.push(`/donate?project=${projectId}`);
    }
  };

  const percentageRaised = Math.round(
    (project.collected / project.totalRequired) * 100
  );

  return (
    <main className="space-y-8 bg-white pb-16">
      {project.mainImage && (
        <div className="relative h-80 w-full overflow-hidden">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 text-white flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <a href="/projects" className="text-sm font-medium hover:underline">
              Go back to Projects
            </a>
          </div>
          <div className="absolute bottom-4 left-4 text-white space-y-1 px-4 py-3 rounded-xl max-w-[90%] backdrop-blur-sm bg-black/30">
            <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">
              {project.category}
            </span>
            <h1 className="text-2xl font-bold leading-tight">
              {project.title}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center text-center text-gray-800 text-sm divide-x divide-gray-200 px-2">
        <div className="px-4">
          <p className="text-lg font-bold">{percentageRaised}%</p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
        <div className="px-4">
          <p className="text-lg font-bold">{project.daysLeft}</p>
          <p className="text-xs text-gray-500">Days Left</p>
        </div>
        <div className="px-4">
          <p className="text-lg font-bold">{project.beneficiaries}</p>
          <p className="text-xs text-gray-500">Beneficiaries</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-10  max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 font-bold">Total Required</p>
          <p className="text-sm font-semibold text-gray-900">
  ₹{project?.totalRequired ? project.totalRequired.toLocaleString() : "0"}
</p>
        </div>
        <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0f172a] rounded-full"
            style={{ width: `${percentageRaised}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-blue-600 font-semibold">
            ₹{project.collected.toLocaleString()} raised
          </p>
          <p className="text-gray-600">{percentageRaised}% of goal</p>
        </div>
      </div>
      <section className="max-w-md mx-auto bg-green-50 p-6 rounded-xl shadow space-y-4">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-800">Make a Donation</h2>
        </div>
        <button
          onClick={() => handleDonateClick(projectId)}
          disabled={project.status === "Completed"}
          className={`w-full py-2 rounded-md font-semibold transition ${
            project.status === "complete"
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
        >
          {project.status === "Completed" ? "Donation Closed" : "Donate"}
        </button>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-start gap-6 px-4">
        {/* About the Project Card */}
        <div className="bg-gray-50 p-6 rounded-xl shadow max-w-xl w-full flex-1">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center md:text-left">
            About the Project
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-center md:text-left">
            {project.description}
          </p>
        </div>

        {/* Project Manager Card */}
        {project.projectManager && (
          <div className="bg-gray-50 border rounded-xl p-6 shadow max-w-sm w-full flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
              Project Manager
            </h2>
            <div className="space-y-4 text-gray-700 text-sm text-center md:text-left">
              <div className="flex items-center font-semibold">
  <span className="mr-2"><IoPerson /></span>
  {project.projectManager.name}
</div>
              <p className="flex justify-center md:justify-start items-center space-x-2">
               
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${project.projectManager.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.projectManager.email}
                </a>
              </p>
              <p className="flex justify-center md:justify-start items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${project.projectManager.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.projectManager.phone}
                </a>
              </p>
            </div>
          </div>
        )}
      </section>
      {project.photoGallery?.length > 0 && (
        <section className="px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Project Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.photoGallery.map((url, idx) => (
              <img
                key={idx}
                src={url}
                className="rounded-lg w-full h-40 lg:h-90 object-cover"
                alt={`Gallery Image ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}
      {project.youtubeIframe && (
        <section className="w-full px-0 my-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Project Video
          </h2>
          <div className="w-full h-[500px]">
            <iframe
              src={`https://www.youtube.com/embed/${
                project.youtubeIframe.split("youtu.be/")[1].split("?")[0]
              }`}
              title="Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-lg"
            ></iframe>
          </div>
        </section>
      )}
    </main>
  );
}
