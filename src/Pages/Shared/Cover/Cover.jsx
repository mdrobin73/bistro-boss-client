// import menuBgImg from "../../../assets/menu/banner3.jpg"
import { Parallax } from 'react-parallax';

const Cover = ({ img, title, subTitle }) => {

    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="md:p-40 p-20 text-center bg-center bg-no-repeat bg-cover	">
                <div className="bg-black bg-opacity-50 text-white text-center md:p-28 p-16 space-y-4 rounded">
                    <h2 className="uppercase md:text-7xl text-3xl">{title}</h2>
                    <p className="uppercase">{subTitle}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;