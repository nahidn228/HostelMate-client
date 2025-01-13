import Amenities from "../components/Amenities";
import Carousel from "../components/Carousel";
import LongCard from "../components/LongCard";
import PhotoGallery from "../components/PhotoGallery";
import Rooms from "../components/Rooms";
import Parallax from "./Parallax";

const Home = () => {
  return (
    <div>
      <Carousel />
      <LongCard />

      <Amenities></Amenities>
      <Rooms />
      <Parallax />
      <PhotoGallery />
    </div>
  );
};

export default Home;
