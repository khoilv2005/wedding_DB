"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';

const ProductDetail = () => {
  // State để lưu hình ảnh được chọn
  const [selectedImage, setSelectedImage] = useState('/uploads/vay-cuoi-luxury-1.jpg');
  
  // Mảng hình ảnh sản phẩm
  const productImages = [
    '/uploads/vay-cuoi-linhnga-1.jpg',
    '/uploads/vay-cuoi-linhnga-2.jpg',
    '/uploads/vay-cuoi-linhnga-3.jpg',
    '/uploads/vay-cuoi-linhnga-4.jpg',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header với logo */}
      
      
      {/* Container chính */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row">
        {/* Phần hình ảnh - 50% */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          {/* Hình ảnh lớn */}
          <div className="mb-4 relative rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt="Váy cưới luxury"
              width={600}
              height={800}
              className="w-full object-cover"
            />
          </div>
          
          {/* Hình ảnh nhỏ */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer border-2 rounded-md overflow-hidden min-w-[100px] h-[120px] ${
                  selectedImage === img ? 'border-pink-400' : 'border-transparent'
                }`}
              >
                <Image
                  src={img}
                  alt={`Váy cưới luxury ${index + 1}`}
                  width={100}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
         
          
        </div>
        
        {/* Phần thông tin - 50% */}
        <div className="md:w-1/2">
          <div className="space-y-8">
            {/* Thông tin sản phẩm */}
            <div>
              <div className="mb-4 flex items-center">
                <span className="text-3xl font-bold mr-2">Tên:</span>
                <span className="text-3xl">Váy lễ dòng premium luxury LT525</span>
              </div>
              
              <div className="mb-4 flex items-center">
                <span className="text-3xl font-bold mr-2">Giá:</span>
                <span className="text-3xl">Tự điền</span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold block mb-2">Description:</span>
                <p className="text-xl">
                  Váy cưới dáng chữ A, phong cách công chúa với phần thân váy được đính kết tỉ mỉ 
                  các hạt đá và pha lê cao cấp. Thiết kế vai trần tinh tế tôn lên vẻ đẹp thanh lịch 
                  và sang trọng của cô dâu.
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-4">
              <Link href="/thu-vay-ar" className="block">
                <button className="bg-blue-200 text-black font-bold text-2xl py-4 px-6 rounded-xl w-full hover:bg-blue-300 transition duration-300">
                  Thử váy AR
                </button>
              </Link>
              
              
              
              <Link href="/dat-lich-tu-van" className="block">
                <button className="bg-red-300 text-black font-bold text-2xl py-4 px-6 rounded-xl w-full hover:bg-red-400 transition duration-300">
                  Liên hệ đặt lịch tư vấn
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating call button */}
      <a 
        href="tel:0286683993" 
        className="fixed bottom-10 right-10 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition"
        aria-label="Gọi ngay"
      >
        <FaPhone size={24} />
      </a>
    </div>
  );
};

export default ProductDetail;