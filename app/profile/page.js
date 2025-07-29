"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [donorData, setDonorData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) return;

    async function fetchData() {
      setLoading(true);
      try {
        const donorsRes = await fetch("https://wahidfoundationadmin-seven.vercel.app/api/donors");
        const donorsList = await donorsRes.json();
        const myDonor = donorsList.find(
          (d) => d.email === user.primaryEmailAddress.emailAddress
        );
        if (!myDonor) {
          setDonorData(null);
          setLoading(false);
          return;
        }
        setDonorData(myDonor);

        const projectsRes = await fetch("https://wahidfoundationadmin-seven.vercel.app/api/projects");
        const projectsJson = await projectsRes.json();
        const allProjects = projectsJson.projects || projectsJson;

        const donatedProjects = allProjects.filter((p) =>
          myDonor.projectsDonatedTo.includes(p._id)
        );

        setProjects(donatedProjects);
      } catch (err) {
        console.error("Error fetching profile data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isLoaded, user]);

  // 🌟 Loading Screen
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!donorData) {
    return (
      <div className="min-h-screen flex items-start lg:items-center justify-center pt-4 lg:pt-0 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="text-gray-600">You have not donated yet.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(projects.length / rowsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen flex items-start lg:items-center justify-center pt-4 lg:pt-0 bg-gray-50">
      <section className="bg-white w-full max-w-4xl rounded-xl shadow p-6 md:p-8 space-y-6">
        {/* Profile */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 border-b pb-6">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-emerald-600 mb-4 md:mb-0"
          />
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">{donorData.name}</h1>
            <p className="text-gray-600">{donorData.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-emerald-700">Total Donated:</span>{" "}
              ₹{donorData.totalDonated} &nbsp; | &nbsp;
              <span className="font-medium text-emerald-700">Total Projects:</span>{" "}
              {donorData.totalProjects}
            </p>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Projects Donated To
          </h2>
          {projects.length > 0 ? (
            <>
              <ul className="list-disc pl-6 space-y-2">
                {paginatedProjects.map((project) => (
                  <li key={project._id} className="text-gray-700">
                    <span className="font-medium">{project.title}</span>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
                <span>
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * rowsPerPage + 1,
                    projects.length
                  )}
                  –{Math.min(currentPage * rowsPerPage, projects.length)} of{" "}
                  {projects.length} projects
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaAnglesLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaAnglesRight />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No projects donated yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
