export default function FooterCopyright({ text }) {
  return (
    <p className="py-5 text-center text-sm text-emerald-100/60">
      {text || `All rights reserved · © ${new Date().getFullYear()} Wahid Foundation`}
    </p>
  );
}
