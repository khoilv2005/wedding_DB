// components/TwoWeddingImagesSection.tsx
import React from 'react';
import Image from 'next/image';

interface ImageInfo {
  src: string;
  alt: string;
}

interface TwoWeddingImagesSectionProps {
  imageLeft?: ImageInfo;
  imageRight?: ImageInfo;
  // Bạn có thể đặt chiều cao mong muốn qua props nếu muốn linh hoạt hơn
  imageHeightClass?: string; // Ví dụ: "h-[300px] sm:h-[400px] md:h-[500px]"
}

const TwoWeddingImagesSection: React.FC<TwoWeddingImagesSectionProps> = ({
  imageLeft = { src: "/wedding1.jpg", alt: "Outdoor Indian Wedding Ceremony" },
  imageRight = { src: "/wedding4.jpg", alt: "Luxury Indoor Wedding Reception" },
  // Chiều cao mặc định nếu không được truyền qua props
  imageHeightClass = "h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px]", // Điều chỉnh các giá trị này
}) => {
  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Ảnh bên trái */}
          <div className="w-full md:w-1/2">
            {/*
              Bỏ class aspect ratio, thay bằng class chiều cao cố định.
              `relative` và `overflow-hidden` vẫn cần thiết cho next/image layout="fill".
            */}
            <div className={`relative w-full ${imageHeightClass} rounded-lg overflow-hidden shadow-lg`}>
              <Image
                src={imageLeft.src}
                alt={imageLeft.alt}
                layout="fill"
                objectFit="cover" // 'cover' sẽ lấp đầy và cắt nếu cần, 'contain' sẽ hiển thị toàn bộ ảnh và có thể để lại khoảng trống
                quality={85}
              />
            </div>
          </div>

          {/* Ảnh bên phải */}
          <div className="w-full md:w-1/2">
            <div className={`relative w-full ${imageHeightClass} rounded-lg overflow-hidden shadow-lg`}>
              <Image
                src={imageRight.src}
                alt={imageRight.alt}
                layout="fill"
                objectFit="cover"
                quality={85}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoWeddingImagesSection;