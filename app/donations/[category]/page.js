"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


import {
  Heart,
  Users,
  Gift,
  HandCoins,
  CircleDollarSign,
  Repeat,
  FileBadge,
  IndianRupee,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getReferralCode } from "../../../components/ReferralTracker";

export default function DonatePage() {

  const { user } = useUser();
  const [isRecurring, setIsRecurring] = useState(false);
  const [donationFrequency, setDonationFrequency] = useState("Monthly");
  const [requestCertificate, setRequestCertificate] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [customAmount, setCustomAmount] = useState(365);
  const [donationType, setDonationType] = useState(null);
  const { category } = useParams();
  const quickAmounts = [1000, 2500, 5000, 10000, 15000, 25000];
  const impact = {
    Daily: (
      customAmount /
      (donationFrequency === "Yearly"
        ? 365
        : donationFrequency === "Monthly"
        ? 30
        : 1)
    ).toFixed(0),
    Monthly:
      donationFrequency === "Monthly"
        ? customAmount
        : donationFrequency === "Yearly"
        ? (customAmount / 12).toFixed(0)
        : (customAmount * 30).toFixed(0),
    Yearly:
      donationFrequency === "Yearly"
        ? customAmount
        : donationFrequency === "Monthly"
        ? (customAmount * 12).toFixed(0)
        : (customAmount * 365).toFixed(0),
  };
  const [donationFor, setDonationFor] = useState("self");
  const [dedicatedTo, setDedicatedTo] = useState("");
  const [message, setMessage] = useState("");
  const name = user?.fullName || "Anonymous";
  const email = user?.emailAddresses[0]?.emailAddress || "";

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects?donation_type=${category}&page=1&limit=6`
        );
        const data = await res.json();
        setProjects(data.projects || []);
        if (data.projects?.length > 0) {
          setSelectedProjectId(data.projects[1]._id); // Default to first project
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    fetchProjects();
  }, []);

  // Razorpay Payment Handler
  const handlePayment = () => {
    if (!customAmount || customAmount < 365) {
      alert("Please enter a valid donation amount (minimum ₹365).");
      return;
    }

    if (!donationType) {
      alert("Please select a donation type.");
      return;
    }

    if (!selectedProjectId) {
      alert("Please select a project to donate to.");
      return;
    }

    // Load Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const selectedProject = projects.find((p) => p._id === selectedProjectId);
      const options = {
        key: "rzp_live_lfzYuYY8Jv6NQG", // Replace with your Razorpay Key ID
        amount: customAmount * 100, // Amount in paise
        currency: "INR",
        name: "Wahid Foundation",
        description: `Donation for ${selectedProject?.title || "General Fund"}`,
        image: "https://cdn.razorpay.com/logo.svg", // Optional: Your logo
        handler: function (response) {
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Optionally, send payment details to your backend
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-donation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              amount: customAmount,
              donationType,
              donationFrequency: isRecurring ? donationFrequency : "One-Time",
              projectId: selectedProjectId,
              name,
              email,
              dedicatedTo,
              message,
              requestCertificate,
              influencerCode: getReferralCode() || undefined,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log("Donation saved:", data))
            .catch((err) => console.error("Failed to save donation:", err));
        },
        prefill: {
          name: name,
          email: email,
        },
        notes: {
          projectId: selectedProjectId,
          donationType,
          donationFor,
          dedicatedTo,
          message,
          isRecurring,
          donationFrequency,
          requestCertificate,
        },
        theme: {
          color: "#059669", // Emerald-600
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = () => {
      alert("Failed to load Razorpay SDK. Please try again later.");
    };
  };

  if (projects.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-gray-900">
        <p>Loading projects...</p>
      </main>
    );
  }

  const selectedProject = projects.find((p) => p._id === selectedProjectId);
  const donationTypes =
    selectedProject?.donationOptions?.filter((opt) => opt.isEnabled) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-800 to-emerald-950 text-white">
        <div
          className="absolute inset-0 opacity-15 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80')",
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative px-5 pb-14 pt-32 lg:pb-20 lg:pt-44">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <span className="eyebrow justify-center text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Give with intention
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                Make Your Donation
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-emerald-50/90 lg:text-2xl">
                Your generosity creates lasting change. Every rupee counts in
                building a better tomorrow.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:gap-8 lg:p-8">
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">10K+</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">Active Donors</div>
              </div>
              <div className="border-x border-white/20 text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">25K+</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">14</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">States Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Selection */}
      <section className="container-x max-w-6xl py-6">
        <div className="card-soft space-y-4 p-6">
          <div className="flex items-center space-x-2 font-display text-lg font-bold text-gray-900">
            <Heart className="h-5 w-5 text-emerald-600" />
            <span>Select Project</span>
          </div>
          <p className="text-sm text-gray-500">
            Choose the project you want to support with your donation
          </p>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="h-11 w-full rounded-xl border border-emerald-100 bg-white px-4 text-black outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
          >
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container-x max-w-6xl py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Choose Donation Type */}
          <div className="card-soft flex-1 space-y-4 p-6">
            <div className="flex items-center space-x-2 font-display text-lg font-bold text-gray-900">
              <Heart className="h-5 w-5 text-emerald-600" />
              <span>Choose Donation Type</span>
            </div>
            <p className="text-sm text-gray-500">
              Select the category that aligns with your intention
            </p>
            <div className="space-y-4">
              {donationTypes.map((opt) => (
                <label
                  key={opt.type}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer ${
                    donationType === opt.type
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="donationType"
                      value={opt.type}
                      checked={donationType === opt.type}
                      onChange={() => setDonationType(opt.type)}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    {opt.type === "General Donation" && (
                      <Heart className="h-5 w-5 text-emerald-600" />
                    )}
                    {opt.type === "Zakat" && (
                      <Gift className="h-5 w-5 text-blue-600" />
                    )}
                    {opt.type === "Sadqa" && (
                      <HandCoins className="h-5 w-5 text-orange-600" />
                    )}
                    {opt.type === "Interest Earnings" && (
                      <CircleDollarSign className="h-5 w-5 text-purple-600" />
                    )}
                    <span className="font-semibold text-gray-900">
                      {opt.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {opt.type === "General Donation" &&
                      "Support our overall mission"}
                    {opt.type === "Zakat" && "Islamic obligatory charity"}
                    {opt.type === "Sadqa" && "Voluntary Islamic charity"}
                    {opt.type === "Interest Earnings" && "Purify your wealth"}
                  </p>
                </label>
              ))}
            </div>
          </div>

          {/* Donation Dedication */}
          <div className="card-soft flex-1 space-y-4 p-6">
            <div className="flex items-center space-x-2 font-display text-lg font-bold text-gray-900">
              <Users className="h-5 w-5 text-emerald-600" />
              <span>Donation Dedication</span>
            </div>
            <p className="text-sm text-gray-500">Who is this donation for?</p>
            <div className="space-y-3">
              {[
                { value: "self", label: "For myself" },
                { value: "family", label: "On behalf of family member" },
                { value: "memory", label: "In memory of someone" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer ${
                    donationFor === option.value
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="donationFor"
                    value={option.value}
                    checked={donationFor === option.value}
                    onChange={() => setDonationFor(option.value)}
                    className="h-4 w-4 accent-emerald-600"
                  />
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {(donationFor === "family" || donationFor === "memory") && (
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  {donationFor === "family"
                    ? "Family member name"
                    : "In memory of"}
                </label>
                <input
                  type="text"
                  className="h-11 w-full rounded-xl border border-emerald-100 bg-white px-4 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder={
                    donationFor === "family"
                      ? "Enter family member name"
                      : "Enter name of loved one"
                  }
                  value={dedicatedTo}
                  onChange={(e) => setDedicatedTo(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block font-medium text-sm text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                rows="3"
                className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-2.5 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Add a personal message or prayer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-x max-w-6xl py-2">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Donation Frequency Card */}
          <div className="card-soft flex-1 space-y-4 p-6">
            <div className="flex items-center space-x-3">
              <Repeat className="h-6 w-6 text-emerald-600" />
              <h2 className="font-display text-lg font-bold text-gray-900">
                Choose Donation Frequency
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Select whether you'd like to make a recurring or one-time donation
            </p>
            <label className="flex items-start space-x-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 scale-125 accent-emerald-600"
                checked={isRecurring}
                onChange={() => setIsRecurring(!isRecurring)}
              />
              <div>
                <p className="font-medium text-gray-900">
                  Make this a recurring donation
                </p>
                <p className="text-sm text-gray-600">
                  Set up automatic donations to provide consistent support
                </p>
              </div>
            </label>
            {isRecurring && (
              <div className="mt-4 space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Select frequency:
                </label>
                <div className="space-y-2">
                  {["Daily", "Weekly", "Monthly"].map((freq) => (
                    <label key={freq} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="frequency"
                        value={freq}
                        checked={donationFrequency === freq}
                        onChange={() => setDonationFrequency(freq)}
                        className="h-4 w-4 accent-emerald-600"
                      />
                      <span className="text-gray-800">{freq}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  The minimum donation amount is ₹365 regardless of frequency.
                </p>
              </div>
            )}
          </div>

          {/* Tax Exemption Certificate Card */}
          <div className="card-soft flex-1 space-y-4 p-6">
            <div className="flex items-center space-x-3">
              <FileBadge className="h-6 w-6 text-emerald-600" />
              <h2 className="font-display text-lg font-bold text-gray-900">
                Tax Exemption Certificate
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Request a tax exemption certificate for your donation
            </p>
            <label className="flex items-start space-x-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 scale-125 accent-emerald-600"
                checked={requestCertificate}
                onChange={() => setRequestCertificate(!requestCertificate)}
              />
              <div>
                <p className="font-medium text-gray-900">
                  Generate Tax Exemption Certificate
                </p>
                <p className="text-sm text-gray-600">
                  Request an official tax exemption certificate for your
                  donation that can be used for tax deductions
                </p>
              </div>
            </label>
          </div>
        </div>
      </section>
      <section className="container-x max-w-6xl py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Choose Amount */}
          <div className="card-soft flex-1 space-y-4 p-6">
            <div className="flex items-center space-x-3">
              <IndianRupee className="h-6 w-6 text-emerald-600" />
              <h2 className="font-display text-lg font-bold text-gray-900">
                Choose Your {isRecurring ? donationFrequency : "One-Time"}{" "}
                Amount
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Select how much you'd like to donate{" "}
              {isRecurring && `on a ${donationFrequency.toLowerCase()} basis`}.
            </p>
            <div className="grid grid-cols-3 gap-3 text-black">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCustomAmount(amount)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-300 hover:bg-emerald-50 ${
                    customAmount === amount
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-gray-300"
                  }`}
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="mt-4 text-black">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Amount (Min ₹365)
              </label>
              <input
                type="number"
                min={365}
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="h-11 w-full rounded-xl border border-emerald-100 bg-white px-4 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum donation: ₹365
              </p>
            </div>
            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Your Contribution Impact
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="text-center">
                  <div className="font-bold text-lg">₹{impact.Daily}</div>
                  <div>Daily</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">₹{impact.Monthly}</div>
                  <div>Monthly</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">₹{impact.Yearly}</div>
                  <div>Yearly</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="mx-auto mb-16 mt-8 max-w-xl rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-emerald-900">
          Donation Summary
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500">Donation Type</span>
            <span className="font-medium">{donationType || "—"}</span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500">Donation Frequency</span>
            <span className="font-medium">
              {isRecurring ? donationFrequency : "One-Time"}
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500">
              {isRecurring ? `${donationFrequency} Amount` : "Amount"}
            </span>
            <span className="font-medium">₹{customAmount}</span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500">Project</span>
            <span className="font-semibold text-right">
              {selectedProject?.title || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500">Tax Certificate</span>
            <span className="font-medium">
              {requestCertificate ? "Requested" : "Not requested"}
            </span>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 py-3.5 font-semibold text-white shadow-[0_12px_28px_-12px_rgba(5,150,105,0.7)] transition-transform hover:-translate-y-0.5"
        >
          <Heart className="h-4 w-4" fill="currentColor" />
          Proceed to Payment →
        </button>
        <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center space-x-2">
          <img
            src="https://cdn.razorpay.com/logo.svg"
            alt="Razorpay"
            className="h-4 w-auto"
          />
          <span>Secure payment powered by Razorpay</span>
        </div>
      </section>
    </div>
  );
}
