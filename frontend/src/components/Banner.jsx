import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ChevronRight, ShieldCheck } from "lucide-react";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row bg-indigo-600 dark:bg-slate-900 rounded-[2.5rem] px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 items-center overflow-hidden shadow-2xl transition-all duration-500 border border-transparent dark:border-slate-800">
      
      {/* --- Background Decorative Element --- */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] dark:opacity-5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

      {/* ---------- Left Side (Text Content) -------- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 flex-1 py-12 sm:py-20 lg:py-28 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <ShieldCheck size={14} className="text-indigo-200" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Verified Healthcare Network</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
          Book Appointment With <br />
          <span className="text-indigo-200">100+ Trusted Doctors</span>
        </h1>
        
        <p className="mt-6 text-indigo-100 text-lg max-w-md font-medium leading-relaxed">
          Join Prescripto today for a seamless booking experience and secure medical record management.
        </p>

        <button
          onClick={() => {
            navigate("/login");
            window.scrollTo(0, 0);
          }}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl mt-10 text-indigo-600 font-bold text-sm sm:text-base bg-white shadow-xl shadow-indigo-900/20 hover:shadow-indigo-900/40 hover:-translate-y-1 transition-all active:scale-95"
        >
          <UserPlus size={18} />
          Create Account
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* ---------- Right Side (Doctor Image) -------- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full md:w-1/2 flex justify-center md:justify-end self-end pt-10 md:pt-0"
      >
        {/* Subtle glow behind the doctor */}
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/20 blur-[80px] rounded-full"></div>
        
        <img
          className="relative z-10 w-full max-w-md h-auto object-contain drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.3)]"
          src={assets.appointment_img}
          alt="Healthcare Professional"
        />
      </motion.div>
    </div>
  );
};

export default Banner;