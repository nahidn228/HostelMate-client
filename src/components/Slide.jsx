/* eslint-disable react/prop-types */

const Slide = ({ image, title, subtitle }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center   w-full h-full bg-gray-900/70">
        <div className="container   lg:w-1/2 px-3  space-y-5">
          <h1 className="text-3xl font-normal text-white lg:text-7xl">
            {title}
          </h1>
          <p className="text-base font-normal text-white lg:text-lg">
            {subtitle}
          </p>
          <br />
          <form>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent w-full"
                type="text"
                name="search"
                placeholder="Enter Your Choice"
                aria-label="Enter Your Choice"
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          {/* <Link
            to='/add-meal'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
            More info
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Slide;
