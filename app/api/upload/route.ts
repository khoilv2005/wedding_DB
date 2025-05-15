import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access, constants } from 'fs/promises';
import { mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp'; // Import thư viện sharp

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra phương thức request (có thể bỏ qua vì handler chỉ là POST)
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
    let buffer = Buffer.from(bytes); // Để TypeScript tự suy luận kiểu
    const originalFilename = file.name;
    const fileExtension = path.extname(originalFilename).toLowerCase();
    const filenameWithoutExt = path.parse(originalFilename).name;
    let savedFilename = originalFilename; // Tên file sẽ được lưu
    let savedFileExtension = fileExtension; // Đuôi file sẽ được lưu

    // Kiểm tra nếu file là PNG thì chuyển đổi sang JPG
    if (file.type === 'image/png' || fileExtension === '.png') {
      try {
        buffer = Buffer.from(await sharp(buffer).jpeg().toBuffer()); // Chuyển đổi từ buffer PNG sang buffer JPG
        savedFilename = `${filenameWithoutExt}.jpg`; // Đổi tên file sang .jpg
        savedFileExtension = '.jpg';
        console.log(`Đã chuyển đổi file ${originalFilename} sang JPG.`);
      } catch (error) {
        console.error('Lỗi khi chuyển đổi PNG sang JPG:', error);
        // Tùy chọn: Trả về lỗi hoặc vẫn lưu file gốc nếu chuyển đổi thất bại
        // Hiện tại, nếu lỗi sẽ giữ nguyên buffer ban đầu (là PNG) và lưu với tên gốc.
        // Bạn có thể quyết định cách xử lý lỗi phù hợp hơn.
        savedFilename = originalFilename; // Giữ tên gốc nếu chuyển đổi lỗi
        savedFileExtension = fileExtension;
      }
    } else {
        // Nếu không phải PNG, giữ nguyên định dạng và tên file
        console.log(`File ${originalFilename} không phải PNG, giữ nguyên định dạng.`);
    }


    // Tạo thư mục uploads nếu chưa tồn tại
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
      console.log(`Đảm bảo thư mục ${uploadsDir} tồn tại.`);
    } catch (error) {
      console.error('Lỗi khi tạo thư mục:', error);
      // Xử lý lỗi tạo thư mục nếu cần
      return NextResponse.json(
        { success: false, message: 'Lỗi server khi tạo thư mục upload' },
        { status: 500 }
      );
    }

    // Đường dẫn đầy đủ để lưu file
    const filepath = path.join(uploadsDir, savedFilename);

     // Kiểm tra xem file đã tồn tại chưa (tùy chọn: có thể bỏ qua nếu muốn ghi đè)
    // try {
    //     await access(filepath, constants.F_OK);
    //     console.log(`File ${savedFilename} đã tồn tại, sẽ ghi đè.`);
    // } catch (e) {
    //      console.log(`File ${savedFilename} chưa tồn tại.`);
    // }


    // Ghi file vào thư mục (ghi đè nếu file đã tồn tại)
    await writeFile(filepath, buffer);
    console.log(`Đã ghi file ${savedFilename} vào ${filepath}`);

    // Trả về thông tin file đã upload
    const fileUrl = `/uploads/${savedFilename}`; // URL công khai để truy cập file đã lưu

    // Lấy lại thông tin kích thước và loại file cho phản hồi
    // Kích thước sẽ là kích thước của buffer cuối cùng (sau chuyển đổi nếu có)
    // Loại file sẽ dựa vào đuôi mở rộng cuối cùng
    const savedFileSize = buffer.length;
    const savedFileType = savedFileExtension === '.jpg' ? 'image/jpeg' : file.type;


    return NextResponse.json({
      success: true,
      message: savedFileExtension === '.jpg' ? 'Upload và chuyển đổi sang JPG thành công' : 'Upload thành công',
      file: {
        name: savedFilename, // Tên file sau khi lưu (có thể đã đổi đuôi)
        url: fileUrl,
        size: savedFileSize, // Kích thước file sau khi xử lý
        type: savedFileType, // Loại file sau khi xử lý
      },
    });
  } catch (error) {
    console.error('Lỗi server trong quá trình upload:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}