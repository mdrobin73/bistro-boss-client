import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://bistro-boss-server-orcin-sigma.vercel.app/review")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className="md:max-w-7xl mx-auto mb-20">
            <section>
                <SectionTitle
                    subheading={"What Our Clients Say"}
                    heading={"TESTIMONIALS"}
                ></SectionTitle>

                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="mx-20 flex flex-col items-center gap-6">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="text-black">{review.details}</p>
                                <h2 className="text-amber-500 text-3xl uppercase">{review.name}</h2>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </div>
    );
};

export default Testimonials;