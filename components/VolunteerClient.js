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

export const VolunteerPage = () => {
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
          className="card-soft flex flex-col gap-2 p-6"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-emerald-900">
              {opportunity.title}
            </span>
          </div>
          <div className="text-sm font-medium text-emerald-600">
            Time commitment: {opportunity.commitment}
          </div>
          <div className="text-sm leading-relaxed text-gray-600">
            {opportunity.description}
          </div>
        </div>
      );
    });
  }, [oppLoading, opportunities]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white text-gray-800">
      <div className="container-x max-w-4xl px-4 pb-16 pt-32 sm:pt-40">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Join Us
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-emerald-900 md:text-5xl">
            Become a Volunteer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
            Join our community of passionate volunteers and help create positive
            impact across India. Whether you can give a few hours or a few days,
            your time and skills can change lives.
          </p>
        </div>

        {/* Opportunities */}
        <div className="mb-14">
          <h2 className="mb-6 font-display text-2xl font-bold text-emerald-900">
            Current Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {renderedOpportunities}
          </div>
        </div>

        {/* Registration Form */}
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 sm:p-10">
          <h2 className="mb-6 font-display text-2xl font-bold text-emerald-900">
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
                    className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
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
                className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
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
                className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>

        {/* Donation CTA */}
        <div className="mb-6 mt-12 text-center">
          <h2 className="mb-2 font-display text-2xl font-bold text-emerald-900">
            Other Ways to Help
          </h2>
          <p className="mb-5 text-gray-600">
            Can't volunteer your time? Consider making a donation instead.
          </p>
          <a href="/donate" className="btn-outline">
            Make a Donation
          </a>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
