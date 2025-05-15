// pages/api/settings/update-settings.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Định nghĩa đường dẫn đầy đủ đến file settings.json
// __dirname ở đây là 'pages/api/settings/'
const settingsFilePath = path.join(__dirname, 'settings.json');

// Giao diện cho dữ liệu cài đặt
interface Settings {
  intro: string;
  [key: string]: any; // Cho phép các cài đặt khác
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // =========================================================================
  // !!! LƯU Ý QUAN TRỌNG VỀ BẢO MẬT:
  // Endpoint này KHÔNG CÓ XÁC THỰC ADMIN.
  // Bất kỳ ai có thể gửi yêu cầu POST đến /api/settings/update-settings
  // để thay đổi nội dung file settings.json.
  // KHÔNG BAO GIỜ LÀM VẬY TRONG MÔI TRƯỜNG SẢN PHẨM THỰC TẾ
  // trừ khi bạn có biện pháp bảo mật khác cực kỳ chắc chắn ở tầng cao hơn.
  // =========================================================================


  if (req.method !== 'POST') { // Hoặc PUT
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Lấy toàn bộ dữ liệu cài đặt mới từ body của request
  const newSettingsData = req.body;

  if (typeof newSettingsData !== 'object' || newSettingsData === null) {
      return res.status(400).json({ message: 'Invalid data format. Expected a JSON object.' });
  }

  try {
    let settings: Settings;
    // Khai báo readError ở đây để có thể truy cập bên ngoài khối catch
    let readError: any | undefined;

    try {
      // --- Bước 1: Đọc nội dung file hiện tại ---
      const fileContent = await fs.promises.readFile(settingsFilePath, 'utf8');
      settings = JSON.parse(fileContent) as Settings;

    } catch (error: any) {
       // Gán lỗi cho biến readError đã khai báo ở ngoài
       readError = error;
       if (readError.code === 'ENOENT') {
         // Nếu file chưa tồn tại, khởi tạo object cài đặt mới bằng dữ liệu nhận được
         console.warn(`Settings file not found at ${settingsFilePath}. Creating a new one with data from request.`);
         settings = newSettingsData as Settings; // Bắt đầu file mới với dữ liệu gửi lên
       } else {
         // Xử lý các lỗi đọc file khác
         console.error('Failed to read settings file before update:', readError);
         return res.status(500).json({ message: 'Failed to read settings before update', error: readError.message });
       }
    }

    // --- Bước 2: Cập nhật các giá trị mới vào object cài đặt (chỉ khi file đã tồn tại trước đó) ---
     // Sử dụng biến readError đã được gán
     if (readError?.code !== 'ENOENT') { // Chỉ gộp nếu file đã tồn tại trước đó (không phải do ENOENT)
       // Gộp dữ liệu mới nhận được vào object cài đặt hiện tại
       // Điều này sẽ ghi đè các key trùng tên và thêm các key mới
       Object.assign(settings, newSettingsData);
    }


    // --- Bước 3: Chuyển object cài đặt đã cập nhật thành chuỗi JSON ---
    const updatedContent = JSON.stringify(settings, null, 2); // null, 2 để format JSON

    // --- Bước 4: Ghi chuỗi JSON đã cập nhật trở lại vào file ---
    await fs.promises.writeFile(settingsFilePath, updatedContent, 'utf8');

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Settings updated successfully', settings: settings });

  } catch (error: any) {
    // Xử lý các lỗi khác (lỗi ghi file, lỗi parse JSON sau khi đọc...)
    console.error('Failed to write settings file:', error);
    res.status(500).json({ message: 'Failed to update settings', error: error.message });
  }
}
