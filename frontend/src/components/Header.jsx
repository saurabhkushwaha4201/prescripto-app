import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Calendar, ShieldCheck, ArrowRight, Users } from "lucide-react";

const Header = () => {
  return (
    <div className="relative mx-4 md:mx-10 rounded-[2.5rem] overflow-hidden bg-indigo-600 dark:bg-slate-900 transition-all duration-500 border border-transparent dark:border-slate-800 shadow-2xl shadow-indigo-200/20 dark:shadow-none">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] dark:opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20 relative z-10">

        {/* ------- Left Side (Content) ------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-24">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ShieldCheck size={14} className="text-indigo-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Verified Healthcare Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Book Appointment <br />
            <span className="text-indigo-200">With Trusted Doctors</span>
          </h1>

          {/* Sub Text */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-indigo-100 font-medium max-w-lg">
            <img className="w-28 drop-shadow-lg" src={assets.group_profiles} alt="Doctors profiles" />
            <p className="text-sm leading-relaxed opacity-90 text-center sm:text-left">
              Seamlessly browse our extensive network of certified specialists and schedule your visit in under 2 minutes.
            </p>
          </div>

          {/* Actions & Stats */}
          <div className="flex flex-col sm:flex-row items-center gap-10 mt-4 w-full sm:w-auto">
            
            {/* Professional CTA */}
            <a
              href="#specialization"
              className="group flex items-center justify-center gap-3 bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:shadow-indigo-900/40 hover:-translate-y-1 transition-all active:scale-95 w-full sm:w-auto"
            >
              Book Appointment 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Stats Dividers */}
            <div className="flex items-center gap-8 border-l border-white/20 pl-8 hidden lg:flex">
              <div className="text-center">
                <p className="text-2xl font-black text-white">120+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Specialists</p>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">15k+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* ------- Right Side (Visual) ------- */}
        <div className="md:w-1/2 relative flex items-end justify-center md:justify-end self-end pt-10 md:pt-0">
          {/* Subtle glow behind the doctor */}
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/20 blur-[100px] rounded-full"></div>
          
          <img
            className="w-full h-auto md:max-w-[95%] z-10 drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.3)]"
            src={assets.header_img}
            alt="Medical Team"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;