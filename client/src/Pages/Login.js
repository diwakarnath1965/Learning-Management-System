import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../redux/slices/AuthSlice";
import loginImage from "../Assets/Images/login.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  async function onLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <form
        onSubmit={onLogin}
        className="flex flex-col justify-center items-center gap-4 rounded-3xl p-8 bg-slate-800 text-white max-w-md w-full"
      >
        <h1 className="font-bold text-3xl text-white mb-6">Login</h1>

        <div className="flex flex-col gap-2 items-start w-full">
          <input
            className="rounded-md p-3 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={loginData.email}
          />

          <input
            className="rounded-md p-3 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            value={loginData.password}
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md p-3 w-full max-w-xs"
        >
          Login
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link className="text-yellow-500 hover:underline" to="/signup">
            Signup
          </Link>
        </p>

        <p className="mt-2">
    Forgot your password?{" "}
    <Link className="text-yellow-500 hover:underline" to="/forgetpassword">
      Reset it
    </Link>
  </p>
      </form>

      {/* Related image on the right side */}
      <div className="hidden md:block w-1/2 pl-40">
        <img
          src={loginImage} // Replace with your image URL
          alt="Related Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
