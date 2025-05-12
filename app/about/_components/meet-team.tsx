// components/MeetTheTeamSection.tsx
import React from 'react';
import Image from 'next/image';

interface MeetTheTeamSectionProps {
  sectionTitle?: string;
  teamImageUrl?: string;
  teamImageAlt?: string;
  backgroundColor?: string; // Màu nền cho section
  titleColor?: string;    // Màu cho tiêu đề
  aspectRatioClass?: string; // Tỷ lệ khung hình cho ảnh
}

const MeetTheTeamSection: React.FC<MeetTheTeamSectionProps> = ({
  sectionTitle = "| MEET THE TEAM |",
  teamImageUrl = "/meet-team.jpg", // THAY THẾ BẰNG ẢNH ĐỘI NGŨ CỦA BẠN
  teamImageAlt = "Our dedicated team at The Planners",
  backgroundColor = "bg-[#f9f5ef]", // Màu kem nhạt như trong ảnh
  titleColor = "text-gray-500",
  aspectRatioClass = "aspect-video md:aspect-[16/7] lg:aspect-[16/6]", // Điều chỉnh tỷ lệ này
}) => {
  return (
    <div className={`${backgroundColor} py-12 md:py-16 lg:py-20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <h2 className={`text-xs font-semibold ${titleColor} uppercase tracking-wider mb-8 sm:mb-10 md:mb-12 text-center`}>
            {sectionTitle}
          </h2>
        )}
        <div className={`relative w-full ${aspectRatioClass} overflow-hidden shadow-lg`}>
          {/*
            Bạn cần chọn tỷ lệ khung hình (aspectRatioClass) phù hợp với ảnh gốc của đội ngũ.
            Ảnh mẫu của bạn có vẻ khá rộng (panorama-like).
            Ví dụ:
            - aspect-video (16:9)
            - aspect-[2/1] (tỷ lệ 2:1)
            - aspect-[16/7] hoặc aspect-[16/6] có thể gần với ảnh mẫu hơn.
            Hoặc bạn có thể đặt chiều cao cố định nếu muốn.
          */}
          <Image
            src={teamImageUrl}
            alt={teamImageAlt}
            layout="fill"
            objectFit="cover" // 'cover' để lấp đầy, 'contain' nếu muốn thấy toàn bộ ảnh và có thể có khoảng trống
            quality={90} // Chất lượng ảnh
            priority // Nếu đây là section quan trọng, ở gần đầu trang
          />
        </div>
        
      </div>
    </div>
  );
};

export default MeetTheTeamSection;