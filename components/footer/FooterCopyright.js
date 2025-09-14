export default function FooterCopyright({ text }) {
  return (
    <p className="text-center py-4 text-white text-sm md:text-base">
      {text || `All rights reserved - © ${new Date().getFullYear()}`}
    </p>
  );
}
