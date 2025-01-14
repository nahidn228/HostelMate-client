/* eslint-disable react/prop-types */
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMeals from "./../hooks/useMeals";
import MealsCard from "./MealsCard";

const TabCategories = () => {
  const [meals] = useMeals();
  const breakfast = meals.filter((item) => item.category === "breakfast");
  const lunch = meals.filter((item) => item.category === "lunch");
  const dinner = meals.filter((item) => item.category === "dinner");

  return (
    <Tabs>
      <div className=" container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Meals By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center text-xl md:text-2xl font-light mt-10">
          <TabList>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
            <Tab>All Meals</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {breakfast.slice(0, 4).map((meal) => (
              <MealsCard key={meal._id} meal={meal}></MealsCard>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lunch.slice(0, 4).map((meal) => (
              <MealsCard key={meal._id} meal={meal}></MealsCard>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dinner.slice(0, 4).map((meal) => (
              <MealsCard key={meal._id} meal={meal}></MealsCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.slice(0, 4).map((meal) => (
              <MealsCard key={meal._id} meal={meal}></MealsCard>
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
