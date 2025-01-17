import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const UpcomingMealAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: { meals = [], totalPages } = {}, refetch } = useQuery({
    queryKey: ["meals", sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/upcomingMeals?sort=${sort}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const handleReset = () => {
    setSort("");
  };

  const handlePublish = (meal) => {
    const mealItem = {
      category: meal?.category,
      description: meal?.description,
      distributorName: meal?.distributorName,
      ingredients: meal?.ingredients,
      likedBy: meal?.likedBy,
      likes: meal?.likes,
      mealImage: meal?.mealImage,
      mealRequest: meal?.mealRequest,
      postTime: new Date().toISOString(),
      price: meal?.price,
      rating: meal?.rating,
      reviews: meal?.reviews,
      title: meal?.title,
      upcomingMealID: meal?._id,
    };

    Swal.fire({
      title: `Do you want to Publish ${meal?.title}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Publish",
      denyButtonText: `Don't Publish`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/meal", mealItem);
        console.log("Add to All Meals---->", res?.data);
        axiosSecure.delete(`/upcomingMeals/${meal._id}`).then((data) => {
          refetch();
          console.log("Delete from Upcoming Meals---->", data);
        });

        Swal.fire("Published!", "", "success");
      } else if (result.isDenied) {
        Swal.fire(`${meal?.title} are not published`, "", "info");
      }
    });
  };

  return (
    <div>
      {/* Sorting Options */}
      <div className="flex gap-4 items-center justify-between mb-10">
        <h2 className="text-2xl font-mono ">Upcoming Meals </h2>
        <div className="flex gap-3 items-center">
          <select
            className="border p-3 rounded-xl btn btn-outline text-center"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By Likes</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onClick={handleReset} className="btn" disabled={!sort}>
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-screen">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Likes</th>

              <th>Distributor Name</th>

              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, idx) => (
              <tr key={meal._id}>
                <th>{idx + 1}</th>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>

                <td>{meal.distributorName || "N/A"}</td>

                <td>
                  <button
                    onClick={() => handlePublish(meal)}
                    className="btn btn-outline"
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="btn btn-sm text-xl"
        >
          <FaArrowAltCircleLeft />
        </button>
        <span className="font-semibold font-lato"> {page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-sm text-xl"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default UpcomingMealAdmin;
