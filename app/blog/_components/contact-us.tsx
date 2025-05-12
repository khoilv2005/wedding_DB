// components/EmailCTASection.tsx
import React from 'react';
import Image from 'next/image'; // Import Image component

interface EmailCTASectionProps {
  scriptText?: string;
  mainText?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string; // Vẫn là màu chính của section
  backgroundOpacityClass?: string; // Class cho độ mờ của màu nền chính
  ctaBackgroundImageUrl?: string; // Prop mới cho ảnh nền
  ctaBackgroundImageAlt?: string; // Alt text cho ảnh nền
  scriptTextColor?: string;
  mainTextColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const EmailCTASection: React.FC<EmailCTASectionProps> = ({
  scriptText = "Want to",
  mainText = "know more? Send us an email!",
  buttonText = "SEND MAIL",
  buttonLink = "mailto:info@theplannersvn.com",
  backgroundColor = "bg-custom-maroon", // Màu nâu đỏ đậm
  backgroundOpacityClass = "bg-opacity-80 md:bg-opacity-85", // Độ mờ cho màu nền để ảnh nền có thể nhìn thấy
  ctaBackgroundImageUrl = "/red.jpg", // << THAY THẾ BẰNG ẢNH NỀN CỦA BẠN
  ctaBackgroundImageAlt = "Abstract background for call to action",
  scriptTextColor = "text-white",
  mainTextColor = "text-white",
  buttonBgColor = "bg-white",
  buttonTextColor = "text-custom-maroon", // Màu chữ nút nên tương phản với buttonBgColor
}) => {
  return (
    // Div cha cần 'relative' để các lớp con 'absolute' được định vị theo nó
    <div className="relative w-full py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Lớp Ảnh Nền (nằm dưới cùng) */}
      {ctaBackgroundImageUrl && (
        <Image
          src={ctaBackgroundImageUrl}
          alt={ctaBackgroundImageAlt}
          layout="fill"
          objectFit="cover" // Ảnh sẽ lấp đầy và có thể bị cắt để vừa
          quality={75} // Điều chỉnh chất lượng nếu cần
          className="z-0" // Đảm bảo ảnh nền ở lớp thấp nhất
        />
      )}

      {/* Lớp Màu Nền (đè lên ảnh nền, có thể có opacity) */}
      <div
        className={`absolute inset-0 ${backgroundColor} ${backgroundOpacityClass} z-10`}
      ></div>

      {/* Lớp Nội Dung (nằm trên cùng) */}
      <div className="relative container mx-auto px-4 text-center z-20"> {/* z-20 để nổi lên trên lớp màu nền */}
        <h2 className={`font-script text-5xl sm:text-6xl md:text-7xl ${scriptTextColor} mb-1 md:mb-2`}>
          {scriptText}
        </h2>
        <p className={`font-serif text-xl sm:text-2xl md:text-3xl ${mainTextColor} mb-8 md:mb-10`}>
          {mainText}
        </p>
        <a
          href={buttonLink}
          className={`inline-block ${buttonBgColor} ${buttonTextColor} uppercase text-xs sm:text-sm font-semibold py-3 px-10 sm:px-12 rounded-sm hover:opacity-90 transition-opacity duration-300 tracking-wider`}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default EmailCTASection;