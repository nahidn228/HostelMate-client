/* eslint-disable react/prop-types */

const UseTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center my-8">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-[#2B3440] uppercase tracking-widest">
        {title}
      </h1>
      <p className="text-lg text-gray-600 mt-4 font-medium">{subtitle}</p>
    </div>
  );
};

export default UseTitle;
