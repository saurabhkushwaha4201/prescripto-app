import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

const RelatedDoctors = ({ specialization, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && specialization) {
      const doctorsData = doctors.filter(
        (doc) => doc.specialization === specialization && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, specialization, docId]);

  return (
    <div className="flex flex-col items-center gap-6 my-20 transition-colors duration-300">
      {/* --- Section Header --- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Related Specialists
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
          Explore other highly-rated {specialization}s in our trusted network.
        </p>
      </div>

      {/* --- Responsive Grid --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-8 px-4 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="group border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-none hover:-translate-y-2 transition-all duration-500 bg-white dark:bg-slate-900"
          >
            {/* Image Container */}
            <div className="aspect-[4/5] bg-indigo-50 dark:bg-slate-800/50 overflow-hidden">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={item.image} 
                alt={item.name} 
              />
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${item.available ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
                <p className={`text-xs font-bold uppercase tracking-wider ${item.available ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`}>
                  {item.available ? "Available" : "Busy"}
                </p>
              </div>

              <h3 className="text-slate-900 dark:text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                {item.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- More Button --- */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-10 group flex items-center gap-2 px-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all active:scale-95"
      >
        View Full Network
        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default RelatedDoctors;