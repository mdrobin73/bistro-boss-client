import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle heading={"Payment History"} subheading={"At a Glance!"}></SectionTitle>

            <div className=" p-10 bg-white w-3/4 my-5 mx-auto rounded shadow-xl border ">
                <div className="md:flex md:justify-between items-center mb-10">
                    <h2 className="text-2xl font-semibold text-black bg-gradient-to-r from-slate-300 to-slate-100 p-5 rounded-lg shadow-md border">
                        Total Payments: {payments.length}
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-lg text-white ">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction ID</th>
                                <th>Total Price</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td className="text-md italic">{index + 1}</td>
                                    <td className="text-md">{payment.email}</td>
                                    <td className="text-md">{payment.transactionId}</td>
                                    <td className="text-md text-right font-semibold">${payment.price}</td>
                                    <td className="text-md">{payment.date}</td>
                                    <td className="text-md font-semibold">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;