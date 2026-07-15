export const StorySection = ({ items, icons }) => (
  <div className="card-soft" style={{ transform: "none" }}>
    <div className="space-y-6 p-6 lg:space-y-8 lg:p-12">
      {items?.map((item, idx) => {
        const isEmerald = idx % 2 === 0;
        return (
          <div key={idx} className="flex items-start gap-4 lg:gap-6">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl lg:h-16 lg:w-16 ${
                isEmerald ? "bg-emerald-100" : "bg-amber-100"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center lg:h-8 lg:w-8 ${
                  isEmerald ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {icons[idx % icons.length]}
              </span>
            </div>
            <div className="space-y-2 lg:space-y-3">
              <h3 className="font-display font-bold text-emerald-900 lg:text-xl">
                {item?.title}
              </h3>
              <p className="leading-relaxed text-gray-600 lg:text-lg">
                {item?.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
