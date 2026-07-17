"use client";
import { useEffect, useState } from "react";
import { ImageIcon, X } from "lucide-react";

export default function ProjectGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Close on Escape + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selectedImage]);

  return (
    <section className="w-full">
      <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold text-emerald-900">
        <ImageIcon className="h-5 w-5" />
        <span>Project Gallery</span>
      </h2>

      {/* Grid gallery */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((url, idx) => (
          <button
            key={idx}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            onClick={() => setSelectedImage(url)}
          >
            <img
              src={url}
              alt={`Gallery image ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition hover:bg-white hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-h-[88vh] max-w-[92vw] rounded-2xl border-2 border-white object-contain shadow-2xl lg:border-4"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/70">
            Click outside or press Esc to close
          </p>
        </div>
      )}
    </section>
  );
}
