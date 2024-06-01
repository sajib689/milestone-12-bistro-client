
import { Link } from 'react-router-dom';
import MenuItemCard from '../Components/MenuItemCard';
import useMenu from '../Hooks/useMenu';
import img from '../assets/shop/banner2.jpg'

const Menu = () => {
    const [menu] = useMenu()
    const salads = menu?.filter((items) => items.category === "salad");
    const pizzas = menu?.filter((items) => items.category === "pizza");
    const soups = menu?.filter((items) => items.category === "soup");
    const desserts = menu?.filter((items) => items.category === "dessert");
    const drinkss = menu?.filter((items) => items.category === "drinks");
    const offereds = menu?.filter((items) => items.category === "offered");
    const category = menu.map(item => item.category)
    return (
        <div>
            <img src={img} alt="" />

           <>
           <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-06">
            {salads.map((item) => (
              <MenuItemCard key={item._id} item={item}></MenuItemCard>
            ))}
          </div>
          <Link className='btn bg-orange-500 text-white ' to={`/order/${category}`}>View More</Link>
           </>
        </div>
    );
};

export default Menu;