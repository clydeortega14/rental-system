import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface PromoModalProps {
  images: string[]; // array of PNG URLs
  show: boolean;
  onClose: () => void;
  overlayOpacity?: number; // 0 to 1, default 0.4
  showDots?: boolean; // new: control pager visibility
}

const SWIPE_THRESHOLD = 50; // px

const PromoModal: React.FC<PromoModalProps> = ({
  images,
  show,
  onClose,
  overlayOpacity = 0.4,
  showDots = false,
}) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  // disable background scroll when modal is open
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show]);

  // auto-advance every 2 seconds
  useEffect(() => {
    if (!show || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [show, images.length]);

  if (!show) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      prev();
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-2"
      style={{
        backgroundColor: `rgba(0,0,0,${overlayOpacity})`,
        backdropFilter: "blur(8px)",
        padding: "1rem",
      }}
    >
      <div className="relative rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col ">
        <button
          onClick={onClose}
          aria-label="Close promo"
          className="absolute top-3 right-3 p-2 rounded-full bg-jaba-yellow hover:bg-gray-200 transition"
        >
          <X size={20} />
        </button>

        <div
          className="flex flex-col flex-1 items-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex-1 p-4 flex items-center justify-center w-full">
            <img
              src={images[current]}
              alt={`Promo ${current + 1}`}
              className="max-h-[70vh] w-auto object-contain rounded shadow-inner"
              loading="lazy"
            />
          </div>
        </div>

        {/* Dots / pager (conditionally rendered) */}
        {showDots && images.length > 1 && (
          <div className="flex justify-center gap-2 py-3 px-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to promo ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition ${
                  idx === current ? "bg-brandYellow" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoModal;
