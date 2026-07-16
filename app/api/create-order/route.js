// app/api/create-order/route.js
// Creates a Razorpay Order with auto-capture for one-time donations. The
// frontend opens checkout with the returned order_id, and Razorpay captures
// the payment automatically on success — no fragile manual capture step.
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { amount, notes } = await req.json();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 1) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
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

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(numericAmount * 100), // paise
        currency: "INR",
        payment_capture: 1, // auto-capture on payment success
        notes: notes || {},
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Order creation failed:", data);
      return NextResponse.json(
        { error: data?.error?.description || "Failed to create order." },
        { status: res.status }
      );
    }

    return NextResponse.json({ orderId: data.id, amount: data.amount });
  } catch (error) {
    console.error("create-order error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
