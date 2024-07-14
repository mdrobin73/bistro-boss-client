
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";

const PopularItems = () => {

    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === "popular");

    // const [menu, setMenu] = useState([]);
    // console.log(menu);

    // useEffect(() => {
    //     fetch("menu.json")
    //         .then(res => res.json())
    //         .then(data => {
    //             // const menuItems = data.filter(data => data.category === "popular")
    //             // setMenu(menuItems)
    //             setMenu(data)
    //         })
    // }, [])

    return (
        <section>
            <SectionTitle
                subheading={"Check it out"}
                heading={"FROM OUR MENU"}
            ></SectionTitle>

            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto my-20">
                {
                    popularItems.map((menuItem, index) => <MenuItem key={index} menuItem={menuItem}></MenuItem>)
                }
            </div>
            <div className="text-center mb-10">
                <Link><button className="btn btn-outline border-0 border-b-4 font-bold">VIEW FULL MENU</button></Link>
            </div>
        </section>
    );
};

export default PopularItems;