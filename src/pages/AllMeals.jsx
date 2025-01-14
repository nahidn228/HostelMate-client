/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MealsCard from "../components/MealsCard";

const AllMeals = () => {
  // const [meals] = useMeals();
  // const axiosPublic = useAxiosPublic();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [getMeals, setGetMeals] = useState([]);
  // console.log(meals);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    try {
      const fetchAllData = async () => {
        const { data } = await axios.get(
          `http://localhost:5000/meals?filter=${filter}&search=${search}&sort=${sort}`
        );
        setGetMeals(data);
      };
      fetchAllData();
    } catch (err) {
      toast.error(err);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [filter, search, sort]);

  return (
    <div className="container lg:px-6 py-10 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 ">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="category"
              id="category"
              className="border p-4 rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Filter By Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner"> Dinner</option>
            </select>
            <form>
              <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                  type="text"
                  name="search"
                  placeholder="Enter Job Title"
                  aria-label="Enter Job Title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="flex gap-4 items-center">
            <select
              name="category"
              id="category"
              className="border p-4 rounded-md"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By Price</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
            <button className="btn">Reset</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getMeals.map((meal) => (
            <MealsCard key={meal._id} meal={meal} />
          ))}
          {/* {getMeals.map((meal) => (
            <InfiniteScroll
              key={meal._id}
              dataLength={getMeals.length}
              pageStart={0}
              loadMore={meal}
              next={fetchAllData}
              hasMore={hasMore}
            >
              <MealsCard meal={meal} />
            </InfiniteScroll>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
