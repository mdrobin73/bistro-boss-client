import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import drinkImg from "../../../assets/menu/drink-bg.jpg"
// import useMenu from "../../../Hooks/useMenu"
import MenuCategory from '../MenuCategory/MenuCategory';
import useMenuCategory from '../../../Hooks/useMenuCategory';

const Menu = () => {


    const [offered, pizza, salad, desserts, soup, drinks] = useMenuCategory();
    // const [menu] = useMenu();
    // const offered = menu.filter(item => item.category === "offered")
    // const pizza = menu.filter(item => item.category === "pizza")
    // const salad = menu.filter(item => item.category === "salad")
    // // const drinks = menu.filter(item => item.category === "drinks")
    // const desserts = menu.filter(item => item.category === "dessert")
    // const soup = menu.filter(item => item.category === "soup")


    return (
        <div className="">
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover img={menuImg} title={"Our Menu"} subTitle={"Would you like to try a dish?"}></Cover>

            <SectionTitle heading={"Today's offer"} subheading={"Don't Miss"}></SectionTitle>

            <MenuCategory items={offered}></MenuCategory>

            <MenuCategory items={desserts} img={dessertImg} title={"desserts"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            <MenuCategory items={pizza} img={pizzaImg} title={"pizza"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            <MenuCategory items={salad} img={saladImg} title={"salads"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            <MenuCategory items={soup} img={soupImg} title={"soups"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            <MenuCategory items={drinks} img={drinkImg} title={"Drinks"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

        </div>
    );
};

export default Menu;