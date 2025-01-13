import bgimg from "../assets/images/fullImg.jpg";
import ParallaxCard from "./ParallaxCard";
const Parallax = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
      className="my-10  bg-fixed bg-cover text-white "
    >
      <div className=" py-20 px-36  bg-gray-900/60">
        <div className="md:flex items-center justify-center gap-6">
          {/* <div className="">
            <img className="" src={featuredImg} alt="" />
          </div> */}
          <div className="space-y-4">
            <ParallaxCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parallax;
