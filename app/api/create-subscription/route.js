// app/api/create-subscription/route.js
// Creates a Razorpay Plan + Subscription for recurring (autopay) donations.
// The frontend then opens Razorpay checkout with the returned subscription_id,
// which triggers the UPI Autopay / e-mandate flow and the first charge.
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Map the UI frequency -> Razorpay plan period + a sensible number of cycles.
// Donors can cancel anytime; total_count is just an upper bound.
const FREQUENCY_MAP = {
  weekly: { period: "weekly", interval: 1, totalCount: 520 }, // ~10 years
  monthly: { period: "monthly", interval: 1, totalCount: 120 }, // 10 years
  yearly: { period: "yearly", interval: 1, totalCount: 10 }, // 10 years
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, frequency, notes } = body;

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 365) {
      return NextResponse.json(
        { error: "Invalid amount (minimum ₹365)." },
        { status: 400 }
      );
    }

    const freqKey = String(frequency || "").toLowerCase();
    const plan = FREQUENCY_MAP[freqKey];
    if (!plan) {
      return NextResponse.json(
        { error: `Unsupported recurring frequency: ${frequency}` },
        { status: 400 }
      );
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are not configured." },
        { status: 500 }
      );
    }
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    };

    // 1) Create a Plan for this amount + frequency.
    const planRes = await fetch("https://api.razorpay.com/v1/plans", {
      method: "POST",
      headers,
      body: JSON.stringify({
        period: plan.period,
        interval: plan.interval,
        item: {
          name: `Wahid Foundation ${frequency} Donation`,
          amount: Math.round(numericAmount * 100), // paise
          currency: "INR",
        },
        notes: notes || {},
      }),
    });
    const planData = await planRes.json();
    if (!planRes.ok) {
      console.error("Plan creation failed:", planData);
      return NextResponse.json(
        { error: planData?.error?.description || "Failed to create plan." },
        { status: planRes.status }
      );
    }

    // 2) Create a Subscription against that Plan.
    const subRes = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        plan_id: planData.id,
        total_count: plan.totalCount,
        quantity: 1,
        customer_notify: 1,
        notes: notes || {},
      }),
    });
    const subData = await subRes.json();
    if (!subRes.ok) {
      console.error("Subscription creation failed:", subData);
      return NextResponse.json(
        {
          error:
            subData?.error?.description || "Failed to create subscription.",
        },
        { status: subRes.status }
      );
    }

    return NextResponse.json({
      subscriptionId: subData.id,
      planId: planData.id,
      status: subData.status,
    });
  } catch (error) {
    console.error("create-subscription error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
