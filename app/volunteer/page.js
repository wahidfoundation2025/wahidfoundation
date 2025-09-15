"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Heart, Users, GraduationCap, Calendar } from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Heart,
  Users,
  Calendar,
};

export const metadata = {
  title: "Volunteer with Wahid Foundation | Make a Difference",
  description:
    "Join our volunteer community at Wahid Foundation and help make a difference in education, healthcare, and rural development across India.",
};

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [oppLoading, setOppLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOpportunities() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/volunteer-positions`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setOppLoading(false);
      }
    }

    fetchOpportunities();
    return () => controller.abort();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = () =>
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "",
      message: "",
    });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/volunteer`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (res.ok) {
          toast.success(
            "Thank you for your interest in volunteering! We'll contact you soon."
          );
          resetForm();
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } catch {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const renderedOpportunities = useMemo(() => {
    if (oppLoading) {
      return (
        <div className="col-span-2 text-center text-gray-500">
          Loading opportunities...
        </div>
      );
    }
    if (opportunities.length === 0) {
      return (
        <div className="col-span-2 text-center text-gray-500">
          No opportunities available right now.
        </div>
      );
    }

    return opportunities.map((opportunity, index) => {
      const Icon = ICON_MAP[opportunity.icon] || GraduationCap;
      return (
        <div
          key={opportunity._id || index}
          className="rounded-lg border bg-white p-5 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-6 w-6 text-emerald-700" />
            <span className="font-semibold text-emerald-700">
              {opportunity.title}
            </span>
          </div>
          <div className="text-sm text-gray-500 mb-1">
            Time commitment: {opportunity.commitment}
          </div>
          <div className="text-gray-700">{opportunity.description}</div>
        </div>
      );
    });
  }, [oppLoading, opportunities]);

  return (
    <div className="bg-white text-gray-800">
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-3">
            Become a Volunteer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of passionate volunteers and help create positive
            impact across India. Whether you can give a few hours or a few days,
            your time and skills can change lives.
          </p>
        </div>

        {/* Opportunities */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
            Current Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderedOpportunities}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-emerald-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
            Volunteer Registration
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {["name", "email", "phone", "availability"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium mb-1 capitalize"
                  >
                    {field === "availability"
                      ? "Availability"
                      : field === "phone"
                      ? "Phone Number"
                      : field}
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label
                htmlFor="skills"
                className="block text-sm font-medium mb-1"
              >
                Skills & Expertise
              </label>
              <input
                id="skills"
                name="skills"
                placeholder="Teaching, Healthcare, Social Media, etc."
                value={formData.skills}
                onChange={handleChange}
                required
                className="w-full border bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Why do you want to volunteer?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded transition-all disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>

        {/* Donation CTA */}
        <div className="mt-10 text-center mb-12">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">
            Other Ways to Help
          </h2>
          <p className="mb-4">
            Can't volunteer your time? Consider making a donation instead.
          </p>
          <a
            href="/donate"
            className="inline-block border border-emerald-600 text-emerald-600 font-semibold px-6 py-2 rounded hover:bg-emerald-50 transition-all"
          >
            Make a Donation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
