"use client"; // Thêm directive này nếu sử dụng App Router
import React, { useState, useEffect } from 'react'; // Import useState và useEffect
import Image from 'next/image';
import styles from './ConceptLayout.module.css'; // Import CSS Module

// Interface cho dữ liệu cài đặt nhận được từ API /api/settings
// Thêm các biến mới cho nội dung concept
interface Settings {
  intro: string;
  hotline?: string;
  email_lien_he?: string;
  name?: string;
  cost?: string;
  description?: string;
  concepttext1?: string; // Biến mới cho "Tự điển nd 1"
  concepttext2?: string; // Biến mới cho "Tự điển nd 2"
  concepttext3?: string; // Biến mới cho "Tự điển nd 3"
  [key: string]: any; // Cho phép các cài đặt khác
}

const ConceptLayout = () => {
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
        setSettingsError("Không thể tải nội dung concept."); // Lưu thông báo lỗi
        setFetchedSettings(null); // Đảm bảo state là null nếu có lỗi
      })
      .finally(() => {
        setLoadingSettings(false); // Kết thúc trạng thái tải
      });

  }, []); // Mảng dependencies rỗng: effect chỉ chạy 1 lần sau render đầu tiên


  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.imageWrapper}>
          {/* Replace with your image path */}
          <Image src="/uploads/linhnga1.jpg" alt="Top Left Image" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.textBlock}>
          {/* --- HIỂN THỊ NỘI DUNG CONCEPT 1 TỪ STATE (LẤY TỪ API) --- */}
          <h2>
            {loadingSettings ? (
              "Đang tải..."
            ) : settingsError ? (
              "Lỗi tải nội dung"
            ) : fetchedSettings && fetchedSettings.concepttext1 ? (
              // Hiển thị nội dung nếu tải thành công và biến 'conceptText1' tồn tại
              fetchedSettings.concepttext1
            ) : (
              // Trường hợp tải xong nhưng không có dữ liệu conceptText1
              "Nội dung 1 chưa cập nhật"
            )}
          </h2>
          {/* ---------------------------------------------------------- */}
        </div>
        <div className={styles.imageWrapper}>
          {/* Replace with your image path */}
          <Image src="/uploads/linhnga2.jpg" alt="Top Right Image" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.textBlock}>
           {/* --- HIỂN THỊ NỘI DUNG CONCEPT 2 TỪ STATE (LẤY TỪ API) --- */}
          <h2>
             {loadingSettings ? (
              "Đang tải..."
            ) : settingsError ? (
              "Lỗi tải nội dung"
            ) : fetchedSettings && fetchedSettings.concepttext2 ? (
              // Hiển thị nội dung nếu tải thành công và biến 'concepttext2' tồn tại
              fetchedSettings.concepttext2
            ) : (
              // Trường hợp tải xong nhưng không có dữ liệu concepttext2
              "Nội dung 2 chưa cập nhật"
            )}
          </h2>
           {/* ---------------------------------------------------------- */}
        </div>
        <div className={styles.imageWrapperCentered}>
           {/* Replace with your image path */}
           <Image src="/uploads/linhnga3.jpg" alt="Bottom Center Image" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.textBlock}>
           {/* --- HIỂN THỊ NỘI DUNG CONCEPT 3 TỪ STATE (LẤY TỪ API) --- */}
          <h2>
             {loadingSettings ? (
              "Đang tải..."
            ) : settingsError ? (
              "Lỗi tải nội dung"
            ) : fetchedSettings && fetchedSettings.concepttext3 ? (
              // Hiển thị nội dung nếu tải thành công và biến 'concepttext3' tồn tại
              fetchedSettings.concepttext3
            ) : (
              // Trường hợp tải xong nhưng không có dữ liệu concepttext3
              "Nội dung 3 chưa cập nhật"
            )}
          </h2>
           {/* ---------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default ConceptLayout;
