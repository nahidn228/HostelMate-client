import Amenities from "../components/Amenities";
import Carousel from "../components/Carousel";
import LongCard from "../components/LongCard";
import PhotoGallery from "../components/PhotoGallery";
import PricingPlans from "../components/PricingPlans";
import Rooms from "../components/Rooms";
import TabCategories from "../components/TabCategories";
import Parallax from "./Parallax";

const Home = () => {
  return (
    <div>
      <Carousel />
      <LongCard />
      <Amenities></Amenities>
      <TabCategories />
      <Rooms />
      <Parallax />
      <PhotoGallery />
      <PricingPlans />
    </div>
  );
};

export default Home;
