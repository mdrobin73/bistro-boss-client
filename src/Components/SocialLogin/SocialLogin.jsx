import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const SocialLogin = () => {

  const { googleSignIn } = useAuth();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then (res => {
      console.log(res.user);
      axiosPublic.post('/users', {name: res.user?.displayName, email: res.user?.email})
      .then( res => {
        console.log(res.data);
        navigate("/");
      })
    })
  }

  return (
    <div>
      <div className="text-center  space-y-2">
        <button onClick={handleGoogleSignIn} className="btn btn-warning text-md shadow-lg w-full">
          <Link className="">
            <FaGoogle className="text-lg "></FaGoogle>
          </Link>
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
