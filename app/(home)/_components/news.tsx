import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NewsItem {
  id: number;
  imageUrl: string; 
}

interface NewsSectionProps {
  heading?: string;
  intro?: string;
  ctaRedirectUrl?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  heading = "TIN TỨC",
  intro = "Vài câu giới thiệu",
  ctaRedirectUrl = "/dat-lich",
}) => {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([
    { id: 1, imageUrl: "/logo.jpg" },
    { id: 2, imageUrl: "/images/news2.jpg" },
    { id: 3, imageUrl: "/images/news3.jpg" },
  ]);
  const [loading, setLoading] = useState(false);

  // State cho form
  const [form, setForm] = useState({
    name: "",
    phone: "",
    time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setNews(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Nút gửi chỉ để tượng trưng, không submit
  const handleFakeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Chỉ tượng trưng, không làm gì cả
  };

  return (
    <section className="py-10 flex flex-col items-center">
      <h2 className="text-5xl font-light mb-2">{heading}</h2>
      <p className="mb-8 text-xl font-light">{intro}</p>
      
      {/* Container cho 3 hình ảnh tin tức */}
      <div className="flex flex-row gap-10 mb-16 overflow-x-auto w-full justify-center">
        {loading ? (
          <div className="text-xl text-gray-400">Đang tải tin tức...</div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="bg-black rounded-2xl flex items-center justify-center w-[600px] h-[810px] overflow-hidden"
            >
              <Image 
                src={item.imageUrl} 
                alt={`Tin tức ${item.id}`}
                width={600} 
                height={810} 
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl">
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