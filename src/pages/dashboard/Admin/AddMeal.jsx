import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MdRestaurant } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

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
        postTime: new Date().toISOString(),
        mealRequest: 0,
        reviews: [],
        price: parseFloat(data?.price),
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
    <div>
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
  );
};

export default AddMeal;
