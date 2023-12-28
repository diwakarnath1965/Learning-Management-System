import React from "react";
import HomePageImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="pt-10 text-white flex flex-col md:flex-row items-center justify-center gap-10 h-[90vh] bg-slate-600 px-5 md:px-10">
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-5xl font-semibold">
          Find out best
          <span className="text-yellow-500 font-bold">Online Courses</span>
        </h1>
        <p className="text-xl text-gray-200">
          We have a large library of courses taught by highly skilled and
          qualified faculties at a very affordable cost.
        </p>

        <div className="space-x-6 mt-6 md:mt-0">
          <Link to="/courses">
            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
              Explore courses
            </button>
          </Link>

          <Link to="/contact">
            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img alt="homepage image" src={HomePageImage} className="w-full" />
      </div>
    </div>
  );
};

export default HomePage;
