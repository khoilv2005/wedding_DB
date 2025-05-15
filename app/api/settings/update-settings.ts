// app/api/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg'; // Sử dụng Pool từ thư viện pg

// --- CẤU HÌNH KẾT NỐI DATABASE (HARDCODED - KHÔNG AN TOÀN CHO PRODUCTION) ---
// Chuỗi kết nối database PostgreSQL của bạn được đặt trực tiếp ở đây.
// Vui lòng THAY THẾ CHUỖI NÀY bằng chuỗi kết nối THỰC TẾ của bạn.
// Ví dụ: postgres://user:password@host:port/database?sslmode=require
const databaseUrl = "postgres://avnadmin:AVNS_NndJQN9mImhY7RcStmG@pg-15cf1a87-khoakim09-f275.l.aivencloud.com:11586/defaultdb?sslmode=require";

// --- CHỨNG CHỈ CA (HARDCODED - KHÔNG AN TOÀN CHO PRODUCTION) ---
// Nội dung chứng chỉ CA được đặt trực tiếp ở đây.
// Vui lòng THAY THẾ NỘI DUNG NÀY bằng chứng chỉ CA THỰC TẾ của bạn.
const hardcodedCaCert = `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUIZmqMLoDgcrloNefS0gZ9ycL9P8wDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1NTdkMjRkZTYtZTY3OC00OTY4LWFiMWYtOTc5Yjg5ZDgx
YmUyIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNTA0MTc0ODU1WhcNMzUwNTAyMTc0
ODU1WjBAMT4wPAYDVQQDDDU1N2QyNGRlNi1lNjc4LTQ5NjgtYWIxZi05NzliODlk
ODFiZTIgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAK7eyaf87ZVWbP4UjjEXhtX5rog6FEw+pWjtmMV7zd7fvOnVA93O4yIY
pHgR78rJn5TyyaDaiZCYhLYHtvOR3ohKQ6/c+5UhCy86kq09Tbb6U2RA2Q7K6hHo
eHU0rVk58lGBdd7adagcXtMrgrEe1sUIWj/QamCEPBG0EtsG3g3ZnObxlv8CJUhA
I0mmNrouMi9X1oqoy3qw/ac6Ok7dG4/eH+nWfcFjfBTGpfI8/vMUbXhYzdVJ1G2h
NlJQjbvvTovTPSYDQ0UPbSsAiN2tYAn4rLY63+t1FK9h0S7G388BZwPnPOP+Mg+G
4gMFyN6aap8DUrq4ORvjTekl7CmQ30i4jHHMqR37l/XeK/bAsOpR1scY3c6fpVKB
B8rnBqUc+AadVV/1katEO1AVuCduUetN09pp0aQv9AmavfNRrTVMiIHiuUbZL6AA
+iqADxFJKjlKoWQhfMbj948B1CX8NPOIh/K1rMz5ZgIddGyBiIiSJ+OtC6h5H86S
nNsV4IMJJwIDAQABoz8wPTAdBgNVHQ4EFgQUXBBOBXBvKRtEbq5UTeuCRo9EWpMw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AD7QnAM9Ptmqvjm+0LMiBBPNe9UHNKqky86djAcw4fBw7tZuzQanX1b95azYWhVz
xA6CUHDewQqsuIZC0iah603xPmIxIgcVwktPU2sWqgo09Qzz7xRw3DHaR2EyHlVv
9SW6lnFWuvBgGk8SPluQLyHZnC2nQLqXEZSgzf7nmyeFfEbZFykNhcOI1TSbab56
SMofQuvM0R0kyiu4AkUmwYwtheEMn7wsbTZiK6wglLUT3fAAuhhKdjkGCCyqSBMH
bb+VeWksTVJGMbGGmuomcQsxbXPAyfqHytmcTiFchKj5iOfdMiHA+be7WKkY3ohv
PsKScaRuLxqHdO9/QUyQnN0caq6+SmHMhOND9QWgcDJHD9P4jiIoLTndBczIBqmg
Izt92HaEhYUfQNsY7AX+eZZF7sWTgcP53WdrIQdMdclogPnafi0WxqXVOj/J89Jk
2hWAV0kw09MJ3TpOOZtFq8tsTuYDG0UQ+lUJ5ploIX1t3roHMh3cjAMwP3gOIC1G
RA==
-----END CERTIFICATE-----`;


