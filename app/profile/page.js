"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingDonor, setLoadingDonor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [donorExists, setDonorExists] = useState(false); // NEW

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const defaultProfile = {
    name: "",
    email: "",
    profilePicture: "",
    pancardNumber: "",
    phoneNumber: "",
    address: { street: "", city: "", state: "", country: "", zipCode: "" },
    totalProjects: 0,
    totalDonated: 0,
    projectsDonatedTo: [],
    taxReceipts: []
  };

  function buildClerkFallback(u) {
    if (!u) return { ...defaultProfile };
    const email =
      u.primaryEmailAddress?.emailAddress ||
      u.email ||
      u.emailAddresses?.[0]?.emailAddress ||
      "";
    const name =
      u.fullName ||
      [u.firstName, u.lastName].filter(Boolean).join(" ") ||
      u.username ||
      "";
    const image = u.imageUrl || "";
    const phone = u.phoneNumbers?.[0]?.phoneNumber || u.phoneNumber || "";

    return {
      ...defaultProfile,
      name,
      email,
      profilePicture: image,
      phoneNumber: phone
    };
  }

  useEffect(() => {
    if (!isLoaded) return;
    const clerkInitial = buildClerkFallback(user);
    if (!clerkInitial.email) return;

    setFormData(clerkInitial);

    (async () => {
      setLoadingDonor(true);
      try {
        const email = clerkInitial.email;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donors/${email}`);

        if (res.ok) {
          const donorFromDb = await res.json();
          setDonorExists(true); // Donor exists

          const merged = {
            ...clerkInitial,
            ...donorFromDb,
            address: {
              ...clerkInitial.address,
              ...(donorFromDb.address || {})
            },
            projectsDonatedTo: donorFromDb.projectsDonatedTo || []
          };

          setFormData(merged);

          if (merged.projectsDonatedTo?.length) {
            const projectsRes = await fetch("/api/projects");
            if (projectsRes.ok) {
              const allProjects = await projectsRes.json();
              const list = allProjects.projects || allProjects;
              const donated = list.filter((p) =>
                merged.projectsDonatedTo.includes(p._id)
              );
              setProjects(donated);
            }
          }
        } else if (res.status === 404) {
          setDonorExists(false); // Donor does not exist
        } else {
          console.warn("Unexpected response fetching donor:", res.status);
        }
      } catch (err) {
        console.error("Error fetching donor:", err);
      } finally {
        setLoadingDonor(false);
      }
    })();
  }, [isLoaded, user]);

  if (!isLoaded || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  function setField(path, value) {
    if (path.startsWith("address.")) {
      const key = path.split(".")[1];
      setFormData((f) => ({
        ...f,
        address: { ...f.address, [key]: value }
      }));
    } else {
      setFormData((f) => ({ ...f, [path]: value }));
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const email = formData.email;
      const method = donorExists ? "PUT" : "POST";
      const url = donorExists
        ? `${process.env.NEXT_PUBLIC_API_URL}/donors/${email}`
        : `${process.env.NEXT_PUBLIC_API_URL}/donors/${email}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${text}`);
      }

      const saved = await res.json();
      setFormData((f) => ({ ...f, ...saved }));
      setDonorExists(true); // After saving, mark as existing
      alert("Profile saved.");
    } catch (err) {
      console.error("Save error", err);
      alert("Save failed — check console for details.");
    } finally {
      setSaving(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil((projects?.length || 0) / rowsPerPage));
  const paginatedProjects = (projects || []).slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div className="min-h-screen sm:px-10 px-3 flex items-start lg:items-center justify-center pt-6 bg-gray-50 text-black">
      <section className="bg-white w-full max-w-4xl rounded-xl shadow p-6 md:p-8 space-y-6 mb-10">
        {/* Profile */}
        <div className="flex flex-col gap-3 items-start md:space-x-6 border-b pb-6">
          <div className="w-full flex flex-row gap-6 sm:mb-4 m-0">
            <div className="w-full flex-1/5 flex flex-col gap-4 justify-between">
              <img
                src={formData.profilePicture || "/placeholder-avatar.png"}
                alt="Profile"
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-emerald-600 mb-4 md:mb-0"
              />

              <SignOutButton>
                <button className="px-4 py-2 text-sm bg-red-white border border-red-500 text-red-500 hover:text-white rounded-xl hover:bg-red-600 cursor-pointer transition">
                  Logout
                </button>
              </SignOutButton>
            </div>

            <div className="w-full flex-4/5 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                className="w-full border p-2 rounded"
                value={formData.name || ""}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Full name"
              />

              <label className="block text-sm font-medium text-gray-700">Email (from Clerk)</label>
              <input
                className="w-full border p-2 rounded bg-gray-50"
                value={formData.email || ""}
                readOnly
                title="Email is managed by Clerk; change in account settings."
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            className="w-full border p-2 mx-0 rounded"
            value={formData.phoneNumber || ""}
            onChange={(e) => setField("phoneNumber", e.target.value)}
            placeholder="Phone number (optional)"
          />

          <label className="block text-sm font-medium text-gray-700">PAN card</label>
          <input
            className="w-full border p-2 mx-0 rounded"
            value={formData.pancardNumber || ""}
            onChange={(e) => setField("pancardNumber", e.target.value)}
            placeholder="PAN"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-800">Address (optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["street", "city", "state", "country", "zipCode"].map((field) => (
              <input
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border p-2 rounded"
                value={formData.address?.[field] || ""}
                onChange={(e) => setField(`address.${field}`, e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
          {loadingDonor && <p className="text-sm text-gray-500">Loading saved profile…</p>}
          <p className="text-sm text-gray-500">Email is read-only (managed by Clerk).</p>
        </div>

        {/* Donated Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Projects Donated To</h2>
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
                  {Math.min((currentPage - 1) * rowsPerPage + 1, projects.length)}–
                  {Math.min(currentPage * rowsPerPage, projects.length)} of {projects.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaAnglesLeft />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
