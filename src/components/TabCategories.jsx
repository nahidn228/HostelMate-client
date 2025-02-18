import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosPublic from "../hooks/useAxiosPublic";
import MealsCard from "./MealsCard";

const TabCategories = () => {
  // const [meals] = useMeals();
  const axiosPublic = useAxiosPublic();

  // Fetching meals with error handling
  const {
    data: meals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/meals");
        return res.data;
      } catch (err) {
        console.error("Error fetching meals:", err);
        throw new Error("Failed to fetch meals");
      }
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  // Categorizing meals
  const categories = [
    {
      name: "Breakfast",
      data: meals.filter((item) => item.category === "breakfast"),
    },
    { name: "Lunch", data: meals.filter((item) => item.category === "lunch") },
    {
      name: "Dinner",
      data: meals.filter((item) => item.category === "dinner"),
    },
    { name: "All Meals", data: meals },
  ];

  return (
    <Tabs>
      <div className="w-11/12 md:max-w-screen-xl py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-[#142943] capitalize lg:text-3xl">
          Browse Meals By Categories
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Explore our delicious meals across three categories: Breakfast, Lunch,
          and Dinner. Click on the tabs below to discover your favorites.
        </p>

        <div className="flex items-center justify-center text-lg md:text-2xl font-thin mt-10">
          <TabList>
            {categories?.map((category, index) => (
              <Tab key={index}>{category.name}</Tab>
            ))}
          </TabList>
        </div>

        {categories.map((category, index) => (
          <TabPanel key={index}>
            {category?.data?.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category?.data?.slice(0, 4).map((meal) => (
                  <MealsCard key={meal._id} meal={meal}></MealsCard>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                No meals available in this category.
              </div>
            )}
          </TabPanel>
        ))}
        <div className="flex justify-end mt-6">
          <Link
            to="/meals"
            className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
          >
            See More
            <svg
              className="w-4 h-5"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </Tabs>
  );
};

export default TabCategories;
