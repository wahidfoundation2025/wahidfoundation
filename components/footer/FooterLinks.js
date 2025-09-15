import Link from "next/link";

const defaultNavItems = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/donate", label: "Donate" },
  { path: "/impact", label: "Impact" },
  { path: "/about", label: "About" },
];

export default function FooterLinks({ footerData }) {
  return (
    <div className="flex md:flex-row flex-col items-start gap-4 sm:gap-10 xl:gap-20 w-full lg:w-auto">
      {/* Logo */}
      <div className="flex flex-row items-center gap-2">
        <img
          src="/logo.png"
          alt={`${footerData?.orgName || "Wahid Foundation"} Logo`}
          className="h-10 w-auto"
        />
        <Link href="/" className="flex items-center space-x-1">
          <span className="text-xl font-bold text-white">
            {footerData?.orgName || "Wahid"}
          </span>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-lg font-semibold mb-2 text-white">Quick Links</h1>
        {(footerData?.quickLinks?.length > 0
          ? footerData.quickLinks
          : defaultNavItems
        ).map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className="text-white hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Terms */}
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-lg font-semibold mb-2 text-white">Terms</h1>
        {(footerData?.termsLinks || []).map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className="text-white hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Volunteering */}
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-lg font-semibold mb-2 text-white">
          {footerData?.volunteering?.heading || "Volunteering"}
        </h1>
        <Link
          href={footerData?.volunteering?.linkPath || "/volunteer"}
          className="text-white hover:underline"
        >
          {footerData?.volunteering?.linkLabel || "Do you want to join?"}
        </Link>
      </div>
    </div>
  );
}
