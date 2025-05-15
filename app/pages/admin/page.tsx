"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Link và FaPhone không được sử dụng trong AdminPage, có thể bỏ import nếu không cần
// import Link from 'next/link';
// import { FaPhone } from 'react-icons/fa';

// Interface cho dữ liệu NewsItem (giữ nguyên)
interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

// Interface cho dữ liệu cài đặt nhận được từ API /api/settings
// Cập nhật interface để bao gồm tất cả các biến cần quản lý
interface Settings {
  intro: string; // Đảm bảo key 'intro' tồn tại
  // hotline?: string; // Đã bỏ hotline
  // email_lien_he?: string; // Đã bỏ email_lien_he
  name?: string; // Thêm biến name (cho ProductDetail hoặc cài đặt chung)
  cost?: string; // Thêm biến cost (cho ProductDetail hoặc cài đặt chung)
  description?: string; // Thêm biến description (cho ProductDetail hoặc cài đặt chung)
  conceptText1?: string; // Thêm biến conceptText1
  conceptText2?: string; // Thêm biến concept2
  conceptText3?: string; // Thêm biến concept3
  [key: string]: any; // Cho phép các cài đặt khác
}


export default function AdminPage() {
  // State hiện có cho phần quản lý hình ảnh
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading cho upload hình ảnh
  const [message, setMessage] = useState(''); // Message cho upload hình ảnh
  const [messageType, setMessageType] = useState<'success' | 'error'>('success'); // Message type cho upload hình ảnh

  // --- STATE MỚI CHO PHẦN QUẢN LÝ CÀI ĐẶT ---
  // settings: lưu cài đặt gốc đọc từ API
  const [settings, setSettings] = useState<Settings | null>(null);
  // settingsForm: lưu dữ liệu đang chỉnh sửa trong form
  // Khởi tạo với các giá trị mặc định hoặc rỗng cho tất cả các biến cần quản lý
  const [settingsForm, setSettingsForm] = useState<Settings>({
    intro: '',
    // hotline: '', // Đã bỏ hotline
    // email_lien_he: '', // Đã bỏ email_lien_he
    name: '',
    cost: '',
    description: '',
    conceptText1: '', // Khởi tạo biến mới
    conceptText2: '', // Khởi tạo biến mới
    conceptText3: ''  // Khởi tạo biến mới
  });
  const [loadingSettings, setLoadingSettings] = useState(true); // Loading khi tải cài đặt ban đầu
  const [savingSettings, setSavingSettings] = useState(false); // Loading khi lưu cài đặt
  const [settingsMessage, setSettingsMessage] = useState(''); // Message cho thao tác cài đặt
  const [settingsMessageType, setSettingsMessageType] = useState<'success' | 'error'>('success'); // Message type cho cài đặt
  const [settingsError, setSettingsError] = useState<string | null>(null); // Lỗi khi tải cài đặt
  // ------------------------------------------


  // Tải danh sách hình ảnh khi trang được render (giữ nguyên)
  useEffect(() => {
    fetchNews();
  }, []);

  // --- useEffect MỚI để tải cài đặt khi trang được render ---
  useEffect(() => {
    setLoadingSettings(true);
    setSettingsMessage(''); // Xóa thông báo cũ
    setSettingsError(null); // Reset lỗi tải cài đặt

    fetch('/api/settings') // Gọi API Đọc cài đặt (App Router)
      .then(res => {
        if (!res.ok) {
          // Nếu API trả về lỗi (ví dụ: 500), vẫn cố gắng parse JSON để lấy thông báo lỗi
          return res.json().then(err => { throw new Error(err.message || `HTTP error! status: ${res.status}`); });
        }
        return res.json();
      })
      .then((data: Settings) => {
        setSettings(data); // Lưu cài đặt gốc
        // Điền dữ liệu vào form, sử dụng dữ liệu nhận được
        setSettingsForm(prev => ({
           ...prev, // Giữ lại các giá trị mặc định ban đầu nếu data không có key đó
           ...data // Ghi đè bằng dữ liệu từ API
        }));
      })
      .catch(error => {
        console.error('Lỗi khi tải cài đặt:', error);
        setSettingsError('Lỗi khi tải cài đặt.'); // Lưu thông báo lỗi tải
        setSettingsMessage(''); // Xóa thông báo thành công/lỗi lưu cũ
        setSettings(null); // Đảm bảo state gốc là null nếu có lỗi
      })
      .finally(() => {
        setLoadingSettings(false);
      });
  }, []); // Chỉ chạy một lần khi component mount


  // Lấy dữ liệu hình ảnh từ localStorage (giữ nguyên)
  const fetchNews = () => {
    try {
      const savedNews = localStorage.getItem('newsItems');
      if (savedNews) {
        setNewsItems(JSON.parse(savedNews));
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu hình ảnh:', error);
      showMessage('Lỗi khi tải danh sách hình ảnh', 'error');
    }
  };

  // Hiển thị thông báo cho upload hình ảnh (giữ nguyên)
  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  // --- Hiển thị thông báo cho cài đặt ---
  const showSettingsMessage = (msg: string, type: 'success' | 'error') => {
    setSettingsMessage(msg);
    setSettingsMessageType(type);
    setTimeout(() => setSettingsMessage(''), 5000);
  };


  // Xử lý khi chọn file (giữ nguyên)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Xử lý khi submit form upload (giữ nguyên)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      showMessage('Vui lòng chọn hình ảnh', 'error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const existingItem = newsItems.find(item => item.title === file.name);
      const isOverwriting = !!existingItem;

      const formData = new FormData();
      formData.append('file', file);

      console.log("Sending request to API /api/upload...");
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid content type:', contentType);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Server không trả về JSON');
      }

      const result = await response.json();
      console.log("Response data:", result);

      if (!result.success) {
        throw new Error(result.message || 'Upload thất bại');
      }

      const fileTitle = result.file.name;

      let updatedNews: NewsItem[];

      if (isOverwriting) {
        updatedNews = newsItems.map(item => {
          if (item.title === fileTitle) {
            return {
              ...item,
              imageUrl: `${result.file.url}?v=${Date.now()}`,
              createdAt: new Date().toISOString()
            };
          }
          return item;
        });
      } else {
        const newItem: NewsItem = {
          id: Date.now().toString(),
          title: fileTitle,
          imageUrl: result.file.url,
          createdAt: new Date().toISOString()
        };
        updatedNews = [...newsItems, newItem];
      }

      setNewsItems(updatedNews);
      localStorage.setItem('newsItems', JSON.stringify(updatedNews));

      setFile(null);
      setImagePreview(null);
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      const messageText = isOverwriting
        ? `Đã cập nhật hình ảnh "${fileTitle}" thành công!`
        : `Đã thêm hình ảnh "${fileTitle}" thành công!`;

      showMessage(messageText, 'success');
    } catch (error: any) {
      console.error('Upload error:', error);
      showMessage(error.message || 'Lỗi khi upload file', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa hình ảnh (giữ nguyên)
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        const updatedNews = newsItems.filter(item => item.id !== id);
        setNewsItems(updatedNews);
        localStorage.setItem('newsItems', JSON.stringify(updatedNews));
        showMessage('Xóa hình ảnh thành công!', 'success');
      } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
        showMessage('Lỗi khi xóa hình ảnh', 'error');
      }
    }
  };

  // --- HANDLER CHO FORM CHỈNH SỬA CÀI ĐẶT ---
  const handleSettingsFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettingsForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    setSavingSettings(true);
    setSettingsMessage(''); // Xóa thông báo cũ

    try {
      console.log("Sending request to API /api/settings (POST) to save settings...");
      const response = await fetch('/api/settings', { // <-- Gọi API Ghi cài đặt App Router
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // !!! THÊM HEADER XÁC THỰC ADMIN NẾU BẠN TRIỂN KHAI BẢO MẬT !!!
          // 'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify(settingsForm), // Gửi dữ liệu từ form
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid content type:', contentType);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Server không trả về JSON');
      }

      const result = await response.json();
      console.log("Response data:", result);

      // Kiểm tra status code thành công (ví dụ: 200 OK) hoặc API trả về success: true
      if (response.status !== 200) {
         throw new Error(result.message || `Lỗi khi lưu cài đặt (Status: ${response.status})`);
      }

      // Cập nhật state settings chính sau khi lưu thành công
      setSettings(result.settings); // API POST trả về cài đặt đã lưu

      showSettingsMessage('Đã lưu cài đặt thành công!', 'success');

    } catch (error: any) {
      console.error('Save settings error:', error);
      showSettingsMessage(error.message || 'Lỗi khi lưu cài đặt', 'error');
      setSettingsMessageType('error');
    } finally {
      setSavingSettings(false);
    }
  };
  // -----------------------------------------------------


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">TRANG QUẢN TRỊ</h1>

        {/* --- PHẦN QUẢN LÝ CÀI ĐẶT MỚI --- */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Cài đặt Website</h2>

          {loadingSettings ? (
            <p className="text-center text-gray-500">Đang tải cài đặt...</p>
          ) : settingsError ? ( // Hiển thị lỗi tải cài đặt nếu có
             <div className="p-3 rounded bg-red-100 text-red-700">
                 {settingsError}
             </div>
          ) : (
            <form onSubmit={handleSaveSettings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Dùng grid 2 cột trên md trở lên */}
                {/* Input cho biến 'intro' */}
                <div>
                  <label htmlFor="intro" className="block mb-2 font-medium">Nội dung giới thiệu:</label>
                  <textarea
                    id="intro"
                    name="intro"
                    rows={4}
                    value={settingsForm.intro || ''} // Sử dụng || '' để tránh undefined
                    onChange={handleSettingsFormChange}
                    className="w-full border rounded p-2"
                  />
                </div>

                 {/* Input cho biến 'name' (Tên sản phẩm/Website/...) */}
                 <div>
                   <label htmlFor="name" className="block mb-2 font-medium">Tên (SP/Web):</label>
                   <input
                     id="name"
                     name="name"
                     type="text"
                     value={settingsForm.name || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>

                 {/* Input cho biến 'cost' (Giá SP/...) */}
                 <div>
                   <label htmlFor="cost" className="block mb-2 font-medium">Giá (SP/...):</label>
                   <input
                     id="cost"
                     name="cost"
                     type="text" // Có thể dùng text để nhập cả ký hiệu tiền tệ
                     value={settingsForm.cost || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>

                 {/* Input cho biến 'description' (Mô tả SP/...) */}
                 <div>
                   <label htmlFor="description" className="block mb-2 font-medium">Mô tả (SP/...):</label>
                   <textarea
                     id="description"
                     name="description"
                     rows={4}
                     value={settingsForm.description || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>

                 {/* Input cho biến 'conceptText1' */}
                 <div>
                   <label htmlFor="conceptText1" className="block mb-2 font-medium">Nội dung Concept 1:</label>
                   <textarea
                     id="conceptText1"
                     name="conceptText1"
                     rows={3}
                     value={settingsForm.conceptText1 || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>

                 {/* Input cho biến 'conceptText2' */}
                 <div>
                   <label htmlFor="conceptText2" className="block mb-2 font-medium">Nội dung Concept 2:</label>
                   <textarea
                     id="conceptText2"
                     name="conceptText2"
                     rows={3}
                     value={settingsForm.conceptText2 || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>

                 {/* Input cho biến 'conceptText3' */}
                 <div>
                   <label htmlFor="conceptText3" className="block mb-2 font-medium">Nội dung Concept 3:</label>
                   <textarea
                     id="conceptText3"
                     name="conceptText3"
                     rows={3}
                     value={settingsForm.conceptText3 || ''}
                     onChange={handleSettingsFormChange}
                     className="w-full border rounded p-2"
                   />
                 </div>


              </div>

              {settingsMessage && (
                <div className={`p-3 mt-4 rounded ${
                  settingsMessageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {settingsMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={savingSettings}
                className={`${
                  savingSettings ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } text-white py-2 px-6 rounded-lg transition-colors mt-4`}
              >
                {savingSettings ? 'Đang lưu...' : 'Lưu Cài đặt'}
              </button>
            </form>
          )}
        </div>
        {/* --------------------------------- */}


        {/* Phần quản lý hình ảnh (Giữ nguyên code của bạn) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Thêm hình ảnh mới</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Chọn file hình ảnh:</label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border rounded p-2"
                  />
                  <p className="mt-1 text-sm text-gray-500">Tên file sẽ được giữ nguyên và được dùng làm tiêu đề</p>
                  <p className="mt-1 text-sm text-gray-500">Nếu đã tồn tại file cùng tên, file mới sẽ ghi đè lên file cũ</p>
                </div>

                {message && (
                  <div className={`p-3 mb-4 rounded ${
                    messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !file}
                  className={`${
                    loading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white py-2 px-6 rounded-lg transition-colors`}
                >
                  {loading ? 'Đang xử lý...' : 'Tải lên'}
                </button>
              </div>

              <div className="border rounded p-4">
                <h3 className="text-lg font-medium mb-2">Xem trước hình ảnh</h3>
                <div className="bg-gray-100 rounded aspect-video flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400">Chưa chọn hình ảnh</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Danh sách hình ảnh</h2>

          {newsItems.length === 0 ? (
            <p className="text-center text-gray-500 py-4">Chưa có hình ảnh nào.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên file</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian cập nhật</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {newsItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 whitespace-nowrap">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div className="w-16 h-16 relative bg-gray-100">
                          <img
                            src={`${item.imageUrl}?v=${new Date(item.createdAt).getTime()}`} // Thêm timestamp để tránh cache
                            alt={item.title}
                            className="w-16 h-16 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-2.35 3.02-1.56-1.88c-.2-.25-.58-.24-.78.01l-1.74 2.23c-.2.26-.02.64.29.64h8.98c.3 0 .5-.37.29-.64l-2.55-3.21c-.19-.24-.55-.23-.75.02z"/%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.title}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
