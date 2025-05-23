// components/FeedbackSection.js
import Link from 'next/link';
import styles from './FeedbackSection.module.css';

const FeedbackSection = () => {
  // You might want to pass feedback data as props later
  const feedbackItems = [
    "FB từ khách hàng cho đối tác",
    "FB từ khách hàng cho đối tác",
    "FB từ khách hàng cho đối tác",
  ];

  return (
    <section className={styles.container}>
      <h2 className="visually-hidden">Phản hồi từ khách hàng</h2> {/* Added for accessibility */}
      <div className={styles.feedbackList}>
        {feedbackItems.map((feedback, index) => (
          <div key={index} className={styles.feedbackItem}>
            <p>{feedback}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <Link href="/#news-section" className={styles.ctaButton}>
      {/* Nội dung bên trong thẻ a ban đầu, ví dụ: */}
      Liên hệ đặt lịch tư vấn
    </Link>
        {/* Optional: Add the smaller note text if needed, though it seems like a design note */}
        {/* <p className={styles.note}>Mấy cái thông tin này e tự điền</p> */}
      </div>
    </section>
  );
};

export default FeedbackSection;