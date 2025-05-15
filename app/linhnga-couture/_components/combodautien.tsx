import React from 'react';
import Image from 'next/image';
import styles from './MyComponent.module.css';

const LinNgaShowcase: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}


      {/* Top Section */}
      <div className={styles.section}>
        {/* Image 1 */}
        <div className={styles.imageContainer}>
          <Image 
            src="/uploads/linhnga1.jpg" 
            alt="Linh Nga Wedding Collection" 
            width={400}
            height={500}
            className={styles.image}
          />
        </div>

        {/* Content 1 */}
        <div className={styles.content}>
          <p>
            Linh Nga là một thương hiệu cao cấp chuyên về thiết kế váy cưới và váy dạ hội, phục vụ cho thị trường trong nước lẫn quốc tế, nằm trong top 3 thương hiệu hàng đầu tại Việt Nam, được thành lập bởi NTK Linh Nga vào cuối năm 2014. Linh Nga có 2 showroom tại Hà Nội, Thành phố Hồ Chí Minh, mở đại diện độc quyền đầu tiên tại Texas, Hoa Kỳ. Tính đến thời điểm hiện tại, Linh Nga đã có 21 văn phòng đại diện tại các tỉnh thành phố lớn của Trung Quốc.
          </p>
        </div>

        {/* Image 2 */}
        <div className={styles.imageContainer}>
          <Image 
            src="/uploads/linhnga2.jpg" 
            alt="Linh Nga Designer Collection" 
            width={400}
            height={500}
            className={styles.image}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.section}>
        {/* Content 2 */}
        <div className={styles.content}>
          <p>
            Năm 2023, LINH NGA COUTURE đã thành công vượt ngoài mong đợi khi giới thiệu các thiết kế độc quyền của mình tại TRUNK SHOW tổ chức tại Houston, Texas, đánh dấu bước đầu tiên trong hành trình chinh phục thị trường Mỹ và Anh. Chúng tôi cũng có cơ hội tham gia triển lãm thương mại tại Tuần lễ Thời trang Thượng Hải và vừa đi ra mắt cùng những bộ sưu tập Another Sunrise tại Tuần lễ Thời trang Sanya ở Trung Quốc.
          </p>
        </div>

        {/* Image 3 - Logo */}
        <div className={styles.centerLogoContainer}>
          <Image 
            src="/uploads/linhnga3.jpg" 
            alt="LINHNGA Logo" 
            width={350}
            height={500}
            className={styles.centerLogo}
            priority
          />
        </div>

        {/* Content 3 */}
        <div className={styles.content}>
          <p>
            Với phong cách đặc trưng là sự ngọt ngào nữ tính kết hợp với vẻ thanh lịch tinh tế, những thiết kế của Linh Nga được nổi tiếng tại công tí mị mang về đẹp vượt thời gian. Chính yếu tố đó, đã thu hút những gương mặt nổi tiếng đình đám tại Trung Quốc lựa chọn Linh Nga để đồng hành như người đẹp - diễn viên Cúc Tịnh Y, nữ diễn viên Chúc Tự Đan, ca sĩ Trương Lương Dĩnh, ca sĩ Chung Hân Đồng (TWINS), ca sĩ Trương Tử Ninh, KOL Lưu Giai Tỷ và KOL Lai Mỹ Vân.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinNgaShowcase;