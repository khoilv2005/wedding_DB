// components/TestimonialSection.tsx
"use client"; // Có thể cần nếu bạn thêm slider sau này

import React from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  thumbnailSrc: string;
  quote: string;
  author: string;
}

interface TestimonialSectionProps {
  reviews?: Review[]; // Truyền mảng review nếu muốn linh hoạt
  title?: string;
  viewPressLink?: string;
  viewPraiseLink?: string;
}

// Dữ liệu review mặc định nếu không truyền props
const defaultReviews: Review[] = [
  {
    id: 1,
    thumbnailSrc: "/logo.jpg", // THAY THẾ BẰNG ẢNH THẬT
    quote: "We are still in awe of the magic you created for us. It's hard to believe that such a perfect, love-filled day was real - and we owe it all to you. From start to finish, you poured your hearts...",
    author: "- Chi & Quốc -",
  },
  {
    id: 2,
    thumbnailSrc: "/reviews/thumb_eric_helen.jpg", // THAY THẾ BẰNG ẢNH THẬT
    quote: "We have watched the wedding videos a hundred times! We simply feel so lucky to have you as our wedding planner. Our friends also praised your team a lot. It was incredible to have a wedding theme that fitted InterContinental...",
    author: "- Eric & Helen -",
  },
  {
    id: 1,
    thumbnailSrc: "/logo.jpg", // THAY THẾ BẰNG ẢNH THẬT
    quote: "We are still in awe of the magic you created for us. It's hard to believe that such a perfect, love-filled day was real - and we owe it all to you. From start to finish, you poured your hearts...",
    author: "- Chi & Quốc -",
  },
];

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  reviews = defaultReviews,
  title = "| PRESS & PRAISE |",
  viewPressLink = "#press",
  viewPraiseLink = "#praise",
}) => {
  // Hiện tại chỉ hiển thị 2 review đầu tiên. Nếu làm slider thì sẽ phức tạp hơn.
  const displayedReviews = reviews.slice(0, 2);

  return (
    <div className="w-full py-12 sm:py-16 md:py-20 bg-white"> {/* Màu nền của section */}
      <div className="container mx-auto px-4">
        {/* Tiêu đề Section */}
        {title && (
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-10 sm:mb-12 md:mb-16 text-center">
            {title}
          </h3>
        )}

        {/* Phần chứa các review và nút điều hướng (nếu có slider) */}
        <div className="relative">
          {/* Nút điều hướng trái (cho slider) - Hiện tại chỉ là placeholder trực quan */}
          <button
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-5xl text-gray-300 hover:text-gray-500 transition-colors hidden md:block -ml-4 lg:-ml-8"
            // onClick={() => {/* Xử lý chuyển slide trước */}}
          >
            &lt; {/* Dấu < */}
          </button>

          {/* Grid chứa các review */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {displayedReviews.map((review) => (
              <div key={review.id} className="text-center flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-6 shadow-md">
                  <Image
                    src={review.thumbnailSrc}
                    alt={`Thumbnail for ${review.author}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed mb-4 px-2 sm:px-4">
                  &ldquo;{review.quote}&rdquo; {/* Dấu nháy kép */}
                </p>
                <p className="text-gray-800 font-semibold text-sm">
                  {review.author}
                </p>
              </div>
            ))}
          </div>

          {/* Nút điều hướng phải (cho slider) - Hiện tại chỉ là placeholder trực quan */}
          <button
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-5xl text-gray-300 hover:text-gray-500 transition-colors hidden md:block -mr-4 lg:-mr-8"
            // onClick={() => {/* Xử lý chuyển slide sau */}}
          >
            &gt; {/* Dấu > */}
          </button>
        </div>

        {/* Các nút bấm dưới */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={viewPressLink}
            className="px-8 py-3 border border-gray-700 text-gray-700 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-gray-700 hover:text-white transition-colors duration-300"
          >
            VIEW PRESS
          </a>
          <a
            href={viewPraiseLink}
            className="px-8 py-3 bg-gray-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-gray-700 transition-colors duration-300"
            style={{ backgroundColor: '#5a2d2d' }} // Màu nâu đậm như ảnh mẫu, bạn có thể tạo class Tailwind tùy chỉnh
          >
            VIEW PRAISE
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;  