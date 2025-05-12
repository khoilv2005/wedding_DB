// components/WeddingWorksSection.tsx
import React from 'react';
import Image from 'next/image';

// Component con cho Overlay Text
interface OverlayTextProps {
  line1: string;
  line2: string;
  linkText: string;
  linkHref: string;
}

const ImageOverlay: React.FC<OverlayTextProps> = ({ line1, line2, linkText, linkHref }) => {
  return (
    <div className="absolute top-2 right-2 z-10 p-2 sm:p-3 bg-white bg-opacity-80 backdrop-blur-sm rounded-bl-md text-right">
      <p className="text-[10px] sm:text-xs font-medium text-gray-700">{line1}</p>
      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mt-0.5">{line2}</h3>
      <a href={linkHref} className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-800 mt-0.5 inline-block">
        {linkText}
      </a>
    </div>
  );
};

interface WeddingWorksSectionProps {
  titlePart1?: string;
  titlePart2?: string;
  description?: string;
  image1Alt?: string;
  image2Alt?: string;
  image3Alt?: string;
  // Giữ lại các props cho overlay chung, vì bạn muốn dùng chung nội dung
  overlayTextLine1?: string;
  overlayTextLine2?: string;
  overlayLinkText?: string;
  overlayLinkHref?: string;
  image1Url?: string;
  image2Url?: string;
  image3Url?: string;
}

const WeddingWorksSection: React.FC<WeddingWorksSectionProps> = ({
  titlePart1 = "Wedding",
  titlePart2 = "Works",
  description = "We are proud to deliver our services to hundreds of couples for over a decade. Let's take a look at the beautiful set-up and unforgettable moments that we have created for them.",
  image1Alt = "Ảnh cưới concept 1, chiều dọc",
  image2Alt = "Ảnh cưới concept 2, chi tiết",
  image3Alt = "Ảnh cưới concept 3, không gian",
  overlayTextLine1 = "Lisa & Nguyễn | Da Nang", // Nội dung overlay chung
  overlayTextLine2 = "Shadow & Reflection",    // Nội dung overlay chung
  overlayLinkText = "→ View More",             // Nội dung overlay chung
  overlayLinkHref = "#",                       // Nội dung overlay chung
  image1Url = "/logo.jpg",
  image2Url = "/logo.jpg",
  image3Url = "/logo.jpg",
}) => {
  const commonImageHeightMobile = "h-[400px]";
  const commonImageHeightSmall = "sm:h-[500px]";
  const commonImageHeightMedium = "md:h-[700px]";

  return (
    <div className="p-4 md:p-6   w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Cột trái */}
        <div className="md:w-[40%] flex flex-col ml-30">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-5 md:mb-6 leading-tight">
            {titlePart1} <span className="font-normal">{titlePart2}</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
            {description}
          </p>
          {/* Ảnh 1 với Overlay */}
          <div className={`w-full relative ${commonImageHeightMobile} ${commonImageHeightSmall} ${commonImageHeightMedium} rounded-md overflow-hidden`}>
            <Image  
              src={image1Url}
              alt={image1Alt}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
              priority
            />
            <ImageOverlay
              line1={overlayTextLine1}
              line2={overlayTextLine2}
              linkText={overlayLinkText}
              linkHref={overlayLinkHref}
            />
          </div>
        </div>

        {/* Cột phải */}
        <div className="md:w-[40%] flex flex-col gap-4 md:gap-5">
          {/* Ảnh 2 với Overlay */}
          <div className={`w-full relative ${commonImageHeightMobile} ${commonImageHeightSmall} ${commonImageHeightMedium} rounded-md overflow-hidden`}>
            <Image
              src={image2Url}
              alt={image2Alt}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <ImageOverlay
              line1={overlayTextLine1}
              line2={overlayTextLine2}
              linkText={overlayLinkText}
              linkHref={overlayLinkHref}
            />
          </div>
          {/* Ảnh 3 với Overlay */}
          <div className={`w-full relative ${commonImageHeightMobile} ${commonImageHeightSmall} ${commonImageHeightMedium} rounded-md overflow-hidden`}>
            <Image
              src={image3Url}
              alt={image3Alt}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
            <ImageOverlay
              line1={overlayTextLine1}
              line2={overlayTextLine2}
              linkText={overlayLinkText}
              linkHref={overlayLinkHref}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingWorksSection;