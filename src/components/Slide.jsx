/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slide = ({ image, title, subtitle }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center lg:justify-start  w-full h-full bg-gray-900/70'>
        <div className='container   lg:w-1/2 px-3 md:pl-28 space-y-5'>
          <h1 className='text-3xl font-normal text-white lg:text-7xl'>
            {title}
          </h1>
          <p className='text-base font-normal text-white lg:text-lg'>
            {subtitle}
          </p>
          <br />
          <Link
            to='/add-job'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
            More info
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
