// app/api/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg'; // Sử dụng Pool từ thư viện pg

// --- CẤU HÌNH KẾT NỐI DATABASE (HARDCODED - KHÔNG AN TOÀN CHO PRODUCTION) ---
// Chuỗi kết nối database PostgreSQL của bạn được đặt trực tiếp ở đây.
// Vui lòng THAY THẾ CHUỖI NÀY bằng chuỗi kết nối THỰC TẾ của bạn.
// Ví dụ: postgres://user:password@host:port/database?sslmode=require
const databaseUrl = "postgres://avnadmin:AVNS_NndJQN9mImhY7RcStmG@pg-15cf1a87-khoakim09-f275.l.aivencloud.com:11586/defaultdb?sslmode=require";

// Biến môi trường chứa nội dung chứng chỉ CA (vẫn giữ để code có thể dùng nếu biến này được thiết lập)
// Tuy nhiên, với rejectUnauthorized: false, chứng chỉ này không bắt buộc để kết nối thành công.
const caCert = process.env.DB_CERT; // Chứng chỉ CA (nếu có) từ biến môi trường

// Cấu hình cho Pool kết nối
const dbConfig = {
  connectionString: databaseUrl, // Sử dụng chuỗi kết nối hardcoded
  // Cấu hình SSL
  ssl: {
    // Đặt rejectUnauthorized: false để bỏ qua lỗi xác thực chứng chỉ (KHÔNG AN TOÀN)
    // Chỉ sử dụng cho mục đích học tập/debug.
    rejectUnauthorized: false,
    // Cung cấp chứng chỉ CA nếu có (từ biến môi trường DB_CERT)
    // Mặc dù rejectUnauthorized là false, cung cấp CA vẫn là tốt hơn nếu có thể.
    ca: caCert,
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
        // Lưu ý: Kiểm tra chứng chỉ CA trong production nếu rejectUnauthorized được bật
        // Trong code này, rejectUnauthorized là false, nên kiểm tra này sẽ không gây lỗi.
        // if (process.env.NODE_ENV === 'production' && dbConfig.ssl?.rejectUnauthorized && !dbConfig.ssl?.ca) {
        //      console.error("DB_CERT environment variable is not set in production!");
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
