import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Carousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const intervalRef = useRef(null);
  const slideshowRef = useRef(null);

  // Auto advance main carousel
  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 8000);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, items.length]);

  // Slideshow on hover
  useEffect(() => {
    if (hovered) {
      // Advance image immediately
      setSlideIndex((prev) => (prev + 1) % items[activeIndex].images.length);
  
      // Then continue at intervals
      slideshowRef.current = setInterval(() => {
        setSlideIndex((prev) => (prev + 1) % items[activeIndex].images.length);
      }, 3000);
    } else {
      setSlideIndex(0);
    }
  
    return () => clearInterval(slideshowRef.current);
  }, [hovered, activeIndex, items]);
  

  const goTo = (index) => {
    setActiveIndex(index);
    setSlideIndex(0);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Carousel content */}
      <div className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center px-4"
          >

            {/* Item container */}
            <div className="w-full h-[70vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.images[slideIndex]}
                  src={item.images[slideIndex]}
                  alt={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-full max-h-full object-contain"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </AnimatePresence>
            </div>

            {/* Item text/description */}
            <div className="text-center mt-5">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-base text-black">{item.description}</p>
            </div>
            
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="w-full flex justify-center gap-2 pb-4 mt-8">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-full ${idx === activeIndex ? "bg-gray-700" : "bg-gray-200"} transition-all`}
          />
        ))}
      </div>

    </div>
  );
}

export default Carousel;
