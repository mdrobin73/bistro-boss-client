// import React from "react";
import Cover from "../../Shared/Cover/Cover";
import orderCoverImg from "../../../assets/order/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenuCategory from "../../../Hooks/useMenuCategory";
// import FoodCard from "../../../Components/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {

    const categories = ["salad", "pizza", "soup", "desserts", "drinks"];
    const { category } = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    // console.log(initialIndex);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    // console.log(tabIndex);
    const [ salad, pizza, soup, desserts, drinks ] = useMenuCategory();
    // console.log(drinks);

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order Food</title>
            </Helmet>

            <div className="mb-20">
                <Cover img={orderCoverImg} title={"order food"} subTitle={"would you like to try a dish?"}></Cover>

                <div className="md:max-w-7xl mx-auto mt-20 text-center">
                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                        <TabList>
                            <Tab>SALAD</Tab>
                            <Tab>PIZZA</Tab>
                            <Tab>SOUPS</Tab>
                            <Tab>DESSERTS</Tab>
                            <Tab>DRINKS</Tab>
                        </TabList>

                        <TabPanel>
                            <OrderTab items={salad}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={pizza}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={soup}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={desserts}></OrderTab>
                        </TabPanel>
                        <TabPanel>
                            <OrderTab items={drinks}></OrderTab>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Order;