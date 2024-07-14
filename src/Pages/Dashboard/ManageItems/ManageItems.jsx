import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {

    const [menu, ,refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${item.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });
    };

    return (
        <div>
            <SectionTitle heading={"Manage all items"} subheading={"Hurry Up!"}></SectionTitle>

            <div>
                <div className=" p-10 bg-white w-3/4 my-5 mx-auto rounded shadow-xl border ">
                    <div className="md:flex md:justify-between items-center mb-10">
                        <h2 className="text-2xl font-semibold text-black bg-gradient-to-r from-slate-300 to-slate-100 p-5 rounded-lg shadow-md border">
                            Total Items: {menu.length}
                        </h2>
                    </div>

                    <div>
                        <div className="overflow-x-auto border">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-[#D1A054] border text-lg text-white rounded">
                                    <tr>
                                        <th>#</th>
                                        <th>Item Image</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th className="text-center">Update</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menu.map((item, index) => (
                                        <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="border rounded-lg shadow-md  h-20 w-20">
                                                            <img src={item.image} alt="food" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-lg italic">{item.name}</td>
                                            <td className="text-lg font-semibold">${item.price}</td>
                                            <td className="text-center">
                                                <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-md bg-[#D1A054] text-white hover:bg-[#d39231]"
                                                > <FaEdit></FaEdit> </button></Link>
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => handleDeleteItem(item)} className="btn btn-md bg-[#B91C1C] text-white hover:bg-[#c50909]"
                                                ><FaTrashAlt></FaTrashAlt></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;