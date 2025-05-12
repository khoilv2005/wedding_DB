// components/WeddingWorksSection.tsx
import React from 'react';
import Image from 'next/image';

// Component con cho Overlay Text (Giữ nguyên)
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
  buttonText?: string; // Thêm prop cho nút bấm
  buttonLink?: string; // Thêm prop cho link của nút
  image1Alt?: string;
  image2Alt?: string;
  image3Alt?: string;
  overlayTextLine1?: string;
  overlayTextLine2?: string;
  overlayLinkText?: string;
  overlayLinkHref?: string;
  image1Url?: string;
  image2Url?: string;
  image3Url?: string;
}

const WeddingWorksSection2: React.FC<WeddingWorksSectionProps> = ({
  titlePart1 = "Styling &", // Cập nhật tiêu đề theo ảnh mẫu
  titlePart2 = "Decor Works", // Cập nhật tiêu đề theo ảnh mẫu
  description = "We find so much joy and satisfaction in creating beautiful things. From styling to themed events to proposals, we are thrilled to utilize our creativity and create memorable moments.", // Cập nhật mô tả
  buttonText = "EXPLORE DECOR", // Text cho nút
  buttonLink = "#", // Link cho nút
  image1Alt = "Ảnh cưới concept 1, chiều dọc",
  image2Alt = "Ảnh cưới concept 2, chi tiết",
  image3Alt = "Ảnh cưới concept 3, không gian",
  overlayTextLine1 = "Eliza & Jason | Ha Noi", // Cập nhật theo ảnh mẫu
  overlayTextLine2 = "Aqua Camellia",         // Cập nhật theo ảnh mẫu
  overlayLinkText = "→ View More",
  overlayLinkHref = "#",
  image1Url = "/anh_dai_1.jpg", // Giả sử ảnh 1 là ảnh lớn bên trái
  image2Url = "/anh_dai_2.jpg", // Ảnh này có thể không dùng nếu chỉ có 1 ảnh lớn, hoặc đặt ở đâu đó
  image3Url = "/anh_dai_3.jpg", // Tương tự ảnh 2
}) => {
  // Điều chỉnh chiều cao ảnh nếu cần cho layout mới
  const mainImageHeightMobile = "h-[450px]";
  const mainImageHeightSmall = "sm:h-[550px]";
  const mainImageHeightMedium = "md:h-[650px]"; // Chiều cao cho ảnh chính (nếu dùng 1 ảnh)

  // Hoặc nếu vẫn dùng 3 ảnh, chiều cao có thể khác
  const commonImageHeightMobile = "h-[300px]"; // Giảm bớt nếu không gian hẹp hơn
  const commonImageHeightSmall = "sm:h-[400px]";



  // LƯU Ý: Ảnh mẫu chỉ có 1 ảnh lớn bên trái.
  // Nếu bạn muốn bố cục 1 ảnh lớn bên trái và chữ bên phải, code sẽ đơn giản hơn.
  // Ví dụ dưới đây vẫn giữ cấu trúc 3 ảnh, nhưng chuyển cột chữ sang phải.

  return (
    <div className="p-4 md:p-6 w-full font-sans"> {/* font-sans từ body hoặc layout.tsx */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8"> {/* Tăng gap nếu cần */}

        {/* CỘT TRÁI: Giờ là nơi chứa các ảnh */}
        {/* Điều chỉnh tỷ lệ chiều rộng, ví dụ md:w-1/2 hoặc md:w-3/5 cho ảnh */}
        <div className="md:w-1/2 lg:w-3/5 flex flex-col gap-4 md:gap-5">
          {/* Ảnh 1 (ảnh chính/ảnh trên cùng) */}
          <div className={`w-full relative ${mainImageHeightMobile} ${mainImageHeightSmall} ${mainImageHeightMedium} rounded-md overflow-hidden`}>
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

          {/* Nếu bạn muốn giữ 2 ảnh còn lại, chúng có thể nằm dưới ảnh chính hoặc song song nếu cột ảnh rộng */}
          {/* Ví dụ: 2 ảnh nhỏ hơn nằm dưới */}
           <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
            <div className={`w-full sm:w-1/2 relative ${commonImageHeightMobile} ${commonImageHeightSmall} rounded-md overflow-hidden`}>
              <Image
                src={image2Url}
                alt={image2Alt}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <ImageOverlay /* Props tương tự nếu cần */
                line1={overlayTextLine1} // Hoặc nội dung overlay khác
                line2={overlayTextLine2}
                linkText={overlayLinkText}
                linkHref={overlayLinkHref}
              />
            </div>
            <div className={`w-full sm:w-1/2 relative ${commonImageHeightMobile} ${commonImageHeightSmall} rounded-md overflow-hidden`}>
              <Image
                src={image3Url}
                alt={image3Alt}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <ImageOverlay /* Props tương tự nếu cần */
                line1={overlayTextLine1} // Hoặc nội dung overlay khác
                line2={overlayTextLine2}
                linkText={overlayLinkText}
                linkHref={overlayLinkHref}
              />
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Giờ là nơi chứa chữ và nút bấm */}
        {/* Điều chỉnh tỷ lệ chiều rộng, ví dụ md:w-1/2 hoặc md:w-2/5 cho chữ */}
        <div className="md:w-1/2 lg:w-2/5 flex flex-col justify-center"> {/* Thêm justify-center để căn giữa nội dung chữ theo chiều dọc nếu cột cao */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-5 md:mb-6 leading-tight">
            {titlePart1} <span className="font-normal">{titlePart2}</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
            {description}
          </p>
          {/* Nút bấm */}
          <a
            href={buttonLink}
            className="inline-block bg-gray-800 text-white uppercase text-sm font-semibold py-3 px-8 rounded-sm hover:bg-gray-700 transition-colors duration-300 self-start"
            // self-start để nút không chiếm toàn bộ chiều rộng
          >
            {buttonText}
          </a>
        </div>

      </div>
    </div>
  );
};

export default WeddingWorksSection2;