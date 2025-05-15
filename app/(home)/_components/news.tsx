import React, { useEffect, useState } from "react";
// Giữ lại các import gốc của bạn
import { useRouter } from "next/navigation";
import Image from "next/image";

// Interface cho dữ liệu NewsItem (giữ nguyên)
interface NewsItem {
  id: number;
  imageUrl: string;
}

// Interface cho dữ liệu cài đặt nhận được từ API /api/settings
interface Settings {
  intro: string; // Đảm bảo key 'intro' tồn tại
  hotline?: string; // Thêm các key khác nếu bạn cần dùng trong component này
  [key: string]: any; // Cho phép các cài đặt khác
}

// Interface cho props của NewsSection (giữ lại heading và ctaRedirectUrl)
interface NewsSectionProps {
  heading?: string;
  // Prop 'intro' không còn dùng trực tiếp để hiển thị nữa, bỏ hoặc giữ làm fallback nếu muốn
  // intro?: string;
  ctaRedirectUrl?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  heading = "TIN TỨC",
  // intro = "Vài câu giới thiệu", // Bỏ hoặc giữ nếu bạn vẫn muốn dùng làm fallback ban đầu
  ctaRedirectUrl = "/dat-lich",
}) => {
  // Giữ lại các state và router gốc của bạn
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([
    { id: 1, imageUrl: "/upload/news1.jpg" },
    { id: 2, imageUrl: "/upload/news2.jpg" },
    { id: 3, imageUrl: "/upload/news3.jpg" },
  ]);
  // Giữ lại state loading cho tin tức (nếu fetch API /api/admin/news hoạt động)
  const [loadingNews, setLoadingNews] = useState(false); // Đổi tên để phân biệt loading tin tức và loading cài đặt


  // --- THÊM STATE MỚI CHO CÀI ĐẶT TỪ API ---
  const [fetchedSettings, setFetchedSettings] = useState<Settings | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true); // Bắt đầu là true vì sẽ fetch ngay
  const [settingsError, setSettingsError] = useState<string | null>(null);
  // ----------------------------------------

  // State cho form (giữ nguyên)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "",
  });
  const [submitting, setSubmitting] = useState(false); // Giữ nguyên
  const [error, setError] = useState<string | null>(null); // Giữ nguyên

  // --- useEffect để fetch cài đặt từ API /api/settings ---
  useEffect(() => {
    setLoadingSettings(true); // Bắt đầu trạng thái tải cài đặt
    setSettingsError(null); // Reset lỗi trước khi fetch

    fetch("/api/settings") // <-- Gọi API Đọc cài đặt App Router của bạn
      .then((res) => {
        if (!res.ok) {
          // Xử lý nếu phản hồi không thành công (ví dụ: status 404, 500)
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse phản hồi sang JSON
      })
      .then((data) => {
        // Dữ liệu nhận được là object chứa tất cả cài đặt
        setFetchedSettings(data); // Lưu toàn bộ object cài đặt vào state
      })
      .catch((error) => {
        console.error("Failed to fetch settings:", error);
        setSettingsError("Không thể tải nội dung giới thiệu."); // Lưu thông báo lỗi
        setFetchedSettings(null); // Đảm bảo state là null nếu có lỗi
      })
      .finally(() => {
        setLoadingSettings(false); // Kết thúc trạng thái tải cài đặt
      });

  }, []); // Mảng dependencies rỗng: effect chỉ chạy 1 lần sau render đầu tiên


  // Giữ nguyên useEffect fetch tin tức (nếu cần) hoặc xóa nếu không dùng API này
  useEffect(() => {
    // Nếu API /api/admin/news thực sự tồn tại và hoạt động
    setLoadingNews(true);
    fetch("/api/admin/news") // <-- API fetch tin tức gốc của bạn
      .then((res) => res.json())
      .then((data) => {
         // Giả định API này trả về mảng NewsItem
        if (Array.isArray(data) && data.length > 0) {
           setNews(data);
        } else {
           // Sử dụng dữ liệu giả nếu API không trả về mảng hoặc trả về mảng rỗng
           console.warn("API /api/admin/news did not return news data. Using mock data.");
           setNews([
             { id: 1, imageUrl: "/upload/news1.jpg" },
             { id: 2, imageUrl: "/upload/news2.jpg" },
             { id: 3, imageUrl: "/upload/news3.jpg" },
           ]);
        }
      })
      .catch((err) => {
        // Xử lý lỗi fetch tin tức
        console.error("Failed to fetch news:", err);
        // Sử dụng dữ liệu giả nếu fetch lỗi
        setNews([
          { id: 1, imageUrl: "/upload/news1.jpg" },
          { id: 2, imageUrl: "/upload/news2.jpg" },
          { id: 3, imageUrl: "/upload/news3.jpg" },
        ]);
      })
      .finally(() => setLoadingNews(false));
  }, []); // Mảng dependencies rỗng

  // Xử lý thay đổi input (giữ nguyên)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Nút gửi chỉ để tượng trưng, không submit (giữ nguyên)
  const handleFakeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Chỉ tượng trưng, không làm gì cả
  };

  return (
    <section className="py-10 flex flex-col items-center">
      <h2 className="text-5xl font-light mb-2">{heading}</h2>

      {/* --- HIỂN THỊ NỘI DUNG GIỚI THIỆU TỪ STATE (LẤY TỪ API) --- */}
      <p className="mb-8 text-xl font-light">
        {loadingSettings ? (
          // Hiển thị trạng thái tải cài đặt
          "Đang tải nội dung giới thiệu..."
        ) : settingsError ? (
          // Hiển thị lỗi nếu không tải được cài đặt
          settingsError
        ) : fetchedSettings && fetchedSettings.intro !== undefined ? (
          // Hiển thị nội dung giới thiệu nếu tải thành công và biến 'intro' tồn tại
          fetchedSettings.intro
        ) : (
          // Trường hợp tải xong nhưng biến 'intro' không tồn tại trong dữ liệu
          // Sử dụng giá trị mặc định hoặc thông báo
          "Nội dung giới thiệu mặc định (chưa cấu hình trên API)"
        )}
      </p>
      {/* ---------------------------------------------------------- */}


      {/* Container cho 3 hình ảnh tin tức (Giữ nguyên code của bạn) */}
      <div className="flex flex-row gap-10 mb-16 overflow-x-auto w-full justify-center">
        {loadingNews ? (
          <div className="text-xl text-gray-400">Đang tải tin tức...</div>
        ) : (
           // Sử dụng state 'news' đã được fetch hoặc dùng dữ liệu giả nếu API lỗi/không có
           news.length > 0 ? (
             news.map((item) => (
               <div
                 key={item.id}
                 className="bg-black rounded-2xl flex items-center justify-center w-[600px] h-[810px] overflow-hidden flex-shrink-0"
               >
                 {/* Sử dụng component Image của Next.js nếu có, hoặc thẻ img */}
                 {/* Nếu dùng Next/image, đảm bảo bạn đã cấu hình cho external images nếu cần */}
                 <Image
                   src={item.imageUrl}
                   alt={`Tin tức ${item.id}`}
                   width={600}
                   height={810}
                   className="w-full h-full object-cover"
                 />
                 {/* Hoặc dùng thẻ img nếu gặp lỗi với Next/image hoặc ảnh nằm trong public */}
                 {/* <img src={item.imageUrl} alt={`Tin tức ${item.id}`} className="w-full h-full object-cover" /> */}
               </div>
             ))
           ) : (
              // Hiển thị thông báo nếu không có tin tức sau khi tải xong
              <div className="text-xl text-gray-400">Không có tin tức nào để hiển thị.</div>
           )
        )}
      </div>

      {/* Form liên hệ (Giữ nguyên code của bạn) */}
      <div id="news-section" className="flex flex-col items-center w-full max-w-2xl ">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">LIÊN HỆ VỚI CHÚNG TÔI</p>
          <p className="text-3xl font-semibold mb-3">Đặt Lịch Hẹn Tư Vấn</p>
        </div>

        <form
          className="w-full flex flex-col gap-4 text-left mb-8 px-6 py-6 bg-white rounded-2xl shadow-lg"
          onSubmit={handleFakeSubmit}
        >
          <label className="text-lg font-medium">
            Họ và Tên:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-3 text-lg"
              required
            />
          </label>
          <label className="text-lg font-medium">
            Số điện thoại:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-3 text-lg"
              required
            />
          </label>
          <label className="text-lg font-medium">
            Thời gian tư vấn dự kiến:
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2 text-lg"
            />
          </label>
          {error && (
            <div className="text-red-500 text-base my-2">{error}</div>
          )}
          <button
            type="submit"
            className="mt-6 w-[240px] mx-auto bg-[#e6c7fa] hover:bg-[#d4aef7] text-black text-2xl font-bold rounded-xl py-3 transition"
            disabled={submitting}
          >
            ĐẶT NGAY
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsSection;
