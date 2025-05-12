import Link from 'next/link';

export function IntroSection() {
  return (
    <section className="bg-[#fefdf7] py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="bg-white shadow-xl p-8 sm:p-12 md:p-16 lg:flex lg:items-center lg:gap-x-12">
          {/* Cột Trái: Tiêu đề cách điệu */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl font-light text-gray-700 leading-tight">
              Tasteful,
              <br />
              <span className="font-serif italic text-5xl sm:text-6xl text-[#333333] relative inline-block">
                distinctive
                <span className="absolute left-0 right-0 bottom-1.5 h-0.5 bg-gray-300 transform scale-x-100"></span> {/* Đường gạch chân cách điệu */}
              </span>
              {' '}and
              <br />
              unforgettable wedding
              <br />
              and events
            </h2>
          </div>

          {/* Cột Phải: Mô tả và Nút */}
          <div className="lg:w-1/2">
            <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
              As one of the first premium and professional wedding planners in
              Vietnam, The Planners specializes in full wedding planning, design and
              execution. We offer professional service to all Vietnamese and
              international couples in holding weddings and events throughout
              Vietnam and beyond. Our hands-on approach makes our weddings
              and events tasteful, distinctive, and memorable for not only our couples
              but also their guests.
            </p>
            <div className="text-center lg:text-left">
              <Link
                href="/contact" // Thay đổi đường dẫn nếu cần
                className="inline-block bg-[#5a2a27] text-white uppercase text-xs font-semibold tracking-wider py-3.5 px-8 hover:bg-[#4a201d] transition-colors duration-300 shadow-md"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}