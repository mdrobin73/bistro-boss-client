import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {

  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
      });
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this user?",
        //   icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`)
          .then((res) => {
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
  }

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an admin?",
      //   icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })
    .then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an admin now`,
              showConfirmButton: false,
              timer: 1500
            });
            // Swal.fire({
            //   title: "Done",
            //   // text: "Food item has been deleted.",
            //   icon: "success",
            // });
          }
        });
      }
    });
  }

  return (
    <div>
      <div>
        <SectionTitle
          heading={"Manage All Users"}
          subheading={"How Many?"}
        ></SectionTitle>
      </div>
      <div className=" p-10 bg-white w-3/4 mx-auto rounded my-5 shadow-xl border">
        <h2 className="text-2xl font-semibold text-black bg-gradient-to-r from-slate-300 to-yellow-100 p-5 rounded-lg shadow-md border md:w-1/4">
          Total Users: {users.length}
        </h2>
        <div className="overflow-x-auto mt-5 border">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] border text-lg text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td> {user.name} </td>
                  <td className="text-lg italic">{user?.email}</td>
                  <td className="text-lg font-semibold">
                    {
                      user.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-md text-2xl bg-[#D1A054] text-white hover:bg-[#ca8722]">
                      <FaUsers></FaUsers>
                    </button>
                    }
                  </td>
                  <th className="text-center">
                    <button onClick={() => handleDeleteUser(user)} className="btn btn-md bg-[#B91C1C] text-white hover:bg-[#c50909]">
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
  );
};

export default AllUsers;
