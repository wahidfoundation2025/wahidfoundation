import DonatePage from "../../components/DonateClient";

export default async function DonationPage({ searchParams }) {
  const params = await searchParams;
  return <DonatePage searchParams={params} />;
}