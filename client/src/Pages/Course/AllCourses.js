import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";

const AllCourses = () => {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    const res = dispatch(getAllCourses());
    if (res?.payload?.success) {
      toast.success("all courses fetched successfully");
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="min-h-[90vh] pt-12 pl-44 flex flex-col bg-slate-600 gap-10 text-black">
      <h1 className="text-center text-3xl font-semibold mb-5 justify-center pr-36">
        Explore the courses made by
        {" "}
        <span className="font-bold text-yellow-500">Industry experts</span>
      </h1>
      <div className="mb-10 flex flex-wrap gap-14">
        {courseData?.map((element) => {
          return <CourseCard key={element._id} data={element} />;
        })}
      </div>
    </div>
  )
};

export default AllCourses;
