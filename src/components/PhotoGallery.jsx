import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PhotoGallery = () => {
  const handleDetails = () => {
    Swal.fire({
      title: `See in Below by scrolling`,
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
    });
  };
  const axiosPublic = useAxiosPublic();
  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals`);
      return res.data;
    },
  });

  return (
    <div className="">
      <div className="w-11/12 max-w-screen-xl mx-auto flex items-center justify-between py-10">
        <div className="text-base font-normal">
          <div className="divider w-1/4 divider-neutral p-2"></div>
          <p className="text-sm font-medium uppercase">
            Welcome to our photo gallery
          </p>
          <h4 className=" text-2xl lg:text-4xl font-semibold">
            Photo Gallery of Our Food
          </h4>
        </div>
        <button
          onClick={handleDetails}
          className="btn btn-outline rounded-full md:px-8 hover:bg-[#142943] mt-4"
        >
          View All
        </button>
      </div>
      <div className="py-12 h-[28rem] w-11/12 max-w-screen-xl mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {meals.map((meal) => (
            <SwiperSlide key={meal._id}>
              <img className="w-80 h-80 object-cover" src={meal?.mealImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoGallery;
