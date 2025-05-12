// components/OurApproachSection.tsx
import React from 'react';
import Image from 'next/image';

interface OurApproachSectionProps {
  titleLine1?: string;
  titleLine2Script?: string;
  paragraph1?: string;
  paragraph2?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageSide?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  title1Color?: string;
  title2Color?: string;
  aspectRatioClass?: string; // Prop mới cho tỷ lệ khung hình
}

const OurBelow: React.FC<OurApproachSectionProps> = ({
  titleLine1 = "", // Mặc định là trống
  titleLine2Script = "", // Mặc định là trống
  paragraph1 = "We have a big dream of exploring more beautiful destinations in Vietnam to hold weddings and to promote Vietnam as one of the best destinations for weddings in South East Asia. Being recognized as the most well-known name in planning destination weddings in Vietnam, over the past decade, we have carried out numerous amazing weddings in Hanoi, Danang, Nha Trang, Ho Chi Minh city, Phu Quoc island and more.",
  paragraph2 = "Our bigger goal is to grow The Planners as an international wedding planner that plans weddings around the world.",
  imageUrl = "/wedding1.jpg",
  imageAlt = "Default image description",
  imageSide = "left",
  backgroundColor = "bg-white",
  textColor = "text-gray-700", // Sử dụng màu mặc định tốt hơn là gray-600
  title1Color = "text-gray-500",
  title2Color = "text-brand-text-secondary", // Sử dụng màu đã định nghĩa
  aspectRatioClass = "aspect-[4/3.5]", // Tỷ lệ mặc định, bạn có thể thay đổi khi gọi component
}) => {
  const textOrderClass = imageSide === 'left' ? 'md:order-2' : 'md:order-1';
  const imageOrderClass = imageSide === 'left' ? 'md:order-1' : 'md:order-2';

  // Kiểm tra xem có tiêu đề nào được cung cấp không
  const hasTitle1 = titleLine1 && titleLine1.trim() !== "";
  const hasTitle2Script = titleLine2Script && titleLine2Script.trim() !== "";

  return (
    <div className={`${backgroundColor} py-12 md:py-16 lg:py-24`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 xl:gap-16">

          {/* Cột Ảnh (đặt trước trong JSX để dễ quản lý thứ tự trên mobile nếu cần) */}
          <div className={`md:w-1/2 lg:w-[55%] xl:w-3/5 ${imageOrderClass}`}>
            <div className={`relative w-full ${aspectRatioClass} rounded-md overflow-hidden shadow-lg`}>
              <Image
                src={imageUrl}
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 55vw" // Gợi ý cho next/image
              />
            </div>
          </div>

          {/* Cột Nội dung Text */}
          <div className={`md:w-1/2 lg:w-[45%] xl:w-2/5 text-center md:text-left ${textOrderClass} flex flex-col justify-center`}> {/* Thêm justify-center */}
            {hasTitle1 && (
              <h2 className={`font-serif text-3xl sm:text-4xl ${title1Color} ${hasTitle2Script ? 'mb-0 md:-mb-2 lg:-mb-3' : 'mb-6 sm:mb-8'}`}>
                {titleLine1}
              </h2>
            )}
            {hasTitle2Script && (
              <h3 className={`font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${title2Color} mb-6 sm:mb-8 md:mb-10`}>
                {titleLine2Script}
              </h3>
            )}
            {/* Đảm bảo có khoảng cách trên cho đoạn văn nếu không có tiêu đề nào */}
            <div className={`${(!hasTitle1 && !hasTitle2Script) ? 'mt-0' : ''}`}>
              <p className={`font-sans ${textColor} text-sm sm:text-base leading-relaxed mb-6`}>
                {paragraph1}
              </p>
              {paragraph2 && paragraph2.trim() !== "" && ( // Chỉ render đoạn 2 nếu có nội dung
                <p className={`font-sans ${textColor} text-sm sm:text-base leading-relaxed`}>
                  {paragraph2}
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurBelow;