import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center font-sans">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="md:order-2">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-yellow-500 mb-6">
                {state?.title}
              </h1>
              <p className="text-yellow-500 mb-4">Course Description:</p>
              <p className="mb-6">{state?.description}</p>
            </div>
          </div>

          <div className="md:order-1">
            <div className="flex flex-col items-center md:items-start justify-center">
              <img
                className="w-[70%] h-64 object-cover rounded-md mb-6"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
              <div className="text-center md:text-left">
                <div className="mb-6">
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Total lectures:
                    </span>{" "}
                    {state?.numberOfLectures}
                  </p>
                  <p className="font-semibold">
                    <span className="text-yellow-500 font-bold">
                      Instructor:
                    </span>{" "}
                    {state?.createdBy}
                  </p>
                </div>
                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() =>
                      navigate("/course/displaylectures", { state: { ...state } })
                    }
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-xl rounded-md font-bold px-6 py-3 w-full md:w-auto hover:from-yellow-400 hover:to-yellow-300 transition-all ease-in-out duration-300 shadow-lg"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-xl rounded-md font-bold px-6 py-3 w-full md:w-auto hover:from-yellow-400 hover:to-yellow-300 transition-all ease-in-out duration-300 shadow-lg"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
