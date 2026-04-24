import { useState } from "react";

const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export default function ImageCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const length = images.length;

  const right = () => {
    setActiveIdx((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const left = () => {
    setActiveIdx((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {/* Image Wrapper */}
      <div className="relative overflow-hidden">
        {images.map(({ alt, src }, index) => (
          <img
            key={src}
            alt={alt}
            src={src}
            className={`w-full rounded-lg ${
              index === activeIdx ? "block" : "hidden"
            }`}
          />
        ))}

        {/* Left Arrow */}
        <button
          onClick={left}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white text-xl px-3 py-2 rounded-full hover:bg-black/80"
        >
          &lt;
        </button>

        {/* Right Arrow */}
        <button
          onClick={right}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white text-xl px-3 py-2 rounded-full hover:bg-black/80"
        >
          &gt;
        </button>
      </div>

      {/* Dots */}
      <div className="text-center mt-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setActiveIdx(index)}
            className={`inline-block h-3 w-3 mx-1 rounded-full cursor-pointer ${
              index === activeIdx ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}