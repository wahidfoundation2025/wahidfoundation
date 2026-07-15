// app/api/razorpay-webhook/route.js
// Receives Razorpay subscription events. Configure this URL in the Razorpay
// dashboard (Settings -> Webhooks) with events: subscription.charged,
// subscription.cancelled, subscription.completed, subscription.halted — and set
// RAZORPAY_WEBHOOK_SECRET to the same secret you enter there.
import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers.get("x-razorpay-signature");
  const rawBody = await req.text();

  // Verify signature
  if (!secret || !signature) {
    return NextResponse.json({ error: "Not configured" }, { status: 400 });
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const event = payload.event;
  const sub = payload.payload?.subscription?.entity;
  const payment = payload.payload?.payment?.entity;
  const notes = sub?.notes || payment?.notes || {};
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  try {
    if (event === "subscription.charged" && payment) {
      // Record each auto-debited recurring charge (idempotent by paymentId).
      await fetch(`${apiBase}/save-donation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment.id,
          amount: Math.round((payment.amount || 0) / 100),
          donationType: notes.donationType || "General Donation",
          donationFrequency: notes.donationFrequency || "Recurring",
          projectId: notes.projectId,
          subscriptionId: sub?.id,
          subscriptionStatus: sub?.status || "active",
          name: notes.name || "Anonymous",
          email: notes.email || payment.email || "",
          dedicatedTo: notes.dedicatedTo,
          message: notes.message,
        }),
      });
    } else if (
      ["subscription.cancelled", "subscription.completed", "subscription.halted"].includes(
        event
      ) &&
      sub?.id
    ) {
      // Sync status change to the donation records.
      await fetch(`${apiBase}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: sub.id,
          status: sub.status || event.split(".")[1],
        }),
      });
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
    // Still return 200 so Razorpay doesn't retry indefinitely on our downstream issues.
  }

  return NextResponse.json({ received: true });
}
