import { Mail, Phone, MapPin } from "lucide-react";

export default function FooterContact() {
  return (
    <div className="text-white text-sm space-y-3">
      <p className="flex items-center gap-2">
        <Mail className="w-5 h-5" />
        <a href="mailto:info@wahid.org.in" className="hover:underline">
          info@wahid.org.in
        </a>
      </p>
      <p className="flex items-center gap-2">
        <Phone className="w-5 h-5" />
        <a href="tel:+919480389296" className="hover:underline">
          +91 9480389296
        </a>
      </p>
      <p className="flex items-start gap-2">
        <MapPin className="w-5 h-5 mt-0.5" />
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
