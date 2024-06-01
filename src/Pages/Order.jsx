import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img from "../assets/shop/banner2.jpg";
import useMenu from "../Hooks/useMenu";
import FoodCard from "../Components/FoodCard";
const Order = () => {
  const [tabsIndex, setTabsIndex] = useState(0);
  const [menu] = useMenu();
  const salads = menu?.filter((items) => items.category === "salad");
  const pizzas = menu?.filter((items) => items.category === "pizza");
  const soups = menu?.filter((items) => items.category === "soup");
  const desserts = menu?.filter((items) => items.category === "dessert");
  const drinkss = menu?.filter((items) => items.category === "drinks");
  const offereds = menu?.filter((items) => items.category === "offered");

  return (
    <div>
      <img src={img} alt="" />
      <Tabs defaultIndex={tabsIndex} onSelect={(index) => setTabsIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {salads.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {pizzas.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {soups.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {desserts.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {drinkss.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-06">
            {offereds.map((item) => (
              <FoodCard key={item._id} item={item}></FoodCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
