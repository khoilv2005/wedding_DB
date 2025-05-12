import Link from 'next/link'; // Thêm import Link

export const OurService = () => {
    return (
      <section className="bg-[#fefdf7] py-16 sm:py-24"> {/* Thêm thẻ section bao ngoài */}
        <div className="container mx-auto px-6 lg:px-8 text-center">
          {/* Tiêu đề nhỏ */}
          <div className="mb-6">
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              | OUR SERVICES |
            </span>
          </div>

          {/* Đoạn mô tả */}
          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-12 sm:mb-16 text-sm sm:text-base">
            The prominent aspect of our company is our tailoring, premium wedding planning, design, and management service. We have
            designed our services to closely meet your requirement since we know you are looking for a detailed, well-planned and personalized
            assistance for your once in a lifetime event.
          </p>

          {/* Các mục dịch vụ */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0">
            {/* Wedding Planning */}
            <div className="text-center group">
              <Link href="/services/wedding-planning" className="text-gray-700 hover:text-[#9a1b1b] transition-colors duration-300">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wider font-serif">
                  Wedding
                  <br />
                  Planning
                </h3>
              </Link>
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center mx-4">
              <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-[#9a1b1b] transition-colors duration-300"></div>
            </div>

            {/* Destination Wedding */}
            <div className="text-center group">
              <Link href="/services/destination-wedding" className="text-gray-700 hover:text-[#9a1b1b] transition-colors duration-300">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wider font-serif">
                  Destination
                  <br />
                  Wedding
                </h3>
              </Link>
            </div>

            {/* Separator */}
            <div className="flex items-center justify-center mx-4">
              <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:bg-[#9a1b1b] transition-colors duration-300"></div>
            </div>

            {/* Styling & Decoration */}
            <div className="text-center group">
              <Link href="/services/styling-decoration" className="text-gray-700 hover:text-[#9a1b1b] transition-colors duration-300">
                <h3 className="text-2xl sm:text-3xl font-light tracking-wider font-serif">
                  Styling &
                  <br />
                  Decoration
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
}

// Hoặc bạn có thể export default nếu đây là export duy nhất từ file này
// export default OurService;