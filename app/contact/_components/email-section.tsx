// components/EmailCTASection.tsx
import React from 'react';
import Image from 'next/image';

interface EmailCTASectionProps {
  scriptText?: string;
  mainText?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  backgroundOpacityClass?: string; // Nếu dùng với ảnh nền
  ctaBackgroundImageUrl?: string;
  ctaBackgroundImageAlt?: string;
  scriptTextColor?: string;
  mainTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const EmailCTASection: React.FC<EmailCTASectionProps> = ({
  scriptText = "Default Script Text",
  mainText = "Default main text here.",
  buttonText = "Default Button",
  buttonLink = "#",
  backgroundColor = "bg-gray-800", // Màu nền mặc định
  backgroundOpacityClass = "bg-opacity-100", // Mặc định không trong suốt nếu không có ảnh nền
  ctaBackgroundImageUrl, // Không có ảnh nền mặc định
  ctaBackgroundImageAlt = "Background image",
  scriptTextColor = "text-white",
  mainTextColor = "text-white",
  buttonBgColor = "bg-white",
  buttonTextColor = "text-gray-800",
}) => {
  return (
    <div className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28">
      {ctaBackgroundImageUrl && (
        <Image
          src={ctaBackgroundImageUrl}
          alt={ctaBackgroundImageAlt}
          layout="fill"
          objectFit="cover"
          quality={75}
          className="z-0"
        />
      )}
      <div
        className={`absolute inset-0 ${backgroundColor} ${ctaBackgroundImageUrl ? backgroundOpacityClass : ''} z-10`}
        // Chỉ áp dụng opacity nếu có ảnh nền
      ></div>
      <div className="relative container mx-auto px-4 text-center z-20">
        <h2 className={`font-script text-5xl sm:text-6xl md:text-7xl ${scriptTextColor} mb-2 md:mb-3`}>
          {scriptText}
        </h2>
        <p className={`font-serif text-xl sm:text-2xl md:text-3xl ${mainTextColor} mb-8 md:mb-10 max-w-2xl mx-auto`}>
          {/* Thêm max-w-2xl mx-auto để giới hạn chiều rộng của dòng text chính nếu nó quá dài */}
          {mainText}
        </p>
        <a
          href={buttonLink}
          className={`inline-block ${buttonBgColor} ${buttonTextColor} uppercase text-xs sm:text-sm font-semibold py-3.5 px-10 sm:px-12 rounded-sm hover:opacity-90 transition-opacity duration-300 tracking-wider`}
          // Tăng py một chút cho nút
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default EmailCTASection;