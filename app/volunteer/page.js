"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Heart, Users, GraduationCap, Calendar } from "lucide-react";

// Map icon string names to Lucide components
const ICON_MAP = {
  GraduationCap,
  Heart,
  Users,
  Calendar,
};

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [oppLoading, setOppLoading] = useState(true);

  useEffect(() => {
    fetch("https://wahidfoundationadmin.vercel.app/api/volunteer-positions")
      .then(res => res.json())
      .then(data => {
        setOpportunities(data);
        setOppLoading(false);
      })
      .catch(() => setOppLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://wahidfoundationadmin.vercel.app/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Thank you for your interest in volunteering! We'll contact you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          skills: "",
          availability: "",
          message: ""
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white text-gray-100 ">
      <Head>
        <title>Volunteer with Wahid Foundation | Make a Difference</title>
        <meta name="description" content="Join our volunteer community at Wahid Foundation and help make a difference in education, healthcare, and rural development across India." />
      </Head>
      
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 mb-3">Become a Volunteer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of passionate volunteers and help create positive impact across India. 
            Whether you can give a few hours or a few days, your time and skills can change lives.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Current Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oppLoading ? (
              <div className="col-span-2 text-center text-gray-500">Loading opportunities...</div>
            ) : opportunities.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500">No opportunities available right now.</div>
            ) : (
              opportunities.map((opportunity, index) => {
                const Icon = ICON_MAP[opportunity.icon] || GraduationCap;
                return (
                  <div key={opportunity._id || index} className="rounded-lg border bg-white p-5 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-6 w-6 text-emerald-700" />
                      <span className="font-semibold text-emerald-700">{opportunity.title}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-1">Time commitment: {opportunity.commitment}</div>
                    <div className="text-gray-700">{opportunity.description}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg text-gray-800">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Volunteer Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  id="email" 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border  bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium mb-1">Availability</label>
                <input 
                  id="availability" 
                  name="availability"
                  placeholder="Weekends, evenings, etc."
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  className="w-full border bg-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="skills" className="block text-sm font-medium mb-1">Skills & Expertise</label>
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
              <label htmlFor="message" className="block text-sm font-medium mb-1">Why do you want to volunteer?</label>
              <textarea 
                id="message" 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border bg-white  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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

        <div className="mt-10 text-center mb-12 text-gray-800">
          <h2 className="text-xl font-semibold text-emerald-700 mb-2">Other Ways to Help</h2>
          <p className="mb-4">Can't volunteer your time? Consider making a donation instead.</p>
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