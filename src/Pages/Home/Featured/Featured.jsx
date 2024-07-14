import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-image my-20 bg-fixed">
            <div className="bg-black bg-opacity-35">
                <div className="md:max-w-7xl mx-auto py-28">
                    <section className="">
                        <SectionTitle
                            subheading={"Featured Item"}
                            heading={"FROM OUR MENU"}
                        ></SectionTitle>
                        <div className="md:flex items-center ">
                            <img src={featuredImg} className="w-[640px]  border shadow-2xl" alt="" />
                            <div className="ml-10 space-y-4 text-gray-100">
                                <p className="font-semibold">March 20, 2023</p>
                                <p className="font-semibold uppercase">Where can I get some?</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, beatae perspiciatis doloremque esse ratione doloribus a, labore inventore commodi eveniet nihil quod accusantium neque molestias dignissimos quia dolore nulla facere dolor recusandae nemo necessitatibus. Dolores harum numquam nisi nam. Ab obcaecati adipisci saepe officia nostrum voluptas quos quisquam placeat dolores?</p>
                                <Link><button className="btn btn-outline border-0 border-b-4 text-gray-100 mt-4">Read More</button></Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Featured;