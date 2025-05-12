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
  imageSide?: 'left' | 'right'; // Thêm prop để đảo vị trí ảnh
  backgroundColor?: string; // Thêm prop cho màu nền section
  textColor?: string; // Thêm prop cho màu chữ đoạn văn
  title1Color?: string; // Màu cho dòng tiêu đề 1
  title2Color?: string; // Màu cho dòng tiêu đề 2 (script)
}

const OurApproachSection: React.FC<OurApproachSectionProps> = ({
  titleLine1 = "Our",
  titleLine2Script = "Story",
  paragraph1 = "We are a team of talented, ambitious planners who are passionate about helping couples create their weddings. Each member of the team is a unique personality but shares the same mindset, vision and professionalism.",
  paragraph2 = "At The Planners, we perceive a wedding as a party of emotions, tasteful decoration, captivating activities and unforgettable moments. We are all driven by the joy of standing behind one’s most blissful day, creating lifetime moments and doing the magic of turning one’s dream into reality. Being a wedding planner allows us to fulfill our passion.",
  imageUrl = "/wedding4.jpg",
  imageAlt = "Default image description",
  imageSide = "right", // Mặc định ảnh bên phải
  backgroundColor = "bg-white",
  textColor = "text-gray-600",
  title1Color = "text-gray-500",
  title2Color = "text-gray-800",
}) => {
  const textOrderClass = imageSide === 'left' ? 'md:order-2' : 'md:order-1';
  const imageOrderClass = imageSide === 'left' ? 'md:order-1' : 'md:order-2';

  return (
    <div className={`${backgroundColor} py-12 md:py-16 lg:py-24`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 xl:gap-16">

          {/* Cột nội dung text */}
          <div className={`md:w-1/2 lg:w-[45%] xl:w-2/5 text-center md:text-left ${textOrderClass}`}>
            <h2 className={`font-serif text-3xl sm:text-4xl ${title1Color} mb-0 md:-mb-2 lg:-mb-3`}>
              {titleLine1}
            </h2>
            <h3 className={`font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${title2Color} mb-6 sm:mb-8 md:mb-10`}>
              {titleLine2Script}
            </h3>
            <p className={`font-sans ${textColor} text-sm sm:text-base leading-relaxed mb-6`}>
              {paragraph1}
            </p>
            <p className={`font-sans ${textColor} text-sm sm:text-base leading-relaxed`}>
              {paragraph2}
            </p>
          </div>

          {/* Cột ảnh */}
          <div className={`md:w-1/2 lg:w-[55%] xl:w-3/5 ${imageOrderClass}`}>
            <div className="relative w-full aspect-[3/3.8] sm:aspect-[4/4.2] md:aspect-[4/4.5] rounded-md overflow-hidden shadow-lg">
              {/* Điều chỉnh aspect ratio nếu cần cho ảnh "Our Story" */}
              <Image
                src={imageUrl}
                alt={imageAlt}
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

export default OurApproachSection;