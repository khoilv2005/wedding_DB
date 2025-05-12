// components/ContactHeroSection.tsx
import React from 'react';
import Image from 'next/image';

interface ContactHeroSectionProps {
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  sectionTitle?: string;
  mainText?: string;
  contentBackgroundColor?: string; // Class màu nền cho khối nội dung
  sectionTitleColor?: string;
  mainTextColor?: string;
}

const ContactHeroSection: React.FC<ContactHeroSectionProps> = ({
  backgroundImageUrl = "/wedding4.jpg", // Đường dẫn đến ảnh nền
  backgroundImageAlt = "Wedding table setting background",
  sectionTitle = "| CONTACT |",
  mainText = "Let our team of experts make your dream come true!",
  contentBackgroundColor = "bg-purple-100", // Đổi sang màu nền tím nhạt Tailwind
  sectionTitleColor = "text-gray-600", // Có thể cần điều chỉnh màu chữ cho phù hợp với nền tím nhạt
  mainTextColor = "text-gray-800",     // Có thể cần điều chỉnh màu chữ
}) => {
  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[450px] lg:h-[500px]">
      <Image
        src={backgroundImageUrl}
        alt={backgroundImageAlt}
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div
          className={`${contentBackgroundColor} text-center py-8 px-6 sm:py-10 sm:px-8 md:py-12 md:px-10
                      w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl
                      transform lg:translate-y-[25%] xl:translate-y-[30%] shadow-lg relative z-10
                      mx-auto`}
        >
          {sectionTitle && (
            <p className={`text-xs ${sectionTitleColor} uppercase tracking-wider mb-4 sm:mb-5`}>
              {sectionTitle}
            </p>
          )}
          <p className={`font-serif text-2xl sm:text-3xl md:text-4xl ${mainTextColor} leading-tight`}>
            {mainText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeroSection;