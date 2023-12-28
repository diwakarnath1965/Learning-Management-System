import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  const navigateToCourse = () => {
    navigate("/course/description", { state: { ...data } });
  };

  return (
    <div
      onClick={navigateToCourse}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
      style={{ height: "32rem",width: "25rem" }} // Increase the height
    >
      <div className="group">
        <img
          className="w-[95%] justify-center pl-5 pt-4 h-64 object-cover group-hover:scale-105 transition-all duration-300"
          src={data?.thumbnail?.secure_url}
          alt="Course Thumbnail"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {data?.title}
          </h2>
          <p className="text-base text-gray-600 line-clamp-4 mb-2">
            {data?.description}
          </p>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Category: {data?.category}
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Lectures: {data?.numberOfLectures}
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-700">
            Instructor: {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
