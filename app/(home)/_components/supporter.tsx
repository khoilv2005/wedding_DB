// components/LogoScroller.tsx
"use client"; // Vẫn là client component nếu có tương tác hoặc state sau này

import React from 'react';
import Image from 'next/image';

interface Logo {
  id: number;
  src: string;
  alt: string;
}

const allLogosData: Logo[] = [
  { id: 1, src: "/logo.jpg", alt: "Lotte Hotels & Resorts" },
  { id: 2, src: "/logos/logo_m.png", alt: "Logo M" },
  { id: 3, src: "/logos/lane.png", alt: "Lane" },
  { id: 4, src: "/logos/the_anam.png", alt: "The Anam" },
  { id: 5, src: "/logos/nam_nghi.png", alt: "Nam Nghi" },
  { id: 6, src: "/logos/tuta.png", alt: "Tuta Makeup Academy" },
  { id: 7, src: "/logos/jw_marriott.png", alt: "JW Marriott" },
  { id: 8, src: "/logos/logo8.png", alt: "Logo Đối Tác 8" },
  { id: 9, src: "/logos/logo9.png", alt: "Logo Đối Tác 9" },
  { id: 10, src: "/logos/logo10.png", alt: "Logo Đối Tác 10" },
];

interface LogoScrollerProps {
  title?: string;
}

const LogoScroller: React.FC<LogoScrollerProps> = ({
  title = "WE HAVE WORKED WITH...",
}) => {
  const logosToUse = allLogosData;

  if (!logosToUse || logosToUse.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8 sm:py-12 bg-gray-50"> {/* Nền tương tự ảnh mẫu */}
      <div className="container mx-auto px-4">
        {title && (
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8 sm:mb-10 text-center">
            {title}
          </h3>
        )}
        {/*
          Container cho phép scroll ngang:
          - `overflow-x-auto`: Cho phép scroll ngang khi nội dung vượt quá.
          - `flex`: Để các logo xếp hàng ngang.
          - `space-x-...`: Khoảng cách giữa các logo.
          - `pb-4`: Thêm padding bottom để thanh scroll không che mất logo (nếu thanh scroll hiện).
          - `scrollbar-hide` (tùy chọn): Một class tùy chỉnh hoặc plugin Tailwind để ẩn thanh scroll.
            Nếu không có, trình duyệt sẽ hiển thị thanh scroll mặc định.
        */}
        <div className="flex overflow-x-auto space-x-8 sm:space-x-12 md:space-x-16 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {logosToUse.map((logo) => (
            <div
              key={logo.id}
              // `min-w-[value]` đảm bảo mỗi logo có chiều rộng tối thiểu,
              // giúp việc scroll dễ dàng hơn và các logo không bị co quá nhỏ.
              // Giá trị này nên lớn hơn hoặc bằng chiều rộng thực tế của logo.
              className="flex-shrink-0 min-w-[100px] sm:min-w-[130px] md:min-w-[160px]"
            >
              <div className="relative h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 mx-auto"> {/* mx-auto nếu min-w lớn hơn w thực tế */}
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoScroller;