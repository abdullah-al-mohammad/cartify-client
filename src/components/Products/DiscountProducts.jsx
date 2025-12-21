import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import getAllProducts from '../../api/productApi';

const DiscountProducts = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const discountProducts = products.filter(p => p.discount);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Pagination, Autoplay]}
      className="mySwiper"
    >
      <div className="px-6 py-40 container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Discount Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {discountProducts.map(product => (
            <SwiperSlide key={product._id}>
              <div className="border rounded-lg shadow">
                <div className="h-48 bg-slate-400">
                  <img
                    src={product.photos}
                    loading="lazy"
                    alt=""
                    className="object-contain w-full h-full rounded"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mt-4 truncate">{product.name}</h3>
                  <p className="mt-2 text-red-600 font-bold">Discount: {product.discount}%</p>
                  <Link
                    to={`/products/${product._id}`}
                    className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </div>
    </Swiper>
  );
};

export default DiscountProducts;
