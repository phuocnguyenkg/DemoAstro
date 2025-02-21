import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners = [
  {
    id: 1,
    image: 'https://img-zlr1.tv360.vn/image1/2025/02/05/14/1738740692247/c66855ae5acd.jpg',
    title: 'Tình Ái ChunHwa',
    description: 'PHÁT SÓNG SONG THỨ 5 HÀNG TUẦN'
  },
  {
    id: 2,
    image: 'https://img-zlr1.tv360.vn/image1/2025/02/05/14/1738740692247/c66855ae5acd.jpg',
    title: 'Phim Hàn Quốc Hot',
    description: 'Cập nhật những bộ phim mới nhất'
  }
];

const Banner: React.FC = () => {
  return (
    <div className='relative w-full h-[500px]'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className='w-full h-full'
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className='relative w-full h-full'>
              <img src={banner.image} alt={banner.title} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6'>
                <h2 className='text-4xl font-bold'>{banner.title}</h2>
                <p className='text-lg mt-2'>{banner.description}</p>
                <button className='mt-4 px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition'>
                  Xem ngay
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Nút điều hướng */}
      <div className='swiper-button-next !text-white'></div>
      <div className='swiper-button-prev !text-white'></div>
    </div>
  );
};

export default Banner;
