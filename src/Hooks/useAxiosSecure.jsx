import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://bistro-boss-server-orcin-sigma.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  //request interceptor-----
  axiosSecure.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
        console.log("request stopped by interceptors before adding token!", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  //response interceptor-----
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      console.log("status error in the interceptor", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
