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
}

const OurApproach: React.FC<OurApproachSectionProps> = ({
  titleLine1 = "Our",
  titleLine2Script = "Approach",
  paragraph1 = "The Planners is a full-service wedding planning and consultancy firm that creates extraordinary celebrations for clients from all over the world. With 4 offices located in Hanoi, Danang, Saigon and Halong, we serve local and overseas clients who value professional assistance in planning their weddings in locations across Vietnam and outside the country.",
  paragraph2 = "Our work is developed on the balance of dreams and reality. We pride ourselves in our personal approach towards weddings and how closely we work with our couples. More than delivering a service, we build a strong connection between the wedding planner and the couple to understand their needs, dreams and vision for their love celebration.",
  imageUrl = "/wedding3.jpg", // THAY THẾ BẰNG ẢNH CỦA BẠN
  imageAlt = "Couple celebrating their wedding",
}) => {
  return (
    <div className="bg-white py-12 md:py-16 lg:py-24"> {/* Nền trắng hoặc màu bạn muốn cho section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 xl:gap-16">

          {/* Cột nội dung text (bên trái) */}
          <div className="md:w-1/2 lg:w-[45%] xl:w-2/5 text-center md:text-left"> {/* Điều chỉnh tỷ lệ chiều rộng */}
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-500 mb-0 md:-mb-2 lg:-mb-3"> {/* Màu xám nhạt cho "Our" */}
              {titleLine1}
            </h2>
            <h3 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800 mb-6 sm:mb-8 md:mb-10">
              {titleLine2Script}
            </h3>
            <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {paragraph1}
            </p>
            <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed">
              {paragraph2}
            </p>
          </div>

          {/* Cột ảnh (bên phải) */}
          <div className="md:w-1/2 lg:w-[55%] xl:w-3/5">
            <div className="relative w-full aspect-[3/3.5] sm:aspect-[4/3.8] md:aspect-[4/4.2] rounded-md overflow-hidden shadow-lg">
              {/*
                Điều chỉnh aspect ratio để phù hợp với ảnh của bạn.
                Ví dụ: aspect-[3/3.5] có nghĩa là chiều rộng 3 phần, chiều cao 3.5 phần.
                Hoặc bạn có thể đặt chiều cao cố định.
              */}
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

export default OurApproach;