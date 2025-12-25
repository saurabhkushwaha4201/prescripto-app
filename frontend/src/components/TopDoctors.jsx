import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item) => {
          // 🔑 SAFE fallback: future-proof
          const isAvailable = item.available ?? true;

          return (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="aspect-square bg-blue-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm mb-1 ${
                    isAvailable ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-gray-500"
                    }`}
                  />
                  <p>{isAvailable ? "Available" : "Not Available"}</p>
                </div>

                <p className="text-gray-900 text-lg font-medium truncate">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm truncate">
                  {item.speciality}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-700 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
      >
        View More
      </button>
    </div>
  );
};

export default TopDoctors;
