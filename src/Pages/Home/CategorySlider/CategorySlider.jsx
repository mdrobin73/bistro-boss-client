import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const CategorySlider = () => {
    return (
        <div className='max-w-7xl mx-auto my-32'>
            <SectionTitle
                subheading={"From 11:00am to 10:00pm"}
                heading={"Order Online"}
            ></SectionTitle>
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                centeredSlides={true}
                // pagination={{
                //     clickable: true,
                // }}
                // modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <h2 className='text-center text-2xl italic font-semibold uppercase'>-Salads-</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <h2 className='text-center text-2xl italic font-semibold uppercase'>-Pizzas-</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <h2 className='text-center text-2xl italic font-semibold uppercase'>-Soups-</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <h2 className='text-center text-2xl italic font-semibold uppercase'>-Desserts-</h2>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <h2 className='text-center text-2xl italic font-semibold uppercase'>-Salads-</h2>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CategorySlider;