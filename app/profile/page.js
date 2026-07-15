"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [formData, setFormData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
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

          // Backend populates projectsDonatedTo (full project objects) and
          // donations (full Razorpay transaction records) — use them directly.
          const donatedProjects = Array.isArray(donorFromDb.projectsDonatedTo)
            ? donorFromDb.projectsDonatedTo.filter(
                (p) => p && typeof p === "object"
              )
            : [];
          setProjects(donatedProjects);

          const donationList = Array.isArray(donorFromDb.donations)
            ? donorFromDb.donations
                .filter((d) => d && typeof d === "object")
                .sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
            : [];
          setDonations(donationList);
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

  async function handleCancelSubscription(subscriptionId) {
    if (
      !confirm(
        "Cancel this recurring donation? Future auto-payments will stop."
      )
    )
      return;
    setCancelingId(subscriptionId);
    try {
      const res = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });
      const data = await res.json();
      if (res.ok) {
        setDonations((prev) =>
          prev.map((d) =>
            d.subscriptionId === subscriptionId
              ? { ...d, subscriptionStatus: "cancelled" }
              : d
          )
        );
      } else {
        alert(data.error || "Failed to cancel subscription.");
      }
    } catch (e) {
      console.error("Cancel error", e);
      alert("Failed to cancel subscription.");
    } finally {
      setCancelingId(null);
    }
  }

  // Map project id -> title (projectsDonatedTo is populated by the backend)
  const projectTitleById = {};
  (projects || []).forEach((p) => {
    if (p?._id) projectTitleById[p._id] = p.title;
  });

  const totalDonated =
    formData.totalDonated ||
    (donations || []).reduce((sum, d) => sum + (d?.amount || 0), 0);

  const totalPages = Math.max(
    1,
    Math.ceil((donations?.length || 0) / rowsPerPage)
  );
  const paginatedDonations = (donations || []).slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const inr = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  // One entry per recurring subscription (latest charge represents it).
  const subscriptions = [];
  const seenSub = new Set();
  for (const d of donations) {
    if (d.subscriptionId && !seenSub.has(d.subscriptionId)) {
      seenSub.add(d.subscriptionId);
      subscriptions.push(d);
    }
  }
  const isSubActive = (status) =>
    !["cancelled", "completed", "expired"].includes(
      (status || "active").toLowerCase()
    );
  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-emerald-50/50 to-white px-3 pb-24 pt-28 text-black sm:px-10 sm:pt-32">
      <section className="mb-10 w-full max-w-4xl space-y-6 rounded-3xl border border-emerald-50 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(4,47,34,0.35)] md:p-8">
        <h1 className="font-display text-2xl font-bold text-emerald-900">My Profile</h1>
        {/* Profile */}
        <div className="flex flex-col gap-3 items-start md:space-x-6 border-b border-emerald-50 pb-6">
          <div className="w-full flex flex-row gap-6 sm:mb-4 m-0">
            <div className="w-full flex-1/5 flex flex-col gap-4 justify-between">
              <img
                src={formData.profilePicture || "/profile.png"}
                alt="Profile"
                className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-emerald-600 mb-4 md:mb-0"
              />

              <SignOutButton>
                <button className="cursor-pointer rounded-full border border-red-400 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
                  Logout
                </button>
              </SignOutButton>
            </div>

            <div className="w-full flex-4/5 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                className="w-full rounded-xl border border-emerald-100 bg-white p-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                value={formData.name || ""}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Full name"
              />

              <label className="block text-sm font-medium text-gray-700">Email (from Clerk)</label>
              <input
                className="w-full rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5 text-gray-500 outline-none"
                value={formData.email || ""}
                readOnly
                title="Email is managed by Clerk; change in account settings."
              />
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            className="w-full rounded-xl border border-emerald-100 bg-white p-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
            value={formData.phoneNumber || ""}
            onChange={(e) => setField("phoneNumber", e.target.value)}
            placeholder="Phone number (optional)"
          />

          <label className="block text-sm font-medium text-gray-700">PAN card</label>
          <input
            className="w-full rounded-xl border border-emerald-100 bg-white p-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
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
                className="rounded-xl border border-emerald-100 bg-white p-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
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
            className="rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-2.5 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(5,150,105,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
          {loadingDonor && <p className="text-sm text-gray-500">Loading saved profile…</p>}
          <p className="text-sm text-gray-500">Email is read-only (managed by Clerk).</p>
        </div>

        {/* Donation summary tiles */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-center">
            <div className="font-display text-2xl font-bold text-emerald-700">
              {inr(totalDonated)}
            </div>
            <div className="mt-1 text-xs font-medium text-gray-600">
              Total Donated
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-center">
            <div className="font-display text-2xl font-bold text-emerald-700">
              {donations.length}
            </div>
            <div className="mt-1 text-xs font-medium text-gray-600">
              Donations Made
            </div>
          </div>
          <div className="col-span-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-center sm:col-span-1">
            <div className="font-display text-2xl font-bold text-emerald-700">
              {projects.length || formData.totalProjects || 0}
            </div>
            <div className="mt-1 text-xs font-medium text-gray-600">
              Projects Supported
            </div>
          </div>
        </div>

        {/* Recurring subscriptions */}
        {subscriptions.length > 0 && (
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-emerald-900">
              Recurring Donations
            </h2>
            <div className="space-y-3">
              {subscriptions.map((s) => {
                const active = isSubActive(s.subscriptionStatus);
                return (
                  <div
                    key={s.subscriptionId}
                    className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display font-bold text-emerald-900">
                          {inr(s.amount)}
                        </span>
                        <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                          {s.donationFrequency || "Recurring"}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            active
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {active ? "Active" : "Cancelled"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-gray-600">
                        {projectTitleById[s.projectId] || "General Fund"}
                        {s.donationType ? ` · ${s.donationType}` : ""}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        Started{" "}
                        {s.createdAt
                          ? new Date(s.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </p>
                    </div>
                    {active && (
                      <button
                        onClick={() =>
                          handleCancelSubscription(s.subscriptionId)
                        }
                        disabled={cancelingId === s.subscriptionId}
                        className="shrink-0 rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                      >
                        {cancelingId === s.subscriptionId
                          ? "Cancelling…"
                          : "Cancel"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Donation / Transaction history */}
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-emerald-900">
            Donation History
          </h2>
          {donations.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto rounded-2xl border border-emerald-50 sm:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-emerald-50/70 text-xs uppercase tracking-wide text-emerald-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Project</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Frequency</th>
                      <th className="px-4 py-3 text-right font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Payment ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {paginatedDonations.map((d) => (
                      <tr key={d._id} className="hover:bg-emerald-50/40">
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                          {d.createdAt
                            ? new Date(d.createdAt).toLocaleDateString("en-IN")
                            : "—"}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {projectTitleById[d.projectId] ||
                            d.projectName ||
                            "General Fund"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {d.donationType || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {d.donationFrequency || "One-Time"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-emerald-700">
                          {inr(d.amount)}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">
                          {d.paymentId || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 sm:hidden">
                {paginatedDonations.map((d) => (
                  <div
                    key={d._id}
                    className="rounded-2xl border border-emerald-50 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-medium text-gray-800">
                        {projectTitleById[d.projectId] ||
                          d.projectName ||
                          "General Fund"}
                      </div>
                      <div className="shrink-0 font-display font-bold text-emerald-700">
                        {inr(d.amount)}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span>
                        {d.createdAt
                          ? new Date(d.createdAt).toLocaleDateString("en-IN")
                          : "—"}
                      </span>
                      <span>{d.donationType || "—"}</span>
                      <span>{d.donationFrequency || "One-Time"}</span>
                    </div>
                    {d.paymentId && (
                      <div className="mt-1 font-mono text-[11px] text-gray-400">
                        {d.paymentId}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * rowsPerPage + 1,
                    donations.length
                  )}
                  –{Math.min(currentPage * rowsPerPage, donations.length)} of{" "}
                  {donations.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded-full border border-emerald-100 p-2 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaAnglesLeft />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-full border border-emerald-100 p-2 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaAnglesRight />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center">
              <p className="text-gray-500">No donations yet.</p>
              <a
                href="/donate"
                className="mt-3 inline-flex rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Make your first donation
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
