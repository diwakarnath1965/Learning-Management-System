import React from "react";
import { FaBiohazard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/AuthSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const handleLogout = (e) => {
    e.preventDefault();
    const res = dispatch(logout());
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white py-5 px-10 md:px-20">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-4xl">
          <FaBiohazard color="white" />
        </Link>

        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex gap-9 items-center text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn && role === "ADMIN" && (
            <>
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/course/create">Create New Course</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/courses">All Courses</Link>
          </li>

          <li>
            <Link to="/about">About Us</Link>
          </li>

          {!isLoggedIn ? (
            <li>
              <Link to="/login" className="bg-yellow-500 px-5 py-3 rounded-md text-lg">
                Login
              </Link>
              <Link to="/signup" className="ml-3 border px-5 py-3 rounded-md text-lg">
                Signup
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/user/profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Profile
              </Link>
              <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
