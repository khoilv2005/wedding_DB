// components/Navbar.tsx
import React from 'react'; // Import React nếu chưa có (cần cho JSX)
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  // Dữ liệu cho tất cả các mục menu và submenu
  const navItemsData = [
    {
      label: "ABOUT", // Mục đầu tiên bên trái
      href: "/about",
    },
    {
      label: "OUR WORKS",
      href: "/works",
      submenu: [
        { href: "/wedding-works", label: "WEDDING WORKS" },
        { href: "/styling-decoration", label: "STYLING & DECORATION" },
      ],
    },
    {
      label: "OUR SERVICES",
      href: "/services",
      submenu: [
        { href: "/services/wedding-planning", label: "WEDDING PLANNING" },
        { href: "/services/destination-wedding", label: "DESTINATION WEDDING" },
        { href: "/services/styling-decoration", label: "STYLING & DECORATION" },
      ],
    },
    // Các mục menu ở giữa (phần logo sẽ được chèn vào giữa)
    // Các mục menu bên phải
    {
      label: "PRESS & PRAISE",
      href: "/press-praise",
      submenu: [
        { href: "/press", label: "PRESS" },
        { href: "/praise", label: "PRAISE" },
      ],
    },
    {
      label: "BLOG",
      href: "/blog",
    },
    {
      label: "CONTACT",
      href: "/contact",
    },
  ];

  // Chia navItemsData thành phần trái và phải của logo
  // Giả sử bạn muốn 3 mục đầu bên trái, 3 mục cuối bên phải
  const leftNavItems = navItemsData.slice(0, 3);
  const rightNavItems = navItemsData.slice(3);


  const renderNavItem = (item: typeof navItemsData[0]) => (
    <div key={item.label} className="relative group">
      <Link href={item.href} legacyBehavior>
        <a className="text-xs uppercase tracking-wider text-[#333333] font-semibold hover:text-[#9a1b1b] transition-colors duration-300 py-3 px-2">
          {item.label}
        </a>
      </Link>
      {item.submenu && item.submenu.length > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-1 w-auto min-w-[240px] bg-white shadow-lg rounded-md py-2 z-30
                     hidden group-hover:block transition-all duration-300 ease-in-out
                     opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          {item.submenu.map((subItem) => (
            <Link key={subItem.label} href={subItem.href} legacyBehavior>
              <a className="block whitespace-nowrap px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#9a1b1b] border-b border-gray-100 last:border-b-0">
                {subItem.label}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#fefdf7] py-5 border-b border-gray-200/80">
      <div className="container mx-auto flex items-center justify-between px-8">

        {/* Left Navigation */}
        <div className="flex items-center space-x-8 lg:space-x-10"> {/* Điều chỉnh space */}
          {leftNavItems.map(renderNavItem)}
        </div>

        {/* Center Logo Section */}
        <div className="flex-shrink-0 mx-4 lg:mx-6"> {/* Thêm margin ngang cho logo */}
          <Link href="/" legacyBehavior>
            <a className="flex flex-col items-center group text-center">
              <div className="relative flex items-center justify-center h-9 mb-1.5">
                <span className="text-[10px] text-gray-500 mr-2 font-medium">EST.</span>
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.jpg" // Đảm bảo logo này là biểu tượng màu đỏ
                    alt="The Planners Symbol"
                    fill // Sử dụng fill thay vì width/height cố định cho Image trong div có kích thước
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
            </a>
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-8 lg:space-x-10"> {/* Điều chỉnh space */}
          {rightNavItems.map(renderNavItem)}
          {/* Language Switcher (nếu bạn vẫn muốn giữ nó ở đây) */}
          <button className="bg-black text-white px-3.5 py-1.5 flex items-center space-x-1.5 text-[11px] uppercase font-semibold hover:bg-opacity-80 transition-colors duration-300 rounded-sm"> {/* Thêm rounded-sm */}
            <span>EN</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;