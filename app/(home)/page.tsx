"use client";
import CallToActionSection from "./_components/contact";
import WeddingWorksSection from "./_components/description1";
import WeddingWorksSection2 from "./_components/description2";
import { ImageCarousel } from "./_components/image-carouse"; // Sửa tên file nếu bạn đã đổi
import { IntroSection } from "./_components/intro-section";
import { OurService } from "./_components/our-service";
import TestimonialSection from "./_components/review";
import LogoScroller from "./_components/supporter";


import { useEffect, useState } from "react";
import BrandIntro from "./_components/introduce";
import NewsSection from "./_components/news";

export default function Home() {
  const [introData, setIntroData] = useState<null | {
    title: string;
    leftImage: string;
    rightImage: string;
    leftFeatures: string[];
    rightFeatures: string[];
  }>(null);

  useEffect(() => {
    // Giả sử API trả về đúng cấu trúc
    fetch("/api/admin/brand-intro")
      .then((res) => res.json())
      .then(setIntroData)
      .catch(() => setIntroData(null));
  }, []);

  // Giá trị mặc định
  const defaultIntroData = {
    title: "Chúng tôi cung  các dịch vụ tổ chức sự kiện chuyên nghiệp, sáng tạo và tinh tế, giúp khách hàng tạo nên những khoảnh khắc đáng nhớ trong cuộc đời.",
    leftFeatures: [
      "Trải nghiệm thử váy AR miễn phí",
      "Miễn phí điều chỉnh trang phục phù hợp"
    ],
    rightFeatures: [
      "Miễn phí dịch vụ giao váy tận nơi, hỗ trợ thử váy",
      "Bảo hiểm váy cưới lên đến 30 triệu - Bảo vệ toàn diện cho trang phục ngày trọng đại"
    ]
  };

  // Nếu introData có dữ liệu thì lấy introData, còn không thì dùng mặc định
  const data = introData ?? defaultIntroData;

  return (
    <main>
      <div>
        <BrandIntro
          title={data.title}
          leftFeatures={data.leftFeatures}
          rightFeatures={data.rightFeatures}
        />
      </div>
      <NewsSection />
    </main>
  );
}


{/* <div>
        <ImageCarousel />
      </div>
      <div className="relative z-10">
        <IntroSection />
      </div>
      <div>
        <OurService />
      </div>
      <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
      <div className="bg-white">
        <div className="w-full max-w-6xl px-2"> 
          <WeddingWorksSection
            image1Url="/logo.jpg" 
            image2Url="/logo.jpg"
            image3Url="/logo.jpg"
          />
          <WeddingWorksSection2
            image1Url="/logo.jpg" 
            image2Url="/logo.jpg"
            image3Url="/logo.jpg"
            />
        </div>
      </div>
      
    </div>
    <div>
      <LogoScroller />
    </div>

    <div>
      <TestimonialSection />
    </div>

    <div>
      <CallToActionSection />
    </div> */}