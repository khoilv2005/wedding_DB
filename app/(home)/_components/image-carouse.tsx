"use client"; // Component này sử dụng hooks, cần client-side rendering

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

// Cập nhật đường dẫn đến hình ảnh của bạn
const IMAGE_PATHS = [
  '/logo.jpg',
  '/wedding1.jpg',
  '/wedding2.jpg',
];

export function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }); // loop: true để cuộn vô hạn

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full select-none">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {IMAGE_PATHS.map((src, index) => (
            <div
              className="relative flex-[0_0_100%] min-w-0 h-[calc(100vh-5rem)]" // Chiều cao carousel (100vh trừ chiều cao navbar ước tính là 5rem)
              key={index}
            >
              <Image
                src={src}
                alt={`Trang trí tiệc cưới ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }} // Đảm bảo ảnh che phủ toàn bộ slide
                priority={index === 0} // Ưu tiên tải ảnh đầu tiên
                sizes="(max-width: 768px) 100vw, 100vw" // Giúp Next.js tối ưu ảnh
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nút điều hướng */}
      <button
        aria-label="Ảnh trước"
        className="absolute top-1/2 left-3 sm:left-5 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-black/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        onClick={scrollPrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        aria-label="Ảnh kế tiếp"
        className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-black/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        onClick={scrollNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}