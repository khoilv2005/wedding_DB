"use client";
import Image from 'next/image';
import Link from 'next/link';

const Luxury = () => {
    return (
        <div className="flex flex-wrap items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="flex flex-row gap-12 flex-wrap justify-center">
                <div className="w-[400px] flex flex-col items-center mb-8">
                    {/* Container ảnh đầu tiên với chiều cao cố định */}
                    <div className="h-[600px] w-full">
                        <Link href="/thuevaycuoi/luxury/linh-nga" className="h-full w-full block">
                            <Image
                                src="/uploads/thue-vay-cuoi-luxury-anh1.jpg"
                                alt="Váy cưới luxury 1"
                                width={400}
                                height={600}
                                className="rounded-lg shadow-lg object-cover h-full w-full"
                            />
                        </Link>
                    </div>
                    <p className='text-2xl mt-2'>Váy lễ dòng premium</p>
                    <p className='text-2xl'>luxury-LT525</p>
                    <p className='text-2xl'>LINH NGA BRIDAL</p>
                </div>
                
                <div className="w-[400px] flex flex-col items-center mb-8">
                    {/* Container ảnh thứ hai với chiều cao cố định */}
                    <div className="h-[600px] w-full">
                        <Image
                            src="/uploads/thue-vay-cuoi-luxury-anh2.jpg"
                            alt="Váy cưới luxury 2"
                            width={400}
                            height={600}
                            className="rounded-lg shadow-lg object-cover h-full w-full"
                        />
                    </div>
                    <p className='text-2xl mt-2'>ANDREA - 24LP403</p>
                    <p className='text-2xl'>NILOE BRIDAL</p>
                </div>
                
                <div className="w-[400px] flex flex-col items-center mb-8">
                    {/* Container ảnh thứ ba với chiều cao cố định */}
                    <div className="h-[600px] w-full">
                        <Image
                            src="/uploads/thue-vay-cuoi-luxury-anh2.jpg"
                            alt="Váy cưới luxury 3"
                            width={400}
                            height={600}
                            className="rounded-lg shadow-lg object-cover h-full w-full"
                        />
                    </div>
                    <p className='text-2xl mt-2'>VÁY CƯỚI THẾ KẾ</p>
                    <p className='text-2xl'>LUXURY 07</p>
                    <p className='text-2xl'>LAT BRIDAL</p>
                </div>
            </div>
        </div>
    );
}

export default Luxury;