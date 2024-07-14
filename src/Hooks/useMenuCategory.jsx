import useMenu from "./useMenu";

const useMenuCategory = () => {
    const [menu, loading] = useMenu();
    // const offered = menu.filter(item => item.category === "offered");
    const pizza = menu.filter(item => item.category === "pizza");
    const salad = menu.filter(item => item.category === "salad");
    const desserts = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const drinks = menu.filter(item => item.category === "drinks");
    // console.log(salad);

    return [ salad, pizza, soup, desserts, drinks, loading];
};

export default useMenuCategory;