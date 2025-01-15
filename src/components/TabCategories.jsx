import { useQuery } from "@tanstack/react-query";
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
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse Meals By Categories
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Explore our delicious meals across three categories: Breakfast, Lunch,
          and Dinner. Click on the tabs below to discover your favorites.
        </p>

        <div className="flex items-center justify-center text-xl md:text-2xl font-light mt-10">
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
      </div>
    </Tabs>
  );
};

export default TabCategories;
