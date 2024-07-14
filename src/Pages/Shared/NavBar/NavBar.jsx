import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaShoppingCart  } from 'react-icons/fa';
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const navOptions = <>
        <li className="mr-4"><Link to={"/"}>HOME</Link></li>
        <li className="mr-4"><Link to={"/contact"}>CONTACT US</Link></li>
        <li className="mr-4"><Link to={"/dashboard"}>DASHBOARD</Link></li>
        <li className="mr-4"><Link to={"/menu"}>OUR MENU</Link></li>
        <li className="mr-4"><Link to={"/order/salad"}>ORDER FOOD</Link></li>
        {
            user && isAdmin && <li className="mr-4 bg-slate-900 rounded-xl text-white border"><Link className="hover:underline text-lg" to={"/dashboard/adminHome"}>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li className="mr-4 bg-slate-900 rounded-xl text-white border"><Link className="hover:underline text-lg" to={"/dashboard/userHome"}>Dashboard</Link></li>
        }
        <li className="mr-4 bg-slate-900 rounded-xl text-white border"><Link to={"/dashboard/cart"}><FaShoppingCart className="text-amber-500 text-xl"/> <span className="text-white text-lg border bg-slate-950 px-3 py-1 rounded-xl">+{cart.length}</span></Link></li>
    </>

    const handleLogOut = () => {
        logOut()
        .then(() => {})
        .catch(error => console.log(error))
    }

    return (
        <>
            <div className="navbar p-6 bg-black fixed z-10 bg-opacity-50 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black bg-opacity-50 text-white rounded-box w-52 font-bold">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'} className="text-2xl font-semibold leading-6">BISTRO BOSS <br /> <span className="tracking-[5px] font-light text-lg">RESTAURANT</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold">
                        {navOptions}
                    </ul>
                </div>
                {
                    user ?
                        <div className="navbar-end">
                            <p className="text-md font-semibold mr-3 underline italic bg-slate-900 text-amber-500 p-3 rounded-xl border">{user?.displayName}</p>
                            <button onClick={handleLogOut} className="btn btn-primary font-semibold">LOG OUT</button>
                        </div> :
                        <div className="navbar-end">
                            <Link to={'/login'} className="btn btn-secondary font-semibold">SIGN IN</Link>
                        </div>
                }
            </div>
        </>
    );
};

export default NavBar;