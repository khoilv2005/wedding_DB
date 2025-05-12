// components/CallToActionSection.tsx
import React from 'react';
import Image from 'next/image';

interface CallToActionSectionProps {
  backgroundImageUrl?: string;
  scriptText?: string;
  mainText?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  backgroundImageUrl = "/wedding4.jpg", // THAY THẾ BẰNG ẢNH NỀN CỦA BẠN
  scriptText = "Looking",
  mainText = "for a professional team to take care of your wedding?",
  buttonText = "CONTACT US",
  buttonLink = "/contact",
}) => {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[550px]">
      {/* Ảnh nền */}
      <Image
        src={backgroundImageUrl}
        alt="Wedding background"
        layout="fill"
        objectFit="cover"
        quality={85}
        priority
      />

      {/* Lớp phủ tối màu nhẹ trên ảnh nền (TÙY CHỌN - nếu bạn muốn làm chữ trắng nổi bật hơn) */}
      {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}

      {/* Khối nội dung */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-8 sm:pb-12 md:pb-16 lg:pb-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
        {/*
          SỬ DỤNG MÀU CÓ SẴN CỦA TAILWIND CHO NỀN KHỐI NỘI DUNG:
          - `bg-white`: Nền trắng tinh, độ tương phản cao nhất.
          - `bg-gray-50`, `bg-gray-100`: Các màu xám rất nhạt, cũng có thể dùng.
          - `bg-opacity-90` (hoặc giá trị khác): Nếu muốn nền hơi trong suốt một chút (nhưng cẩn thận để không làm chữ khó đọc).
            Ví dụ: `bg-white bg-opacity-90`
        */}
        <div className="bg-white text-center p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full mx-4">
          {/*
            SỬ DỤNG MÀU CHỮ CÓ SẴN CỦA TAILWIND:
            - `text-black` hoặc `text-gray-900`: Cho chữ "Looking" để tối đa độ tương phản.
            - `text-gray-800` hoặc `text-gray-700`: Cho đoạn text chính.
          */}
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-black mb-2 md:mb-3">
            {scriptText}
          </h2>
          <p className="font-serif text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
            {mainText}
          </p>
          {/*
            NÚT BẤM:
            - Chọn màu nền và màu chữ có sẵn tương phản tốt.
            - Ví dụ: nền đen chữ trắng, hoặc nền xám đậm chữ trắng.
            - Màu nâu đỏ đậm như ảnh mẫu trước có thể khó tạo nếu không có màu tùy chỉnh.
              Bạn có thể chọn một màu gần giống từ bảng màu của Tailwind (ví dụ: `bg-red-800`, `bg-rose-700`, `bg-amber-800`
              nhưng chúng có thể không hoàn toàn giống).
              Hoặc đơn giản là dùng một màu tối cơ bản.
          */}
          <a
            href={buttonLink}
            className="inline-block bg-gray-800 text-white uppercase text-xs sm:text-sm font-semibold py-3 px-8 rounded-sm hover:bg-gray-700 transition-colors duration-300 tracking-wider"
            // Thay thế bg-custom-maroon bằng màu có sẵn, ví dụ: bg-gray-800
            // Nếu muốn thử màu đỏ/nâu có sẵn:
            // className="inline-block bg-red-700 text-white ..."
            // className="inline-block bg-rose-700 text-white ..."
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;