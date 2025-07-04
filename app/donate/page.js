import { Suspense } from "react";
import DonateClient from "../components/donate";

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading...</div>}>
      <DonateClient />
    </Suspense>
  );
}
