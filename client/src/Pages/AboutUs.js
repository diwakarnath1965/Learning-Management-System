import React from "react";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import apj from "../Assets/Images/apj.png";
import billGates from "../Assets/Images/billGates.png";
import einstein from "../Assets/Images/einstein.png";
import nelsonMandela from "../Assets/Images/nelsonMandela.png";
import steveJobs from "../Assets/Images/steveJobs.png";

const AboutUs = () => {
  return (
    <div className="pl-20 pt-20 flex flex-col text-white  bg-slate-600 h-[90vh]">
      <div className="flex items-center gap-5 mx-10">
        <section className="w-1/2 space-y-10 flex flex-col pt-40 justify-center">
          <h1 className="text-5xl text-yellow-500 font-semibold">
            Affordable and quality education
          </h1>
          <p className="text-xl text-gray-200">
            Our goal is to provide the afoordable and quality education to the
            world. We are providing the platform for the aspiring teachers and
            students to share their skills, creativity and knowledge to each
            other to empower and contribute in the growth and wellness of
            mankind.
          </p>
        </section>

        <div className="w-1/2 pt-36 pl-24">
          <img
            id="test1"
            style={{
              filter: "drop-shadow(0px 10px 10px rgb(0,0,0));",
            }}
            alt="about main image"
            className="drop-shadow-2xl"
            src={aboutMainImage}
          />
        </div>
      </div>


    </div>
  );
};

export default AboutUs;
