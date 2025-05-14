"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Tải danh sách khi trang được render
  useEffect(() => {
    fetchNews();
  }, []);

  // Lấy dữ liệu từ localStorage
  const fetchNews = () => {
    try {
      const savedNews = localStorage.getItem('newsItems');
      if (savedNews) {
        setNewsItems(JSON.parse(savedNews));
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      showMessage('Lỗi khi tải danh sách hình ảnh', 'error');
    }
  };

  // Hiển thị thông báo
  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      showMessage('Vui lòng chọn hình ảnh', 'error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Kiểm tra xem file đã tồn tại trong danh sách chưa
      const existingItem = newsItems.find(item => item.title === file.name);
      const isOverwriting = !!existingItem;

      // Tạo FormData
      const formData = new FormData();
      formData.append('file', file);

      console.log("Sending request to API...");
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log("Response status:", response.status);
      
      // Kiểm tra nếu response không phải JSON
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

      // Lưu thông tin với tên file gốc
      const fileTitle = result.file.name;
      
      let updatedNews: NewsItem[];
      
      if (isOverwriting) {
        // Cập nhật item hiện có nếu đang ghi đè
        updatedNews = newsItems.map(item => {
          if (item.title === fileTitle) {
            return {
              ...item,
              imageUrl: `${result.file.url}?v=${Date.now()}`, // Thêm timestamp để tránh cache
              createdAt: new Date().toISOString()
            };
          }
          return item;
        });
      } else {
        // Thêm mới nếu không phải ghi đè
        const newItem: NewsItem = {
          id: Date.now().toString(),
          title: fileTitle,
          imageUrl: result.file.url,
          createdAt: new Date().toISOString()
        };
        updatedNews = [...newsItems, newItem];
      }

      // Cập nhật danh sách và lưu vào localStorage
      setNewsItems(updatedNews);
      localStorage.setItem('newsItems', JSON.stringify(updatedNews));

      // Reset form
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

  // Xử lý xóa hình ảnh
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">TRANG QUẢN TRỊ</h1>

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