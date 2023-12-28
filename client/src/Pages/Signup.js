import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../redux/slices/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (
      !signupData.fullName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      navigate("/");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  return (
    <div className="flex bg-slate-600 items-center justify-center min-h-[90vh]">
      <form
        noValidate
        onSubmit={createNewAccount}
        className="flex flex-col justify-center text-center gap rounded-3xl py-10 p-4 text-white max-w-md w-full mx-auto bg-slate-800 shadow-lg"
      >
        <h1 className="font-bold text-3xl text-white mb-6">Registration Page</h1>

        <label htmlFor="image_uploads" className="cursor-pointer">
          {previewImage ? (
            <img className="w-32 h-32 rounded-full mx-auto mb-4" src={previewImage} alt="Preview" />
          ) : (
            <BsPersonCircle className="w-32 h-32 rounded-full mx-auto mb-4" />
          )}
        </label>
        <input
          onChange={getImage}
          className="hidden"
          type="file"
          name="image_uploads"
          id="image_uploads"
          accept=".jpg, .jpeg, .png, .svg"
        />

        <div className="flex flex-col gap-4">
          <input
            className="rounded-md p-3 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your Name"
            onChange={handleUserInput}
            value={signupData.fullName}
          />

          <input
            className="rounded-md p-3 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleUserInput}
            value={signupData.email}
          />

          <input
            className="rounded-md p-3 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleUserInput}
            value={signupData.password}
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md p-3 mt-6"
        >
          Register
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link className="text-yellow-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
