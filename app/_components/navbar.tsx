"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

interface DropdownMenuProps {
  label: string;
  items: MenuItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  // Thêm state để kiểm soát dropdown trên mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        className="px-4 py-2 hover:text-[#9a1b1b] transition-colors font-semibold flex items-center"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <svg 
          className="w-4 h-4 ml-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`absolute left-0 top-full min-w-[220px] bg-[#fefdf7] border rounded shadow-md
        transition-all duration-200 z-20
        md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-0 md:invisible'}`}
      >
        {items.map((item, i) =>
          item.children ? (
            <div className="relative group/dropdown" key={i}>
              <Link
                href={item.href}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100"
                onClick={(e) => item.children && e.preventDefault()}
              >
                {item.label}
                <span className="ml-2">&#9654;</span>
              </Link>
              {/* Sub-dropdown */}
              <div
                className="md:absolute md:left-full md:top-0 md:min-w-[200px] bg-[#fefdf7] border rounded shadow-md
                transition-all duration-200 z-30 pl-4 md:pl-0
                md:opacity-0 md:invisible md:group-hover/dropdown:opacity-100 md:group-hover/dropdown:visible"
              >
                {item.children.map((sub, j) => (
                  <Link
                    href={sub.href}
                    className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    key={j}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-100"
              key={i}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  // Thêm state để điều khiển menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fefdf7] py-5 border-b border-gray-200/80">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              }
            </svg>
          </button>
        </div>

        {/* Center Logo - Visible on all screens */}
        <div className="flex-shrink-0 mx-auto md:mx-0 md:order-2">
          <Link href="/" className="flex flex-col items-center group text-center">
            <div className="relative flex items-center justify-center h-9 mb-1.5">
              <span className="text-[10px] text-gray-500 mr-2 font-medium">EST.</span>
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.jpg"
                  alt="The Planners Symbol"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] text-gray-500 ml-2 font-medium">2010</span>
            </div>
            <h1 className="font-serif text-3xl tracking-wider text-[#2c2c2c] group-hover:text-[#9a1b1b] transition-colors duration-300">
              THE PLANNERS
            </h1>
            <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase mt-1 font-medium">
              Premium Event Design and Consultancy
            </p>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className={`
          md:flex md:order-1 md:space-x-5 md:items-center md:w-auto md:static
          ${mobileMenuOpen ? 'fixed inset-0 z-50 bg-[#fefdf7] p-6 pt-20 overflow-y-auto' : 'hidden'}
        `}>
          <DropdownMenu
            label="ABOUT"
            items={[
              {
                label: "Câu chuyện thành lập",
                href: "/cau-chuyen-thanh-lap",
              },
              {
                label: "Tầm nhìn - sứ mệnh",
                href: "/tam-nhin-su-menh",
              },
              {
                label: "Đội ngũ sáng lập",
                href: "/doi-ngu-sang-lap",
              },
            ]}
          />
          <DropdownMenu
            label="OUR WORK"
            items={[
              {
                label: "PHONG CÁCH",
                href: "/phong-cach",
                children: [
                  { label: "LUXURY", href: "/phong-cach/luxury" },
                  { label: "RUSTIC", href: "/phong-cach/rustic" },
                ],
              },
            ]}
          />
          <DropdownMenu
            label="OUR SERVICES"
            items={[
              {
                label: "THUÊ VÁY CƯỚI",
                href: "/thuevaycuoi",
                children: [
                  { label: "VÁY LUXURY", href: "/thuevaycuoi/luxury" },
                  { label: "VÁY ĐUÔI CÁ", href: "/thuevaycuoi/duoica" },
                  { label: "VÁY ĐI BÀN", href: "/thuevaycuoi/diban" },
                ],
              },
              {
                label: "TRANG TRÍ & PHONG CÁCH CƯỚI",
                href: "/trangtriphongcachcuoi",
                children: [
                  { label: "BST CONCEPT", href: "/trangtriphongcachcuoi/bstconcept" },
                  { label: "PHONG CÁCH PHỔ BIẾN", href: "/trangtriphongcachcuoi/phongcachphobien" },
                  { label: "GỢI Ý PHỐI MÀU", href: "/trangtriphongcachcuoi/goiyphoi" },
                ],
              },
              {
                label: "TRẢI NGHIỆM AR/VR",
                href: "/trai-nghiem-ar-vr",
                children: [
                  { label: "HƯỚNG DẪN THỬ VÁY CƯỚI ONLINE", href: "/trai-nghiem-ar-vr/huongdanthuvaycuoi" },
                ],
              },
            ]}
          />
        </div>

        {/* Right Menu */}
        <div className={`
          md:flex md:order-3 md:space-x-5 md:items-center md:w-auto md:static
          ${mobileMenuOpen ? 'mt-8' : 'hidden md:flex'}
        `}>
          <DropdownMenu
            label="VENDORS"
            items={[
              {
                label: "LINH NGA COUTURE",
                href: "/linhnga-couture",
              },
              {
                label: "NICOLE BRIDAL",
                href: "/nicole-bridal",
              },
            ]}
          />
          <DropdownMenu
            label="BLOG"
            items={[
              {
                label: "Lịch trình tổ chức đám cưới",
                href: "/lich-trinh-to-chuc-dam-cuoi",
              },
              {
                label: "Checklist tổ chức đám cưới",
                href: "/checklist-to-chuc-dam-cuoi",
              }, 
              {
                label: "Kinh nghiệm chọn váy, makeup, địa điểm tổ chức tiệc cưới",
                href: "/kinh-nghiem",
              },
              {
                label: "Xu hướng cưới theo mùa",
                href: "/xu-huong-cuoi-theo-mua",
              },
            ]}
          />
          <DropdownMenu
            label="CONTACT"
            items={[
              {
                label: "Form đăng ký nhận tư vấn",
                href: "/form-dang-ky-nhan-tu-van",
              },
              {
                label: "Form đăng ký trở thành đối tác",
                href: "/form-dang-ky-doi-tac",
              },
              {
                label: "Thông tin liên hệ",
                href: "/thong-tin-lien-he",
              },
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;