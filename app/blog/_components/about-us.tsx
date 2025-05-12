// components/HeroAboutSection.tsx
import React from 'react';
import Image from 'next/image';

interface HeroAboutSectionProps {
  backgroundImageUrl?: string;
  
  mainTextPart1?: string;
  creativeText?: string;
  mainTextPart2?: string;
}

const HeroAboutSection: React.FC<HeroAboutSectionProps> = ({
  backgroundImageUrl = "/wedding4.jpg", // THAY THẾ BẰNG ẢNH NỀN CỦA BẠN
  mainTextPart1 = "Written by The Planners, this blog page is a reliable source that gives you helpful information for planning a wedding.",
}) => {
  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[650px] lg:h-[700px]"> {/* Điều chỉnh chiều cao */}
      {/* Ảnh nền */}
      <Image
        src={backgroundImageUrl}
        alt="Floral event background"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority // Nếu đây là section đầu trang
      />

      {/* Lớp phủ (tùy chọn, nếu muốn làm tối/sáng ảnh nền một chút) */}
      {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}

      {/* Khối nội dung */}
      {/*
        Định vị khối nội dung:
        - absolute: Định vị tuyệt đối so với cha (div ngoài cùng).
        - inset-x-0: Kéo dài theo chiều ngang của cha.
        - bottom-0: Đặt ở dưới cùng.
        - transform translate-y-1/2 (hoặc tương tự): Đẩy một nửa chiều cao của khối này lên trên,
          làm cho phần dưới của khối nội dung nằm chồng lên ảnh, phần trên có thể tràn ra ngoài nếu khối nội dung cao.
          Hoặc, bạn có thể đặt một giá trị bottom cụ thể, ví dụ bottom-[-50px] để đẩy nó xuống một chút
          và làm cho nó "trồi" ra khỏi ảnh nền.
          Trong ảnh mẫu, khối nội dung có vẻ như bắt đầu từ khoảng giữa ảnh và kéo dài xuống dưới.
          Chúng ta sẽ đặt nó ở dưới và cho nó tràn lên một chút.
      */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-end">
        {/*
          Khối nội dung màu kem.
          - `lg:-mb-24`: Trên màn hình lớn, đẩy khối này xuống một chút để phần lớn nó nằm ngoài ảnh,
            nhưng vẫn có một phần chồng lên. Điều chỉnh giá trị này.
          - `w-full max-w-4xl`: Chiều rộng tối đa cho khối nội dung.
        */}
        <div className="bg-[#f9f5ef] text-center p-8 sm:p-10 md:p-12 lg:p-16 shadow-xl w-full max-w-3xl xl:max-w-4xl
                        lg:mb-[-10%] xl:mb-[-15%] relative z-10 mx-4 sm:mx-auto">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed">
            {mainTextPart1}{' '}
          
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroAboutSection;