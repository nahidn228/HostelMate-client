import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdRestaurant } from "react-icons/md";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { AuthContext } from "./../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpcomingMealAdmin = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
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

  // Add Upcoming Meal Using Modal
  const onSubmit = async (data) => {
    console.log(data);
    //image upload to imgbb and then get url
    const imageFile = { image: data.image[0] };
    const imgBB = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log("with image url", imgBB.data);

    if (imgBB?.data?.success) {
      // now send the menu item data to the server with the image url
      const mealItem = {
        title: data?.name,
        distributorName: user?.displayName,
        distributorEmail: user?.email,
        category: data?.category,
        ingredients: data?.ingredients.split(" "),
        rating: 0,
        likes: 0,
        postTime: new Date().toISOString(),
        mealRequest: 0,
        reviews: [],
        price: parseFloat(data?.price).toFixed(2),
        description: data?.recipe,
        mealImage: imgBB?.data?.data?.display_url,
      };

      const res = await axiosSecure.post("/upcomingMeals", mealItem);
      console.log(res?.data);
      if (res?.data?.insertedId) {
        document.getElementById("my_modal_3").close();
        reset();
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the All Meals.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center justify-between mb-10">
        <h2 className="text-2xl font-mono ">Upcoming Meals </h2>
        {/* Sorting Options */}
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

        {/* Add an upcoming Meal modal */}
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Upcoming Meal
        </button>
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add Upcoming Meal!</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 ">
                {/* Recipe Name */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Meal Name*</span>
                  </div>
                  <input
                    {...register("name", { required: true, maxLength: 50 })}
                    type="text"
                    placeholder="Meal Name"
                    className="input input-bordered w-full "
                  />
                </label>

                {/* Category */}
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Category*</span>
                  </div>
                  <select
                    defaultValue="default"
                    {...register("category", { required: true })}
                    className="select select-bordered w-full "
                  >
                    <option disabled value="default">
                      Select a category
                    </option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </label>

                {/* Distributor Name */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Distributor Name</span>
                  </div>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </label>

                {/* Distributor Email */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Distributor Email</span>
                  </div>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </label>

                {/* Price */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Price*</span>
                  </div>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    step="0.01"
                    placeholder="Enter Price"
                    className="input input-bordered w-full "
                  />
                </label>

                {/* Ingredients */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Ingredients*</span>
                  </div>
                  <input
                    {...register("ingredients", { required: true })}
                    type="text"
                    placeholder="Enter ingredients separated by spaces"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>

              {/* Recipe Details */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Recipe Details*</span>
                </div>
                <textarea
                  {...register("recipe", { required: true })}
                  className="textarea textarea-bordered h-24"
                  placeholder="Recipe Details"
                ></textarea>
              </label>

              {/* Upload Image */}
              <div className="form-control my-6">
                <input
                  type="file"
                  {...register("image")}
                  className="file-input w-full max-w-xs"
                />
              </div>

              {/* Submit Button */}
              <button className="btn flex gap-1 bg-[#D1A054]">
                Add Meal <MdRestaurant />
              </button>
            </form>
          </div>
        </dialog>
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
