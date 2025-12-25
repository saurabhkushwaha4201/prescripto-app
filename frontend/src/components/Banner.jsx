import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row bg-linear-to-br from-[#5f6FFF] via-[#7042f8] to-[#3b32c4] rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 items-center overflow-hidden shadow-2xl">
      
      {/* ---------- Left Side (Text Content) -------- */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex-1 py-10 sm:py-16 md:py-16 lg:py-24 lg:pl-5 text-center md:text-left"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
          {/* Forced into 2 lines using a single container and controlled sizing */}
          <p>Book Appointment With</p>
          <p className="text-white/90">100+ Trusted Doctors</p>
        </div>

        <button
          onClick={() => {
            navigate("/login");
            window.scrollTo(0, 0);
          }}
          className="
            group inline-flex items-center gap-3
            px-8 py-3.5 rounded-full mt-8
            text-white font-bold text-sm sm:text-base
            bg-linear-to-r from-orange-400 via-orange-500 to-orange-600
            shadow-lg transition-all duration-300 ease-out
            hover:shadow-orange-500/50 hover:scale-105 hover:-translate-y-1
            active:scale-95 active:translate-y-0
          "
        >
          Create account
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="w-3 transition-transform duration-300 group-hover:translate-x-1 brightness-0 invert"
          />
        </button>
      </motion.div>

      {/* ---------- Right Side (Doctor Image) -------- */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 lg:w-100 flex justify-center md:justify-end self-end"
      >
        <img
          className="w-3/4 md:w-full h-auto object-contain max-w-md drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
          src={assets.appointment_img}
          alt="Doctor Banner"
        />
      </motion.div>
    </div>
  );
};

export default Banner;