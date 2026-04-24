import React from 'react'
import { specializationData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecializationMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-6 py-20 transition-colors duration-300">
      
      {/* --- Section Header --- */}
      <div className="text-center space-y-3 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Find by Speciality
        </h1>
        <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Select from our range of verified specialists to begin your journey toward better health.
        </p>
      </div>

      {/* --- Horizontal Category List --- */}
      {/* Added 'no-scrollbar' utility to keep the UI clean on mobile */}
      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto px-6 no-scrollbar">
        {specializationData.map((item, index) => (
          <Link 
            key={index} 
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center group cursor-pointer flex-shrink-0 transition-all duration-300"
          >
            {/* Icon Container */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
              <img 
                className="w-12 md:w-14 group-hover:brightness-0 group-hover:invert transition-all duration-300" 
                src={item.image} 
                alt={item.speciality} 
              />
            </div>
            
            <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>

      

      {/* --- Secondary CTA --- */}
      <div className="mt-6 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest cursor-pointer hover:gap-3 transition-all">
        View All Categories <span>→</span>
      </div>
    </div>
  );
};

export default SpecializationMenu;