import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";
// import { useEffect, useState } from "react";


const useMenu = () => {

    const axiosPublic = UseAxiosPublic();

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const res = await axiosPublic.get("/menu");
            return res.data;
        }
    })

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // console.log(menu);

    // useEffect(() => {
    //     fetch("https://bistro-boss-server-orcin-sigma.vercel.app/menu")
    //         .then(res => res.json())
    //         .then(data => {
    //             // const menuItems = data.filter(data => data.category === "popular")
    //             // setMenu(menuItems)
    //             setMenu(data)
    //             setLoading(false)
    //         })
    // }, [])
    return [menu, loading, refetch];
};

export default useMenu;