// Cấu hình cho Pool kết nối
const dbConfig = {
  connectionString: databaseUrl, // Sử dụng chuỗi kết nối hardcoded
  // Cấu hình SSL
  ssl: {
    // Đặt rejectUnauthorized: false để bỏ qua lỗi xác thực chứng chỉ (KHÔNG AN TOÀN)
    // Chỉ sử dụng cho mục đích học tập/debug.
    rejectUnauthorized: false,
    // Cung cấp chứng chỉ CA hardcoded
    ca: hardcodedCaCert,
  },
};
// ---------------------------------------------------------------------------

// Sử dụng Pool bên ngoài handler để tái sử dụng kết nối
let pool: Pool | null = null;

function getDbPool(): Pool {
    if (pool === null) {
        // Kiểm tra xem chuỗi kết nối hardcoded có giá trị không
        if (!dbConfig.connectionString) {
            console.error("Database connection string is missing (hardcoded value is empty)!");
            throw new Error("Database connection string is missing.");
        }
        // Kiểm tra xem chứng chỉ CA hardcoded có giá trị không (nếu rejectUnauthorized không phải false)
        // Trong code này, rejectUnauthorized là false, nên kiểm tra này sẽ không gây lỗi kết nối.
        // Tuy nhiên, trong production, bạn sẽ muốn bật rejectUnauthorized và kiểm tra ca.
        // if (process.env.NODE_ENV === 'production' && dbConfig.ssl?.rejectUnauthorized && !dbConfig.ssl?.ca) {
        //      console.error("CA certificate is missing in production!");
        //      throw new Error("Database CA certificate is missing in production.");
        // }

        pool = new Pool(dbConfig);
        console.log("PostgreSQL connection pool created.");
    }
    return pool;
}


// =========================================================================
// API Đọc cài đặt (GET /api/settings)
// =========================================================================
export async function GET() {
  let client; // Sử dụng client khi lấy từ pool

  try {
    const dbPool = getDbPool(); // Lấy pool kết nối
    client = await dbPool.connect(); // Lấy một client từ pool

    // Thực thi câu lệnh SELECT để lấy dòng cài đặt duy nhất (WHERE id = 1)
    const result = await client.query('SELECT * FROM settings WHERE id = 1 LIMIT 1');

    if (result.rows.length === 0) {
      // Trường hợp bảng settings chưa có dòng id = 1 (chưa chạy INSERT ban đầu)
      console.warn("Settings row (id=1) not found in database. Returning default settings.");
      const defaultSettings = {
          intro: "Nội dung giới thiệu mặc định",
          name: "Tên SP mặc định",
          cost: "Giá mặc định",
          description: "Mô tả mặc định",
          conceptText1: "Concept 1 mặc định",
          conceptText2: "Concept 2 mặc định",
          conceptText3: "Concept 3 mặc định"
      };
      return NextResponse.json(defaultSettings);
    }

    // Lấy dòng đầu tiên (và duy nhất)
    const settings = result.rows[0]; // pg trả về rows là mảng object

    // Trả về object cài đặt
    return NextResponse.json(settings);

  } catch (error: any) {
    console.error('Failed to fetch settings from database:', error);
    // Log thêm chi tiết lỗi SSL nếu có
    if (error.code === 'SELF_SIGNED_CERT_IN_CHAIN' || error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
        console.error("SSL Certificate Error Details:", error.message);
        console.error("Consider using Environment Variables for connection string and CA certificate in production.");
    }
    return NextResponse.json({ message: 'Failed to load settings', error: error.message }, { status: 500 });
  } finally {
    // Rất quan trọng: Giải phóng client trở lại vào pool
    if (client) {
      client.release();
      console.log("PostgreSQL client released.");
    }
  }
}


