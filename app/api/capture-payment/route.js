// app/api/capture-payment/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { paymentId, amount } = body;

    if (!paymentId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: paymentId or amount" },
        { status: 400 }
      );
    }

    // Razorpay creds from env
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch(
      `https://api.razorpay.com/v1/payments/${paymentId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amount * 100, // in paise
          currency: "INR",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.description || "Capture failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Capture API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
