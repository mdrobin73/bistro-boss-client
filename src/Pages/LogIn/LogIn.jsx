import "./LogIn.css"
import loginImg from "../../assets/others/authentication2.png"
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const LogIn = () => {

    const { logIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const captchaValue = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";
    console.log("State in the login page", location.state);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        // Login
        logIn(email, password)
            .then(userCredentials => {
                console.log(userCredentials.user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from, { replace: true })
            })
            .catch(error => console.log(error.message))
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaValue.current.value;
        console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div className="bg-img md:p-16 p-5 ">
                {/* <div className="text-center font-semibold text-3xl italic shadow-sm mb-2">
                <h2 className="text center">Login to your account...</h2>
            </div> */}
                <div className="md:flex items-center w-4/5 mx-auto bg-img shadow-2xl md:p-20 p-10 rounded-md border-4">
                    <div className="md:w-3/5 md:mr-10">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="md:w-2/5">
                        <div className="mb-4">
                            <h2 className="text-3xl font-semibold text-center text-slate-950">Login</h2>
                        </div>
                        <form onSubmit={handleLogin}>
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {/* CAPTCHA */}
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" name="captcha" ref={captchaValue} placeholder="type captcha" className="input input-bordered"  />

                                {/* Validate Captcha */}
                                {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate Captcha to enable login</button> */}
                            </div>

                            {/* Login Button */}
                            <div className="form-control mt-6">
                                {/* TODO: Apply disabled for re captcha */}
                                <input disabled={false} className="btn btn-primary" type="submit" value={"LOGIN"} />
                            </div>
                        </form>

                        <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2 w-full">Validate Captcha to enable login</button>

                        <div className="mt-2 text-center space-y-2">
                            <p>Do not have an account? <Link to={"/signUp"} className="underline font-bold">Register</Link></p>
                            <p className="font-semibold italic">Or log in with</p>
                            {/* <button className="btn btn-warning text-md shadow-lg"><Link className=""><FaGoogle className="text-lg "></FaGoogle></Link>Sign in with Google</button> */}
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;