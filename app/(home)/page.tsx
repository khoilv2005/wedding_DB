import CallToActionSection from "./_components/contact";
import WeddingWorksSection from "./_components/description1";
import WeddingWorksSection2 from "./_components/description2";
import { ImageCarousel } from "./_components/image-carouse"; // Sửa tên file nếu bạn đã đổi
import { IntroSection } from "./_components/intro-section";
import { OurService } from "./_components/our-service";
import TestimonialSection from "./_components/review";
import LogoScroller from "./_components/supporter";


export default function Home() {
  return (
    <main> {/* Sử dụng main thay vì div cho ngữ nghĩa */}
      <div>
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
    </div>


    </main>
  );
}
