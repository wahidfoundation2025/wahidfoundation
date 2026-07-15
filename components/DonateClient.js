"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Users,
  Gift,
  HandCoins,
  CircleDollarSign,
  IndianRupee,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DonatePage({ searchParams }) {
  const { projectId, type, amount, frequency } = searchParams;
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const [isRazorpayReady, setIsRazorpayReady] = useState(false);

  const [isRecurring, setIsRecurring] = useState(
    frequency != "One-Time" ? true : false
  );
  const [donationFrequency, setDonationFrequency] = useState(
    frequency ?? "One-Time"
  );
  const [requestCertificate, setRequestCertificate] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);
  const [customAmount, setCustomAmount] = useState(amount ?? 365);
  const [donationType, setDonationType] = useState(type ?? "Zakat");
  const [showRecurringConfirm, setShowRecurringConfirm] = useState(false);
  const quickAmounts = [1000, 2500, 5000, 10000, 15000, 25000];
  const impact = isRecurring
    ? {
        Monthly:
          donationFrequency === "Monthly"
            ? customAmount
            : donationFrequency === "Yearly"
            ? (customAmount / 12).toFixed(0)
            : (customAmount * 4).toFixed(0),
        Weekly:
          donationFrequency === "Weekly"
            ? customAmount
            : donationFrequency === "Monthly"
            ? (customAmount / 4).toFixed(0)
            : (customAmount * 13).toFixed(0),
        Yearly:
          donationFrequency === "Yearly"
            ? customAmount
            : donationFrequency === "Monthly"
            ? (customAmount * 12).toFixed(0)
            : (customAmount * 52).toFixed(0),
      }
    : {};
  const [donationFor, setDonationFor] = useState("self");
  const [dedicatedTo, setDedicatedTo] = useState("");
  const [message, setMessage] = useState("");
  const name = user?.fullName || "Anonymous";
  const email = user?.emailAddresses[0]?.emailAddress || "";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?status=Active`, {
      next: { revalidate: 3600 },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects || []);

        if (!data.projects?.some((p) => p._id === projectId)) {
          setSelectedProjectId(data.projects?.[0]?._id || "");
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, [projectId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setIsRazorpayReady(true);
    script.onerror = () => console.error("Razorpay SDK failed to load");

    document.body.appendChild(script);

    // remove script on unmount
    return () => script.remove();
  }, []);

  const handlePayment = () => {
    if (!isSignedIn) {
      router.push("/login");
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

    if (!customAmount || customAmount < 365) {
      alert("Please enter a valid donation amount (minimum ₹365).");
      return;
    }

    if (!isRecurring) {
      setShowRecurringConfirm(true);
      return;
    }

    if (!isRazorpayReady) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }

    const selectedProject = projects.find((p) => p._id === selectedProjectId);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: customAmount * 100,
      currency: "INR",
      name: "Wahid Foundation",
      description: `Donation for ${selectedProject?.title || "General Fund"}`,
      handler: async (response) => {
        console.log("Payment success:", response);
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );

        try {
          // 1️⃣ Capture the payment via backend
          const captureRes = await fetch("/api/capture-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              amount: customAmount,
            }),
          });

          const captureData = await captureRes.json();
          if (!captureRes.ok) {
            console.error("Capture failed:", captureData);
            alert("Payment capture failed! Please contact support.");
            return;
          }

          console.log("Payment captured:", captureData);

          // 2️⃣ Save donation record in your DB
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-donation`, {
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
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log("Donation saved:", data))
            .catch((err) => console.error("Failed to save donation:", err));
        } catch (err) {
          console.error("Error during capture or save:", err);
        }
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
        color: "#059669",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:gap-8 lg:p-8">
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">10K+</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">
                  Active Donors
                </div>
              </div>
              <div className="border-x border-white/20 text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">25K+</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">
                  Lives Impacted
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">14</div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-base">
                  States Reached
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x max-w-6xl py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start">
          {/* RIGHT column: form (first on mobile) */}
          <div className="order-1 space-y-6 lg:order-2">
            {/* Project Selection */}
            <div className="card-soft space-y-4 p-6" style={{ transform: "none" }}>
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
            {projects?.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
            </div>

            {/* Donation Type + Dedication */}
            <div className="grid gap-6 md:grid-cols-2">
          {/* Choose Donation Type */}
          <div className="card-soft space-y-4 p-6" style={{ transform: "none" }}>
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
          <div className="card-soft flex-1 space-y-4 p-6" style={{ transform: "none" }}>
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
                  <span className="font-medium text-right truncate text-gray-900">
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

            {/* Choose Amount */}
            <div className="card-soft space-y-4 p-6" style={{ transform: "none" }}>
            <div className="flex items-center space-x-3">
              <IndianRupee className="h-6 w-6 text-emerald-600" />
              <h2 className="font-display text-lg font-bold text-gray-900">
                Choose Your Amount
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Select how much you'd like to donate
              {isRecurring && ` on a ${donationFrequency.toLowerCase()} basis`}.
            </p>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Donation Frequency
              </label>
              <div className="flex flex-wrap space-x-4">
                {["One-Time", "Weekly", "Monthly", "Yearly"].map((freq) => (
                  <label key={freq} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={
                        freq === "One-Time"
                          ? !isRecurring
                          : donationFrequency === freq
                      }
                      onChange={() => {
                        if (freq === "One-Time") {
                          setIsRecurring(false);
                        } else {
                          setIsRecurring(true);
                          setDonationFrequency(freq);
                        }
                      }}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <span className="text-gray-800">{freq}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-black">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCustomAmount(amount)}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-emerald-300 hover:bg-emerald-50 ${
                    customAmount === amount
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-gray-200"
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
            {isRecurring && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Your Contribution Impact
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="text-center">
                    <div className="font-bold text-lg">₹{impact.Weekly}</div>
                    <div>Weekly</div>
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
            )}
            </div>
          </div>

          {/* LEFT column: Donation Summary (bottom on mobile, sticky left on desktop) */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-6 shadow-sm sm:p-8">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-emerald-900">
          Donation Summary
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="grid grid-cols-2 bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500 truncate">Donation Type</span>
            <span className="font-medium text-right truncate">
              {donationType || "—"}
            </span>
          </div>
          <div className="grid grid-cols-2 bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500 truncate">Donation Frequency</span>
            <span className="font-medium text-right truncate">
              {isRecurring ? donationFrequency : "One-Time"}
            </span>
          </div>
          <div className="grid grid-cols-2 bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500 truncate">
              {isRecurring ? `${donationFrequency} Amount` : "Amount"}
            </span>
            <span className="font-medium text-right truncate">
              ₹{customAmount}
            </span>
          </div>
          <div className="grid grid-cols-2 bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500 truncate">Project</span>
            <span className="font-semibold text-right truncate">
              {selectedProject?.title || "—"}
            </span>
          </div>
          <div className="grid grid-cols-2 bg-white rounded-lg px-4 py-2">
            <span className="text-gray-500 truncate">Tax Certificate</span>
            <span className="font-medium text-right truncate">
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
            </div>
          </div>
        </div>
      </div>

     {/* Recurring Confirmation Popup */}
{showRecurringConfirm && (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <h3 className="mb-4 font-display text-xl font-bold text-gray-900">
        Confirm One-Time Donation
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        You have selected a one-time donation. Would you like to make this
        a recurring donation for consistent support?
      </p>
      <div className="flex flex-col justify-end gap-3 sm:flex-row">
        <button
          onClick={() => {
            setShowRecurringConfirm(false);
            handlePayment();
          }}
          className="rounded-full bg-gray-100 px-5 py-2.5 font-semibold text-gray-800 transition hover:bg-gray-200"
        >
          Continue with One-Time
        </button>
        <button
          onClick={() => {
            setIsRecurring(true);
            setDonationFrequency("Monthly");
            setShowRecurringConfirm(false);
            handlePayment();
          }}
          className="rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-2.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Make it Recurring
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
