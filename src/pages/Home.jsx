import { motion } from "framer-motion";
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
      {/* Animated Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Carousel />
      </motion.div>

      {/* Animated LongCard */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LongCard />
      </motion.div>

      {/* Animated Amenities */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Amenities />
      </motion.div>

      {/* Animated TabCategories */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <TabCategories />
      </motion.div>

      {/* Animated Rooms */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Rooms />
      </motion.div>

      {/* Animated Parallax */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Parallax />
      </motion.div>

      {/* Animated PhotoGallery */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <PhotoGallery />
      </motion.div>

      {/* Animated PricingPlans */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <PricingPlans />
      </motion.div>
    </div>
  );
};

export default Home;
