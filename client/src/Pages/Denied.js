import React from "react";
import { useNavigate } from "react-router-dom";

const Denied = () => {

    const navigate = useNavigate();

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-slate-600">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        403
      </h1>
      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Access denied
      </div>
      <button onClick={() => navigate("/")} className="mt-5">
        <span className="relative block px-8 py-3 bg-[#1A2238] text-white border border-current">
          Go back
        </span>
      </button>
    </main>
  );
};

export default Denied;
