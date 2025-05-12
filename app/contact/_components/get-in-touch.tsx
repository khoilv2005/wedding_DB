// components/GetInTouchSection.tsx
import React from 'react';
import Link from 'next/link';
// Import icons từ react-icons
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactDetail {
  icon: React.ReactNode;
  text: string;
  href?: string; // Cho email và có thể cả điện thoại
}

interface GetInTouchSectionProps {
  scriptTitle?: string;
  paragraphs?: string[];
  faqLinkText?: string;
  faqHref?: string;
  contactDetails?: ContactDetail[];
  backgroundColor?: string;
}

const defaultContactDetails: ContactDetail[] = [
  { icon: <FaPhoneAlt />, text: "+ 84 967 884 766", href: "tel:+84967884766" },
  { icon: <FaEnvelope />, text: "INFO@THEPLANNERSVN.COM", href: "mailto:INFO@THEPLANNERSVN.COM" },
  { icon: <FaMapMarkerAlt />, text: "Hanoi: 2nd floor, 1C Dang Thai Than, Hoan Kiem." },
  { icon: <FaMapMarkerAlt />, text: "Halong: The Sapphire Residence Ha Long, No.1 Bến Đoan, Hon Gai." },
  { icon: <FaMapMarkerAlt />, text: "Danang: 2nd floor, 81 Dang Vu Hy, Son Tra." },
  { icon: <FaMapMarkerAlt />, text: "Saigon: No.21, 53 Strt., Ha Do Villa, Thanh My Loi, Thu Duc." },
];

const GetInTouchSection: React.FC<GetInTouchSectionProps> = ({
  scriptTitle = "Get in touch",
  paragraphs = [
    "Looking for a professional team to help you make your dream wedding come true? Or you are planning for a birthday party, a proposal or a themed event that needs a unique concept.",
    "Reach out to us. Our team of experienced planners will give you advice and walk you through the process.",
    "Have some questions for us? Check out our"
  ],
  faqLinkText = "F.A.Q",
  faqHref = "/faq",
  contactDetails = defaultContactDetails,
  backgroundColor = "bg-white", // Hoặc màu nền bạn muốn
}) => {
  return (
    <div className={`${backgroundColor} py-16 sm:py-20 md:py-24 lg:py-28`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 xl:gap-20">

          {/* Cột nội dung text (bên trái) */}
          <div className="md:w-1/2 lg:w-[45%] xl:w-2/5">
            <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-gray-800 mb-6 sm:mb-8">
              {scriptTitle}
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                {paragraph}{' '}
                {index === paragraphs.length - 1 && faqLinkText && faqHref && ( // Chỉ thêm link FAQ vào đoạn cuối cùng
                  <Link href={faqHref} legacyBehavior>
                    <a className="text-brand-red font-semibold hover:underline">{faqLinkText}</a>
                  </Link>
                )}
              </p>
            ))}
          </div>

          {/* Cột thông tin liên hệ (bên phải) */}
          <div className="md:w-1/2 lg:w-[55%] xl:w-3/5 space-y-4 md:space-y-5">
            {contactDetails.map((detail, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-700 mt-1 mr-3 text-base sm:text-lg"> {/* Icon */}
                  {detail.icon}
                </span>
                {detail.href ? (
                  <a href={detail.href} className="font-sans text-sm sm:text-base text-gray-700 hover:text-brand-red transition-colors">
                    {detail.text}
                  </a>
                ) : (
                  <p className="font-sans text-sm sm:text-base text-gray-700">
                    {detail.text}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;