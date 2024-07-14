import { Link } from "react-router-dom";

const MenuItem = ({ menuItem }) => {
    const { image, name, recipe, price } = menuItem;
    return (
        <Link to={""}>
            <div className="flex space-x-4 border px-6 py-10 bg-slate-50 rounded-md shadow-lg items-center border-amber-500">
                <img style={{ borderRadius: "0px 200px 200px 200px" }} className="w-[104px] border-2 border-amber-500" src={image} alt="" />
                <div>
                    <h2 className="uppercase font-semibold text-xl">{name}</h2>
                    <p className="italic">{recipe.slice(0, 100)}</p>
                </div>
                <p className="text-amber-500 text-xl bg-slate-100 p-2 rounded-lg shadow-lg font-semibold border-2 border-amber-500">${price}</p>
            </div>
            
        </Link>
    );
};

export default MenuItem;