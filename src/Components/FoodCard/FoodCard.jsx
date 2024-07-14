import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {

    const { image, name, recipe, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        // console.log(food, user.email);
        if (user && user.email) {
            // Cart item would be added to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} has been added in cart`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        // refetch cart to update the cart item's count
                        refetch();
                    }
                })

        } else {
            Swal.fire({
                title: "You are not logged in!",
                text: "Please login to add to the cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div className="flex flex-col bg-slate-100 rounded relative border-2 shadow-lg">
            <img className="shadow-lg" src={image} alt="" />
            <div className="p-5 space-y-3 shadow-md rounded-md mb-2">
                <h2 className="font-bold text-xl ">{name}</h2>
                <p>{recipe}</p>
            </div>
            <p className="absolute right-5 top-5 bg-slate-900 px-6 py-1 text-white">${price}</p>
            <div className="my-5">
                <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 px-6 text-amber-500 border-amber-500 shadow-lg hover:text-amber-500">ADD TO CART</button>
            </div>
        </div>
    );
};

export default FoodCard;