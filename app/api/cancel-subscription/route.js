// app/api/cancel-subscription/route.js
// Cancels a Razorpay subscription (stops future autopay charges) and asks the
// backend to mark the donor's matching donation records as cancelled.
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { subscriptionId, cancelAtCycleEnd = false } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Missing subscriptionId." },
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

    const rzpRes = await fetch(
      `https://api.razorpay.com/v1/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({ cancel_at_cycle_end: cancelAtCycleEnd ? 1 : 0 }),
      }
    );
    const rzpData = await rzpRes.json();
    if (!rzpRes.ok) {
      console.error("Razorpay cancel failed:", rzpData);
      return NextResponse.json(
        {
          error:
            rzpData?.error?.description || "Failed to cancel subscription.",
        },
        { status: rzpRes.status }
      );
    }

    // Best-effort: mark the donation records cancelled in the backend.
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId,
          status: rzpData.status || "cancelled",
        }),
      });
    } catch (err) {
      console.error("Failed to sync cancellation to backend:", err);
    }

    return NextResponse.json({ success: true, status: rzpData.status });
  } catch (error) {
    console.error("cancel-subscription error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
