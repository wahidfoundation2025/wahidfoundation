import { Mail, Phone, MapPin } from "lucide-react";

export default function FooterContact() {
  return (
    <div className="space-y-3 text-sm text-emerald-100/80">
      <p className="flex items-center gap-2.5">
        <Mail className="h-5 w-5 shrink-0 text-emerald-300" />
        <a href="mailto:info@wahid.org.in" className="hover:text-white hover:underline">
          info@wahid.org.in
        </a>
      </p>
      <p className="flex items-center gap-2.5">
        <Phone className="h-5 w-5 shrink-0 text-emerald-300" />
        <a href="tel:+919480389296" className="hover:text-white hover:underline">
          +91 9480389296
        </a>
      </p>
      <p className="flex items-start gap-2.5">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
        <span>
          Paramount Avenue, 63/1, 3rd floor,
          <br />
          Mosque road cross, Frazer town,
          <br />
          Bangalore 560005
        </span>
      </p>
    </div>
  );
}
