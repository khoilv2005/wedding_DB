import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access, constants } from 'fs/promises';
import { mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra phương thức request
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    // Parse form data từ request
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy file' },
        { status: 400 }
      );
    }

    // Tạo mảng bytes từ file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo thư mục uploads nếu chưa tồn tại
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      console.error('Lỗi khi tạo thư mục:', error);
    }

    // Giữ nguyên tên file gốc thay vì thêm timestamp
    const originalFilename = file.name;
    const filepath = path.join(uploadsDir, originalFilename);

    // Ghi file vào thư mục (ghi đè nếu file đã tồn tại)
    await writeFile(filepath, buffer);

    // Trả về thông tin file đã upload
    const fileUrl = `/uploads/${originalFilename}`;
    return NextResponse.json({
      success: true,
      message: 'Upload thành công',
      file: {
        name: originalFilename,
        url: fileUrl,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}