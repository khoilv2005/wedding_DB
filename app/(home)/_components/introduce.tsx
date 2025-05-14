import React from 'react';
import Image from 'next/image';
import { Merriweather } from "next/font/google";
interface BrandIntroProps {
  title?: string;
  leftImage?: string;
  rightImage?: string;
  leftFeatures?: string[];
  rightFeatures?: string[];
}

const BrandIntro: React.FC<BrandIntroProps> = ({
  title = "Chúng tôi cung  các dịch vụ tổ chức sự kiện chuyên nghiệp, sáng tạo và tinh tế, giúp khách hàng tạo nên những khoảnh khắc đáng nhớ trong cuộc đời.",
  leftImage = "/default-left.jpg",
  rightImage = "/default-right.jpg",
  leftFeatures = [
    "Trải nghiệm thử váy AR miễn phí",
    "Miễn phí điều chỉnh trang phục phù hợp"
  ],
  rightFeatures = [
    "Miễn phí dịch vụ giao váy tận nơi, hỗ trợ thử váy",
    "Bảo hiểm váy cưới lên đến 30 triệu - Bảo vệ toàn diện cho trang phục ngày trọng đại"
  ]
}) => {
  return (
    <section className="w-full py-12 flex flex-col items-center bg-white">
      {/* Tiêu đề đẹp, sang */}
      <div className="w-full flex justify-center">
        <h2 className="
          Merriweather
          text-[2.2rem] 
          md:text-[2.7rem] 
          font-semibold 
          text-center 
          leading-snug 
          tracking-wide 
          max-w-3xl 
          px-4
          mb-5
        ">
          {title}
        </h2>
      </div>
      {/* Divider nhấn nhẹ (có thể bỏ nếu không thích) */}
      <div className="w-24 h-[2px] bg-[#d9bc9c] opacity-50 rounded mx-auto mb-10" />

      <div className="flex flex-col md:flex-row justify-center items-start gap-16 w-full max-w-7xl">
        {/* Left image + features */}
        <div className="flex flex-row items-center flex-1 w-full max-w-[800px]">
          <div className="w-[350px] h-[480px] relative mb-4 flex-shrink-0">
            <Image
              src={leftImage}
              alt="Left"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 80vw, 350px"
            />
          </div>
          <ul className="text-[1.25rem] font-normal leading-relaxed ml-14 space-y-10 text-left list-disc pl-7 flex-1 max-w-[420px]">
            {leftFeatures.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Right image + features */}
        <div className="flex flex-row items-center flex-1 w-full max-w-[800px]">
          <div className="w-[350px] h-[480px] relative mb-4 flex-shrink-0">
            <Image
              src={rightImage}
              alt="Right"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 80vw, 350px"
            />
          </div>
          <ul className="text-[1.25rem] font-normal leading-relaxed ml-14 space-y-10 text-left list-disc pl-7 flex-1 max-w-[420px]">
            {rightFeatures.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;