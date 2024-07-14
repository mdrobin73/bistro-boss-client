import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";
// import useAuth from "../../../Hooks/useAuth";

const MenuCategory = ({ items, title, subTitle, img }) => {
    // const {loading} = useAuth();
    // if (loading) {
    //     return <div className="text-center"><progress className="progress w-56"></progress></div>
    // }
    return (
        <div className="my-20">
            
            {title && <Cover img={img} title={title} subTitle={subTitle}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto mt-10">
                {
                    items.map((item) => <MenuItem key={item._id} menuItem={item}></MenuItem>)
                }
            </div>
            <div className="text-center mt-10">
                <Link to={`/order/${title}`}><button className="uppercase btn btn-outline border-0 border-b-4 border-slate-900 font-semibold">order your favorite food</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;