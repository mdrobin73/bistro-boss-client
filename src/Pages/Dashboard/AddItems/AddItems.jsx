import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = UseAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset } = useForm();

    const handleAddItems = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            const menuRes = await axiosSecure.post("/menu", menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been saved`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log(res.data);
    };

    return (
        <div>
            <div>
                <SectionTitle heading={"Add An Item"} subheading={"What's New?"}></SectionTitle>
            </div>
            <div className="p-10 bg-[#F3F3F3] w-3/4 my-5 mx-auto rounded shadow-xl border">

                <form onSubmit={handleSubmit(handleAddItems)} className="space-y-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Recipe name <span className="text-red-600">*</span></span>
                        </label>
                        <input type="text" placeholder="Recipe name" className="input input-bordered" {...register("name", { required: true })} />
                    </div>

                    <div className="md:flex gap-x-6">
                        {/* Category */}
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Category <span className="text-red-600">*</span></span>
                            </label>
                            <select defaultValue="default" className="select select-bordered w-full" {...register("category", { required: true })}>
                                <option disabled value={"default"}>Select category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>

                        {/* Price */}
                        {/* <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Price <span className="text-red-600">*</span></span>
                            </label>
                            <input type="number" placeholder="Price" className="input input-bordered" {...register("price", { required: true })} />
                        </div> */}
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text font-semibold">Price <span className="text-red-600">*</span></span>
                            </div>
                            <input type="" placeholder="Price" className="input input-bordered" {...register("price", { required: true })} />
                        </label>
                    </div>

                    {/* Recipe Details */}
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text font-semibold">Recipe Details <span className="text-red-600">*</span></span>
                            </div>
                            <textarea className="textarea textarea-bordered h-32" placeholder="Recipe Details" {...register("recipe", { required: true })}></textarea>
                        </label>
                    </div>

                    {/* Choose image */}
                    <div>
                        <input type="file" className="file-input w-full max-w-xs" {...register("image", { required: true })} />
                    </div>

                    {/* Submit button */}
                    <button className="flex items-center px-7 py-3 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-semibold">Add Item <FaUtensils className="ml-2"></FaUtensils></button>

                </form>
            </div>
        </div>
    );
};

export default AddItems;