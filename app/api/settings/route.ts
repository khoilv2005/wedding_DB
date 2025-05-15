// app/api/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Đảm bảo đường dẫn này khớp với vị trí file settings.json của bạn
// Nếu file ở gốc project:
const settingsFilePath = path.join(process.cwd(), 'settings.json');
// Nếu file ở cùng thư mục với route.ts:
// const settingsFilePath = path.join(__dirname, 'settings.json');


// =========================================================================
// API Đọc cài đặt (GET /api/settings) - Giữ nguyên hoặc dùng code đã sửa ENOENT
// =========================================================================
export async function GET() {
  // ... (Code hàm GET ở đây) ...
  // Sử dụng code GET đã hoạt động và sửa lỗi ENOENT đầy đủ
  try {
    const fileContent = await fs.readFile(settingsFilePath, 'utf8');
    const settings = JSON.parse(fileContent);
    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn(`Settings file not found at ${settingsFilePath}. Returning full default settings.`);
      const defaultSettings = { intro: "Nội dung giới thiệu mặc định khi file không tồn tại", otherSetting: "Giá trị mặc định khác" }; // Thêm các biến mặc định khác
      return NextResponse.json(defaultSettings);
    }
    console.error('Failed to load settings:', error);
    return NextResponse.json({ message: 'Failed to load settings', error: error.message }, { status: 500 });
  }
}


// =========================================================================
// API Ghi/Cập nhật cài đặt (POST /api/settings)
// =========================================================================
export async function POST(request: NextRequest) {
  // !!! CẢNH BÁO BẢO MẬT: KHÔNG CÓ XÁC THỰC ADMIN !!!
  // Bất kỳ ai cũng có thể gọi API này để thay đổi file settings.json.
  // KHÔNG DÙNG TRONG MÔI TRƯỜNG THỰC TẾ MÀ CHƯA CÓ BẢO MẬT.

  try {
    // 1. Đọc dữ liệu cài đặt MỚI từ body của request
    const newSettingsData = await request.json();

    if (typeof newSettingsData !== 'object' || newSettingsData === null) {
        return NextResponse.json({ message: 'Invalid data format. Expected a JSON object.' }, { status: 400 });
    }

    let settings: any; // Sử dụng any cho đơn giản nếu không dùng interface Settings

    try {
      // 2. Đọc nội dung file cài đặt HIỆN TẠI
      const fileContent = await fs.readFile(settingsFilePath, 'utf8');
      settings = JSON.parse(fileContent);
    } catch (readError: any) {
       if (readError.code === 'ENOENT') {
         // Nếu file chưa tồn tại, bắt đầu với object rỗng hoặc mặc định
         console.warn(`Settings file not found. Starting with empty settings or initial defaults.`);
         settings = {}; // Bắt đầu với object rỗng
       } else {
         console.error('Failed to read settings file before update:', readError);
         return NextResponse.json({ message: 'Failed to read settings before update', error: readError.message }, { status: 500 });
       }
    }

    // 3. Gộp dữ liệu MỚI nhận được vào object cài đặt HIỆN TẠI
    Object.assign(settings, newSettingsData);

    // 4. Chuyển object đã cập nhật thành chuỗi JSON
    const updatedContent = JSON.stringify(settings, null, 2);

    // 5. Ghi chuỗi JSON đã cập nhật trở lại vào file
    await fs.writeFile(settingsFilePath, updatedContent, 'utf8');

    // 6. Trả về phản hồi thành công
    return NextResponse.json({ message: 'Settings updated successfully', settings: settings });

  } catch (error: any) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ message: 'Failed to update settings', error: error.message }, { status: 500 });
  }
}

// Interface Settings (có thể để ở đây hoặc file riêng)
// interface Settings {
//   intro: string;
//   [key: string]: any;
// }
