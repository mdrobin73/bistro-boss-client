import {
  FaAd,
  FaBook,
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaList,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { FaBagShopping, FaBookAtlas, FaCartShopping } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  //TODO: get isAdmin value from Database
  const [isAdmin] = useAdmin();

  return (
    <div className="md:flex md:p-0 p-2">
      {/* Dashboard sidebar */}
      <div className="md:w-64 bg-[#D1A054] md:min-h-screen shadow-2xl">
        <ul className="menu p-4 text-lg">
          {/* Admin nav links */}
          {isAdmin ? (
            <>
              <div className="mb-10 pt-7">
                <Link to={'/'} className="text-3xl font-semibold leading-6">BISTRO BOSS <br /> <span className="tracking-[8px] font-semibold text-lg">RESTAURANT</span></Link>
              </div>

              <li className="mb-2">
                <NavLink to={"/dashboard/adminHome"}>
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/addItems"}>
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/manageItems"}>
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/manageBookings"}>
                  <FaBook></FaBook> Manage Bookings
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/allUsers"}>
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) : (
            // User nav links
            <>
              <div className="mb-10 pt-7">
                <Link to={'/'} className="text-3xl font-semibold leading-6">BISTRO BOSS <br /> <span className="tracking-[8px] font-semibold text-lg">RESTAURANT</span></Link>
              </div>

              <li className="mb-2">
                <NavLink to={"/dashboard/userHome"}>
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/reservation"}>
                  <FaCalendarAlt></FaCalendarAlt> Reservation
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/paymentHistory"}>
                  <FaWallet></FaWallet> Payment History
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/cart"}>
                  <FaCartShopping></FaCartShopping> My Cart ( {cart.length} )
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/review"}>
                  <FaAd></FaAd> Add Review
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink to={"/dashboard/booking"}>
                  <FaBookAtlas></FaBookAtlas> My Booking
                </NavLink>
              </li>
            </>
          )}

          {/* Shared/Common nav links */}
          <div className="py-5 shadow-sm">
            <hr />
          </div>

          <li className="mb-2">
            <NavLink to={"/"}>
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to={"/menu"}>
              <FaList></FaList> Menu
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to={"/order/salad"}>
              <FaBagShopping></FaBagShopping> Shop
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to={"/contact"}>
              <FaEnvelope></FaEnvelope> Contact
            </NavLink>
          </li>
          {/* <div className="py-5 shadow-sm">
            <hr />
          </div>
          <li className="mb-2">
            <NavLink to={"/"}>
              <FaPersonRifle></FaPersonRifle> Profile
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink to={"/"}>
              <FaToolbox></FaToolbox> Settings
            </NavLink>
          </li> */}
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="md:flex-1 bg-slate-100">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