// =========================================================================
// API Ghi/Cập nhật cài đặt (POST /api/settings)
// =========================================================================
export async function POST(request: NextRequest) {
  // !!! CẢNH BÁO BẢO MẬT: KHÔNG CÓ XÁC THỰC ADMIN !!!
  // Cần thêm logic xác thực admin ở đây!
  // ...

  let client;

  try {
    // 1. Đọc dữ liệu cài đặt MỚI từ body của request
    const newSettingsData = await request.json();

    if (typeof newSettingsData !== 'object' || newSettingsData === null) {
        return NextResponse.json({ message: 'Invalid data format. Expected a JSON object.' }, { status: 400 });
    }

    const dbPool = getDbPool();
    client = await dbPool.connect();

    // 2. Xây dựng câu lệnh UPDATE và giá trị
    const updatableColumns = ['intro', 'name', 'cost', 'description', 'conceptText1', 'conceptText2', 'conceptText3']; // Liệt kê TẤT CẢ các cột có thể sửa từ form Admin
    const columnsToSet: string[] = [];
    const values: any[] = [];
    let valueIndex = 1; // Index cho placeholder ($1, $2, ...)

    // Lọc chỉ các cột hợp lệ có trong dữ liệu nhận được
    for (const column of updatableColumns) {
        if (newSettingsData.hasOwnProperty(column)) {
            columnsToSet.push(`${column} = $${valueIndex}`);
            values.push(newSettingsData[column]);
            valueIndex++;
        }
    }

    // Nếu không có cột nào hợp lệ để cập nhật
    if (columnsToSet.length === 0) {
         return NextResponse.json({ message: 'No valid settings provided for update' }, { status: 400 });
    }

    // --- CÁCH DÙNG INSERT ... ON CONFLICT ... DO UPDATE cho PostgreSQL (Tốt hơn) ---
    // Xây dựng câu lệnh SQL INSERT ... ON CONFLICT ... DO UPDATE
    const insertColumns = ['id', ...updatableColumns];
    const insertPlaceholders = insertColumns.map((_, i) => `$${i + 1}`).join(', ');
    const updateClauses = updatableColumns.map(col => `${col} = EXCLUDED.${col}`).join(', '); // EXCLUDED.column_name lấy giá trị từ phần INSERT

    // Tạo mảng giá trị cho INSERT, bao gồm id=1 và giá trị cho các cột cập nhật
    // Đảm bảo thứ tự giá trị khớp với insertColumns
    const insertValues = [1, ...updatableColumns.map(col => newSettingsData.hasOwnProperty(col) ? newSettingsData[col] : null)]; // Điền giá trị hoặc null cho các cột được liệt kê

    const upsertSql = `
        INSERT INTO settings (${insertColumns.join(', ')})
        VALUES (${insertPlaceholders})
        ON CONFLICT (id) DO UPDATE
        SET ${updateClauses};
    `;

    // Thực thi câu lệnh SQL
    const result = await client.query(upsertSql, insertValues);

    // console.log("Upsert result:", result); // Log kết quả thực thi SQL


    // 3. Đọc lại cài đặt sau khi lưu để trả về (tùy chọn)
    const updatedResult = await client.query('SELECT * FROM settings WHERE id = 1 LIMIT 1');
    const updatedSettings: any = updatedResult.rows.length > 0 ? updatedResult.rows[0] : {};


    // 4. Trả về phản hồi thành công
    return NextResponse.json({ message: 'Settings updated successfully', settings: updatedSettings });

  } catch (error: any) {
    console.error('Failed to update settings in database:', error);
    // Log thêm chi tiết lỗi SSL nếu có
     if (error.code === 'SELF_SIGNED_CERT_IN_CHAIN' || error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT') {
        console.error("SSL Certificate Error Details:", error.message);
        console.error("Consider using Environment Variables for connection string and CA certificate in production.");
    }
    return NextResponse.json({ message: 'Failed to update settings', error: error.message }, { status: 500 });
  } finally {
    // Rất quan trọng: Giải phóng client trở lại vào pool
    if (client) {
      client.release();
      console.log("PostgreSQL client released.");
    }
  }
}

// Interface Settings (có thể để ở đây hoặc file riêng)
// Cần đảm bảo khớp với các cột trong bảng DB
// interface Settings {
//   id?: number;
//   intro?: string | null;
//   name?: string | null;
//   cost?: string | null;
//   description?: string | null;
//   conceptText1?: string | null;
//   conceptText2?: string | null;
//   conceptText3?: string | null;
//   created_at?: Date | string;
//   updated_at?: Date | string;
//   [key: string]: any;
// }

// Hàm placeholder checkUserIsAdmin - BẠN PHẢI TỰ TRIỂN KHAI
// function checkUserIsAdmin(request: NextRequest): boolean {
//   // Logic kiểm tra quyền admin ở đây
//   return false;
// }
