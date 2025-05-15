"use client";
import React, { useState, useEffect } from 'react'; // Import useEffect
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';

// Interface cho dữ liệu cài đặt nhận được từ API /api/settings
// Thêm 'name', 'cost' và 'description' vào interface Settings
interface Settings {
  intro: string; // Giữ lại intro dù không dùng ở đây, vì API trả về tất cả
  hotline?: string; // Thêm các key khác nếu bạn cần dùng
  name?: string; // Thêm biến name
  cost?: string; // Thêm biến cost
  description?: string; // Thêm biến description
  [key: string]: any; // Cho phép các cài đặt khác
}

const ProductDetail = () => {
  // State để lưu hình ảnh được chọn (giữ nguyên)
  const [selectedImage, setSelectedImage] = useState('/uploads/vay-cuoi-linhnga-1.jpg');

  // Mảng hình ảnh sản phẩm (giữ nguyên)
  const productImages = [
    '/uploads/vay-cuoi-linhnga-1.jpg',
    '/uploads/vay-cuoi-linhnga-2.jpg',
    '/uploads/vay-cuoi-linhnga-3.jpg',
    '/uploads/vay-cuoi-linhnga-4.jpg',
  ];

  // --- THÊM STATE MỚI CHO CÀI ĐẶT TỪ API ---
  const [fetchedSettings, setFetchedSettings] = useState<Settings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true); // Bắt đầu là true vì sẽ fetch ngay
  const [settingsError, setSettingsError] = useState<string | null>(null);
  // ----------------------------------------

  // --- useEffect để fetch cài đặt từ API /api/settings ---
  useEffect(() => {
    setLoadingSettings(true); // Bắt đầu trạng thái tải cài đặt
    setSettingsError(null); // Reset lỗi trước khi fetch

    fetch("/api/settings") // <-- Gọi API Đọc cài đặt của bạn
      .then((res) => {
        if (!res.ok) {
          // Xử lý nếu phản hồi không thành công (ví dụ: 404, 500)
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse phản hồi sang JSON
      })
      .then((data: Settings) => { // Ép kiểu dữ liệu nhận được sang Settings
        setFetchedSettings(data); // Lưu toàn bộ object cài đặt vào state
      })
      .catch((error) => {
        console.error("Failed to fetch settings:", error);
        setSettingsError("Không thể tải thông tin sản phẩm."); // Lưu thông báo lỗi
        setFetchedSettings(null); // Đảm bảo state là null nếu có lỗi
      })
      .finally(() => {
        setLoadingSettings(false); // Kết thúc trạng thái tải
      });

  }, []); // Mảng dependencies rỗng: effect chỉ chạy 1 lần sau render đầu tiên


  return (
    <div className="min-h-screen bg-white">
      {/* Header với logo (giữ nguyên) */}


      {/* Container chính */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row">
        {/* Phần hình ảnh - 50% (giữ nguyên) */}
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
                {/* --- HIỂN THỊ TÊN SẢN PHẨM TỪ STATE (LẤY TỪ API) --- */}
                 <span className="text-3xl">
                  {loadingSettings ? (
                    "Đang tải..."
                  ) : settingsError ? (
                    "Lỗi tải tên"
                  ) : fetchedSettings && fetchedSettings.name ? (
                    // Hiển thị tên nếu tải thành công và biến 'name' tồn tại
                    fetchedSettings.name // Giả định tên là string
                  ) : (
                    // Trường hợp tải xong nhưng không có dữ liệu name
                    "Tên sản phẩm chưa cập nhật"
                  )}
                </span>
                 {/* ----------------------------------------------- */}
              </div>

              <div className="mb-4 flex items-center">
                <span className="text-3xl font-bold mr-2">Giá:</span>
                {/* --- HIỂN THỊ GIÁ TỪ STATE (LẤY TỪ API) --- */}
                <span className="text-3xl">
                  {loadingSettings ? (
                    "Đang tải..."
                  ) : settingsError ? (
                    "Lỗi tải giá"
                  ) : fetchedSettings && fetchedSettings.cost ? (
                    // Hiển thị giá nếu tải thành công và biến 'cost' tồn tại
                    fetchedSettings.cost // Giả định giá là string
                  ) : (
                    // Trường hợp tải xong nhưng không có dữ liệu cost
                    "Chưa cập nhật giá"
                  )}
                </span>
                 {/* ----------------------------------------- */}
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold block mb-2">Description:</span>
                {/* --- HIỂN THỊ MÔ TẢ TỪ STATE (LẤY TỪ API) --- */}
                <p className="text-xl">
                  {loadingSettings ? (
                    "Đang tải mô tả..."
                  ) : settingsError ? (
                    "Lỗi tải mô tả"
                  ) : fetchedSettings && fetchedSettings.description ? (
                    // Hiển thị mô tả nếu tải thành công và biến 'description' tồn tại
                    fetchedSettings.description // Giả định mô tả là string
                  ) : (
                    // Trường hợp tải xong nhưng không có dữ liệu description
                    "Mô tả chưa được cập nhật."
                  )}
                </p>
                 {/* ------------------------------------------ */}
              </div>
            </div>

            {/* CTA Buttons (giữ nguyên) */}
            <div className="space-y-4">
              <Link href="https://9e3dr.zappar-us.io/3028293801949851719/" className="block">
                <button className="bg-blue-200 text-black font-bold text-2xl py-4 px-6 rounded-xl w-full hover:bg-blue-300 transition duration-300">
                  Thử váy AR
                </button>
              </Link>


              <Link href="/#news-section" className="block">
                <button className="bg-red-300 text-black font-bold text-2xl py-4 px-6 rounded-xl w-full hover:bg-red-400 transition duration-300">
                  Liên hệ đặt lịch tư vấn
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating call button (giữ nguyên) */}
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
