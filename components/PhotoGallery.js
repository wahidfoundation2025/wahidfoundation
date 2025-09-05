"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

export default function ProjectGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="px-4 max-w-sm w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center space-x-2">
        <ImageIcon className="w-5 h-5" />
        <span>Project Gallery</span>
      </h2>

      {/* Grid gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer group"
            onClick={() => setSelectedImage(url)}
          >
            <img
              src={url}
              alt={`Gallery Image ${idx + 1}`}
              className="rounded-lg h-20 w-30 object-cover"
            />
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg border-2 lg:border-8 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
