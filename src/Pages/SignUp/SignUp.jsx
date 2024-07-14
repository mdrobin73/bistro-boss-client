import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/others/authentication2.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data)
    createUser(data.email, data.password)
    .then(() => {
      // console.log(res.user);
      updateUserProfile(data.name, data.photoUrl)
        .then(() => {
          // console.log("User profile info updated");
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>

      <div className="bg-img md:p-16 p-5 ">
        <div className="md:flex md:flex-row-reverse items-center w-4/5 mx-auto bg-img shadow-2xl md:p-20 p-10 rounded-md border-4">
          <div className="md:w-3/5 md:mr-10">
            <img src={loginImg} alt="" />
          </div>
          <div className="md:w-2/5">
            <div className="mb-4">
              <h2 className="text-3xl font-semibold text-center text-slate-950">
                Sign up
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Name */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoUrl", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoUrl && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}

                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be 6 characters long
                  </span>
                )}

                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must be less than or equal to 20 characters
                  </span>
                )}

                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must have one uppercase letter, one lowercase
                    letter, one number, one special character (!@#$&*){" "}
                  </span>
                )}
              </div>

              {/* SignUp Button */}
              <div className="form-control">
                <input
                  className="btn btn-primary mt-5"
                  type="submit"
                  value={"Sign Up"}
                />
              </div>
            </form>
            <div className="mt-2 text-center space-y-2">
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="underline font-bold">
                  Login
                </Link>
              </p>
              <p className="font-semibold italic">Or log in with</p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
