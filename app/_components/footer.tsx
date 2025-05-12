// components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import các icon từ react-icons
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title?: string;
  links: FooterLink[];
}

// Cập nhật kiểu cho socialLinks.icon để chấp nhận ReactNode
const footerData: {
  logoUrl: string;
  logoAlt: string;
  tagline: string;
  socialLinks: { href: string; icon: React.ReactNode; label: string }[]; // icon là ReactNode
  contactInfo: string[];
  columns: FooterColumn[];
} = {
  logoUrl: "/logo.jpg", // THAY BẰNG LOGO FOOTER CỦA BẠN (ví dụ: /logo_the_planners_footer.png)
  logoAlt: "The Planners Logo",
  tagline: "PREMIUM EVENT DESIGN AND CONSULTANCY",
  socialLinks: [
    // Sử dụng trực tiếp các component icon
    { href: "https://instagram.com", icon: <FaInstagram />, label: "Instagram" },
    { href: "https://facebook.com", icon: <FaFacebookF />, label: "Facebook" },
    { href: "https://pinterest.com", icon: <FaPinterestP />, label: "Pinterest" },
  ],
  contactInfo: [
    "+ 84 967 884 766",
    "info@theplannersvn.com",
    "Hanoi: 2nd floor, 1C Dang Thai Than,",
    "Hoan Kiem.",
  ],
  columns: [
    {
      links: [
        { href: "/about", label: "ABOUT" },
        { href: "/our-works", label: "OUR WORKS" },
        { href: "/wedding-works", label: "Wedding Works" },
        { href: "/styling-decoration", label: "Styling & Decoration" },
      ],
    },
    {
      title: "OUR SERVICES",
      links: [
        { href: "/services/wedding-planning", label: "Wedding Planning" },
        { href: "/services/destination-wedding", label: "Destination Wedding" },
        { href: "/services/styling-decoration", label: "Styling & Decoration" },
      ],
    },
    {
      links: [
        { href: "/press-praise", label: "PRESS & PRAISE" },
        { href: "/blog", label: "BLOG" },
        { href: "/contact", label: "CONTACT" },
        { href: "/faq", label: "FAQ" },
      ],
    },
  ],
};


const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-700 py-12 md:py-16 lg:py-20 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Cột Logo và Thông tin liên hệ */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" legacyBehavior>
              <a className="inline-block mb-3">
                <Image
                  src={footerData.logoUrl}
                  alt={footerData.logoAlt}
                  width={180}
                  height={60}
                  objectFit="contain"
                />
              </a>
            </Link>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
              {footerData.tagline}
            </p>

            <div className="flex space-x-3 mb-4">
              {footerData.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors text-base" // Thêm text-base cho kích thước icon
                >
                  {social.icon} {/* Giờ đây social.icon là một component React */}
                </a>
              ))}
            </div>

            {footerData.contactInfo.map((info, index) => (
              <p key={index} className="text-sm mb-1">
                {info}
              </p>
            ))}
          </div>

          {/* Các cột link điều hướng */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Cột 1: ABOUT, OUR WORKS (và các link con) */}
            <div>
              <Link href={footerData.columns[0].links[0].href} legacyBehavior>
                <a className="block text-sm font-semibold text-black uppercase mb-3 hover:text-gray-700">
                  {footerData.columns[0].links[0].label}
                </a>
              </Link>
              <Link href={footerData.columns[0].links[1].href} legacyBehavior>
                <a className="block text-sm font-semibold text-black uppercase mb-3 hover:text-gray-700">
                  {footerData.columns[0].links[1].label}
                </a>
              </Link>
              <ul className="space-y-2">
                <li>
                  <Link href={footerData.columns[0].links[2].href} legacyBehavior><a className="text-sm hover:underline text-gray-600">{footerData.columns[0].links[2].label}</a></Link>
                </li>
                <li>
                  <Link href={footerData.columns[0].links[3].href} legacyBehavior><a className="text-sm hover:underline text-gray-600">{footerData.columns[0].links[3].label}</a></Link>
                </li>
              </ul>
            </div>

            {/* Cột 2: OUR SERVICES (và các link con) */}
            <div>
              <h4 className="text-sm font-semibold text-black uppercase mb-3">
                {footerData.columns[1].title}
              </h4>
              <ul className="space-y-2">
                {footerData.columns[1].links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} legacyBehavior><a className="text-sm hover:underline text-gray-600">{link.label}</a></Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cột 3: PRESS & PRAISE, BLOG, CONTACT, FAQ */}
            <div>
              {footerData.columns[2].links.map((link) => (
                <Link key={link.label} href={link.href} legacyBehavior>
                  <a className="block text-sm font-semibold text-black uppercase mb-3 hover:text-gray-700">
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} The Planners. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;