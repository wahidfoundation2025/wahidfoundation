import Link from "next/link";

const defaultNavItems = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/donate", label: "Donate" },
  { path: "/impact", label: "Impact" },
  { path: "/about", label: "About" },
];

export default function FooterLinks({ footerData }) {
  const linkClass =
    "text-emerald-100/80 transition-colors hover:text-white";
  const headingClass =
    "mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300";

  return (
    <div className="flex w-full flex-col items-start gap-10 sm:flex-row sm:flex-wrap sm:gap-12 xl:gap-20 lg:w-auto">
      {/* Logo */}
      <div className="max-w-xs">
        <Link href="/" className="flex flex-row items-center gap-2">
          <img
            src="/logo.png"
            alt={`${footerData?.orgName || "Wahid Foundation"} Logo`}
            className="h-10 w-auto"
          />
          <span className="font-display text-2xl font-bold text-white">
            {footerData?.orgName || "Wahid"}
          </span>
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">
          Channeling Zakat &amp; Sadaqah with full transparency to empower
          backward and minority communities across India.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col items-start gap-2.5">
        <h2 className={headingClass}>Quick Links</h2>
        {(footerData?.quickLinks?.length > 0
          ? footerData.quickLinks
          : defaultNavItems
        ).map((item) => (
          <Link href={item.path} key={item.path} className={linkClass}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Terms */}
      <div className="flex flex-col items-start gap-2.5">
        <h2 className={headingClass}>Terms</h2>
        {(footerData?.termsLinks || []).map((item) => (
          <Link href={item.path} key={item.path} className={linkClass}>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Volunteering */}
      <div className="flex flex-col items-start gap-2.5">
        <h2 className={headingClass}>
          {footerData?.volunteering?.heading || "Volunteering"}
        </h2>
        <Link
          href={footerData?.volunteering?.linkPath || "/volunteer"}
          className={linkClass}
        >
          {footerData?.volunteering?.linkLabel || "Do you want to join?"}
        </Link>
      </div>
    </div>
  );
}
