import Banner from "../Banner/Banner";
import CategorySlider from "../CategorySlider/CategorySlider";
import Featured from "../Featured/Featured";
import HomeCover from "../HomeCover/HomeCover";
import PopularItems from "../PopularItems/PopularItems";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>

            <Banner></Banner>
            <CategorySlider></CategorySlider>
            <HomeCover></HomeCover>
            <PopularItems></PopularItems>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;