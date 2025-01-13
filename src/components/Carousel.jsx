// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "./Slide";

import bgimg1 from "../assets/images/carousel1.jpg";
import bgimg2 from "../assets/images/carousel2.jpg";
import bgimg3 from "../assets/images/carousel3.jpg";
import bgimg4 from "../assets/images/carousel4.jpg";

export default function Carousel() {
  return (
    <div className="container  mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            title="Welcome to Hostel Mate"
            subtitle={
              'Your ultimate solution for seamless hostel management. Discover a smarter way to manage hostels effortlessly with advanced tools, seamless processes, and user-friendly features designed for you."'
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            title="Rooms & Suites"
            subtitle={
              "Experience comfort and convenience in our well-furnished rooms and suites, designed to make every stay feel like a home away from home."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            title="Restaurant"
            subtitle={
              "Savor delicious meals and diverse cuisines in our hostel’s restaurant, offering a cozy ambiance and flavors that feel like home."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg4}
            title="Activities"
            subtitle={
              "Stay entertained with a variety of engaging activities and events designed to bring fun, relaxation, and social connections to your hostel life."
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
