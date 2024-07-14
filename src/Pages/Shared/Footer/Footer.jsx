
const Footer = () => {
    return (
        <div className="">
            <div className="lg:flex">
                <div className="bg-[#1F2937] text-white w-full text-center lg:pl-28 py-16">
                    <h2>CONTACT US</h2>
                    <h4>123 ABS Street, Uni 21, Bangladesh</h4>
                    <h4>+88 123456789</h4>
                    <h4>Mon - Fri: 08:00 - 22:00</h4>
                    <h4>Sat - Sun: 10:00 - 23:00</h4>
                </div>
                <div className="bg-[#111827] text-white w-full text-center lg:pr-28 py-16">
                    <h2>Follow US</h2>
                    <h4>Join us on social media</h4>
                </div>
            </div>
            <div className="bg-gray-950 text-white text-center py-2">
                <h4>Copyright © CulinaryCloud. All rights reserved.</h4>
            </div>
        </div>
    );
};

export default Footer;