import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChevronRight, Star } from "lucide-react";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-20 transition-colors duration-500">
      
      {/* --- Section Header --- */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Top Doctors to Book
        </h1>
        <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Connect with our highest-rated specialists for a seamless healthcare experience.
        </p>
      </div>

      {/* --- Professional Grid --- */}
      {/* Standardized to 8 or 10 for balanced rows (grid-cols-4 or 5) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-10 px-4 sm:px-0">
        {doctors.slice(0, 10).map((item) => {
          const isAvailable = item.available ?? true;

          return (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="group border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-none hover:-translate-y-2 bg-white dark:bg-slate-900"
            >
              {/* Image Container with Medical Overlay */}
              <div className="aspect-[4/5] bg-indigo-50 dark:bg-slate-800 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle rating badge overlay */}
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold dark:text-white">4.9</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    isAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"
                  }`}>
                    {isAvailable ? "Available Now" : "Currently Busy"}
                  </p>
                </div>

                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                  {item.specialization}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Footer Button --- */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="group mt-12 flex items-center gap-2 px-10 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all active:scale-95 shadow-sm"
      >
        View Full Network
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default TopDoctors;