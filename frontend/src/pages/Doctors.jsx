import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { specialization } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const categories = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    if (specialization) {
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.specialization.toLowerCase().trim() ===
            specialization.toLowerCase().trim()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialization]);

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Browse through the specialists
      </h1>
      <p className="text-gray-500 dark:text-slate-400 mt-1">
        Select a category to filter by specialization.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-8 mt-8">
        {/* Mobile Filter Toggle */}
        <button
          className={`py-2 px-6 border rounded-lg text-sm font-medium transition-all sm:hidden w-full mb-4 ${
            showFilter
              ? "bg-primary text-white border-primary"
              : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-slate-700"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`flex-col gap-3 min-w-[220px] ${
            showFilter ? "flex w-full" : "hidden sm:flex"
          }`}
        >
          {categories.map((cat) => (
            <p
              key={cat}
              onClick={() =>
                specialization === cat ? navigate("/doctors") : navigate(`/doctors/${cat}`)
              }
              className={`w-full pl-4 py-3 pr-10 border rounded-xl transition-all cursor-pointer font-medium text-sm
                ${
                  specialization === cat
                    ? "bg-indigo-50 border-primary text-primary dark:bg-primary/20 dark:text-white dark:border-primary"
                    : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item) => {
              const isAvailable = item.available ?? true;
              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="group border border-gray-100 dark:border-slate-700 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-none hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-slate-800"
                >
                  <div className="aspect-[4/5] bg-blue-50 dark:bg-slate-700/50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"
                        }`}
                      />
                      <p className={`text-xs font-medium ${isAvailable ? "text-green-500" : "text-gray-500"}`}>
                        {isAvailable ? "Available" : "Busy"}
                      </p>
                    </div>

                    <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                      {item.specialization}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 dark:text-slate-500 italic">No doctors found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;