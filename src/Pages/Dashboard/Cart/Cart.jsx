import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this?",
      //   icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              // text: "Food item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="mb-12">
        <SectionTitle
          subheading={"My Cart"}
          heading={"Wanna add more?"}
        ></SectionTitle>
      </div>

      <div className=" p-10 bg-white w-3/4 my-5 mx-auto rounded shadow-xl border ">
        <div className="md:flex md:justify-between items-center mb-10">
          <h2 className="text-2xl font-semibold text-black bg-gradient-to-r from-slate-300 to-slate-100 p-5 rounded-lg shadow-md border">
            Total Orders: {cart.length}
          </h2>
          <h2 className="text-2xl font-semibold text-black bg-gradient-to-r from-slate-300 to-slate-100 p-5 rounded-lg shadow-md border">
            Total Price: ${totalPrice}
          </h2>

          {/* <Link to={"/dashboard/payment"}><button disabled={!cart.length} className="font-semibold text-xl bg-[#D1A054] text-white py-3 px-4 rounded-lg hover:shadow-lg border">Pay</button></Link> */}

          {cart.length ? <Link to={"/dashboard/payment"}><button className="font-semibold text-xl bg-[#D1A054] text-white py-3 px-4 rounded-lg hover:shadow-lg border">Pay</button></Link>
            : <button disabled className="font-semibold text-xl bg-[#b4b4b3] text-white py-3 px-4 rounded-lg hover:shadow-lg border">Pay</button>}
        </div>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-[#D1A054] text-lg text-white">
                <tr>
                  <th>#</th>
                  <th>Item Image</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img src={item.image} alt="food" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-lg italic">{item.name}</td>
                    <td className="text-lg font-semibold">${item.price}</td>
                    <th className="text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-md bg-[#B91C1C] text-white hover:bg-[#c50909]"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
