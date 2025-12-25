import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative overflow-hidden rounded-xl px-6 md:px-10 lg:px-20 mx-4 md:mx-10">
      
      {/* Vibrant Animated Background */}
      <div className="absolute inset-0 -z-10 animate-gradient-fast bg-size-[200%_200%] 
        bg-linear-to-br from-[#5f6fff] via-[#4f46e5] to-[#7c3aed]" />

      <div className="flex flex-col md:flex-row items-center">

        {/* ------- Left Side ------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 md:py-20">
          
          {/* Heading constrained to 2 lines */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Book Appointment <br />
            With Trusted Doctors
          </h1>

          {/* Sub Text */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img className="w-24" src={assets.group_profiles} alt="" />
            <p className="opacity-90">
              Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" /> 
              schedule your appointment hassle-free.
            </p>
          </div>

          {/* CTA + Stats Row */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mt-2">
            
            {/* Previous Orange/Pink Gradient Button */}
            <a
              href="#speciality"
              className="group flex items-center gap-2 bg-linear-to-r from-pink-500 to-orange-400 
              text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg 
              hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Book appointment 
              <img className="w-3 invert" src={assets.arrow_icon} alt="" />
            </a>

            {/* Stats */}
            <div className="flex gap-6 text-white/90">
              <div className="text-center">
                <p className="text-xl font-bold">120+</p>
                <p className="text-[10px] uppercase tracking-wider">Doctors</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">15k+</p>
                <p className="text-[10px] uppercase tracking-wider">Appts</p>
              </div>
            </div>
          </div>
        </div>

        {/* ------- Right Side ------- */}
        <div className="md:w-1/2 relative flex items-end justify-end self-end">
          <img
            className="w-full h-auto md:max-w-[90%] rounded-lg z-10"
            src={assets.header_img}
            alt="Doctors"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;