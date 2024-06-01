import { useEffect, useState } from "react";
import SectionTitle from "./../Components/SectionTitle";
import MenuItemCard from "../Components/MenuItemCard";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);
  const menuFilter = menu.filter(item => item.category === 'popular')
  return (
    <section>
      <SectionTitle heading="FROM OUR MENU" subHeading="---Check it out---" />

      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-5">
        {menuFilter.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
