"use client";

// Import Next.js Link for navigation and Lucide icons
import Link from "next/link";
import { MapPin, Users, Calendar } from "lucide-react";

const ProjectCardsSection = () => {
  // Define 3 sample projects
  const projects = [
    {
      id: 1,
      title: "Digital Education Center - Rural Maharashtra",
      description: "Establishing computer labs and digital literacy programs in remote villages to bridge the digital divide and empower rural communities with technology skills.",
      category: "Education",
      location: "Maharashtra, India",
      totalRequired: 500000,
      collected: 375000,
      beneficiaries: 500,
      completion: 75,
      daysLeft: 45,
      status: "Active",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
      zakat_eligible: true,
      interest_earnings_eligible: true,
    },
    {
      id: 2,
      title: "Women Empowerment Training Program",
      description: "Comprehensive skill development and entrepreneurship training for rural women, including tailoring, handicrafts, and business management.",
      category: "Women Empowerment",
      location: "Karnataka, India",
      totalRequired: 300000,
      collected: 180000,
      beneficiaries: 200,
      completion: 60,
      daysLeft: 60,
      status: "Active",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80",
      zakat_eligible: true,
      interest_earnings_eligible: false,
    },
    {
      id: 3,
      title: "Mobile Health Clinic Initiative",
      description: "Bringing essential healthcare services to remote tribal areas with mobile medical units and trained healthcare professionals.",
      category: "Healthcare",
      location: "Odisha, India",
      totalRequired: 800000,
      collected: 320000,
      beneficiaries: 1000,
      completion: 40,
      daysLeft: 90,
      status: "Active",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      zakat_eligible: false,
      interest_earnings_eligible: true,
    },
  ];

  // Format currency in INR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get badge color based on category
  const getCategoryColor = (category) => {
    const colors = {
      Education: "bg-blue-100 text-blue-800",
      "Women Empowerment": "bg-pink-100 text-pink-800",
      Healthcare: "bg-red-100 text-red-800",
      "Economic Empowerment": "bg-green-100 text-green-800",
      "Rural Empowerment": "bg-amber-100 text-amber-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Get badge color based on status
  const getStatusColor = (status) => {
    return status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    // Section container with padding
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
      {/* Grid for 3 cards */}
      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          // Card container
          <div
            key={project.id}
            className="overflow-hidden bg-white border-none rounded-lg shadow-sm hover:shadow-xl transition-shadow lg:hover:shadow-2xl lg:hover:scale-105 lg:transition-all lg:duration-300"
          >
            {/* Image section */}
            <div className="h-48 relative lg:h-56">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap lg:top-5 lg:left-5 lg:gap-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(project.category)} lg:text-sm lg:px-3 lg:py-1`}>
                  {project.category}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(project.status)} lg:text-sm lg:px-3 lg:py-1`}>
                  {project.status}
                </span>
                {project.zakat_eligible && (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 lg:text-sm lg:px-3 lg:py-1">
                    Zakat Eligible
                  </span>
                )}
                {project.interest_earnings_eligible && (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold پشتیبانی bg-orange-100 text-orange-800 lg:text-sm lg:px-3 lg:py-1">
                    Interest Earnings
                  </span>
                )}
              </div>
              {/* Location */}
              <div className="absolute bottom-4 left-4 text-white lg:bottom-5 lg:left-5">
                <div className="flex items-center space-x-1 text-sm lg:text-base">
                  <MapPin className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>

            {/* Card header */}
            <div className="p-6">
              <h3 className="text-xl text-emerald-800 font-semibold lg:text-2xl lg:leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1.5 lg:text-base lg:leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Card content */}
            <div className="p-6 pt-0 space-y-4 lg:space-y-5">
              {/* Progress section */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold lg:text-lg">{project.completion}%</span>
                </div>
                {/* Progress bar */}
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 lg:h-3">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${project.completion}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-emerald-600 font-semibold lg:text-lg">
                    {formatCurrency(project.collected)}
                  </span>
                  <span className="text-gray-600">of {formatCurrency(project.totalRequired)}</span>
                </div>
              </div>

              {/* Details section */}
              <div className="grid grid-cols-2 gap-4 text-sm lg:text-base lg:gap-6">
                <div className="flex items-center space-x-1 lg:space-x-2">
                  <Users className="h-4 w-4 text-emerald-600 lg:h-5 lg:w-5" />
                  <span>{project.beneficiaries} beneficiaries</span>
                </div>
                <div className="flex items-center space-x-1 lg:space-x-2">
                  <Calendar className="h-4 w-4 text-amber-600 lg:h-5 lg:w-5" />
                  <span>
                    {project.status === "Completed" ? "Completed" : `${project.daysLeft} days left`}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-2 lg:space-x-3">
                {project.status !== "Completed" && (
                  <Link
                    href={`/donate?project=${project.id}`}
                    className="flex-1 text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 font-semibold lg:h-11 lg:text-base lg:rounded-lg"
                  >
                    Donate Now
                  </Link>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className={`${
                    project.status === "Completed" ? "flex-1" : "flex-1"
                  } text-center border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 font-semibold lg:h-11 lg:text-base lg:rounded-lg lg:border-2`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectCardsSection;