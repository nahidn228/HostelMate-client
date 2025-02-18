import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdRestaurant } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
export const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMeal = () => {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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
        postTime: new Date(),
        mealRequest: 0,
        reviews: [],
        price: parseFloat(data?.price).toFixed(2),
        description: data?.recipe,
        mealImage: imgBB?.data?.data?.display_url,
      };

      const res = await axiosSecure.post("/meal", mealItem);
      console.log(res?.data);
      if (res?.data?.insertedId) {
        reset();
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
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-[#D1A054] mb-6">
        Add Your Meal <MdRestaurant className="inline text-3xl ml-2" />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Meal Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold text-gray-700">
                Meal Name*
              </span>
            </div>
            <input
              {...register("name", { required: true, maxLength: 50 })}
              type="text"
              placeholder="Enter meal name"
              className="input input-bordered w-full border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
            />
          </label>

          {/* Category */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold text-gray-700">
                Category*
              </span>
            </div>
            <select
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
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
              <span className="label-text text-lg font-semibold text-gray-700">
                Distributor Name
              </span>
            </div>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 border-gray-300"
            />
          </label>

          {/* Distributor Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold text-gray-700">
                Distributor Email
              </span>
            </div>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 border-gray-300"
            />
          </label>

          {/* Price */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold text-gray-700">
                Price*
              </span>
            </div>
            <input
              {...register("price", { required: true })}
              type="number"
              step="0.01"
              placeholder="Enter price"
              className="input input-bordered w-full border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
            />
          </label>

          {/* Ingredients */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg font-semibold text-gray-700">
                Ingredients*
              </span>
            </div>
            <input
              {...register("ingredients", { required: true })}
              type="text"
              placeholder="Enter ingredients (e.g., tomato, cheese)"
              className="input input-bordered w-full border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
            />
          </label>
        </div>

        {/* Recipe Details */}
        <label className="form-control w-full mt-6">
          <div className="label">
            <span className="label-text text-lg font-semibold text-gray-700">
              Recipe Details*
            </span>
          </div>
          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered w-full h-24 border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
            placeholder="Enter detailed recipe"
          ></textarea>
        </label>

        {/* Upload Image */}
        <div className="form-control my-6">
          <label className="label">
            <span className="label-text text-lg font-semibold text-gray-700">
              Upload Image
            </span>
          </label>
          <input
            type="file"
            {...register("image")}
            className="file-input w-full max-w-xs border-gray-300 focus:ring-[#D1A054] focus:border-[#D1A054]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-blue-700 text-white w-full hover:bg-[#2B3440] hover:text-white mt-4"
        >
          Add Meal <MdRestaurant className="ml-2" />
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
