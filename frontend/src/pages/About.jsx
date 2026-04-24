import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  CheckCircle,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";
import { assets } from "../assets/assets";

/* ---------------- DATA ---------------- */

const TRUST_STATS = [
  { label: "Clinics onboarded", value: "120+" },
  { label: "Appointments", value: "15K+" },
  { label: "Avg response", value: "2 min" },
];

const TESTIMONIALS = [
  {
    quote: "Prescripto made booking my family's appointments effortless — simple and reliable.",
    who: "Anita K.",
    role: "Patient"
  },
  {
    quote: "We cut no-shows by 35% after adding Prescripto’s automated reminder workflows.",
    who: "Dr. Rohit P.",
    role: "Clinic Owner"
  },
];

const TEAM = [
  {
    name: "Saurabh Kumar",
    role: "Founder & CTO",
    img: assets.team_saurabh || "https://via.placeholder.com/150",
  },
  {
    name: "Priya Sharma",
    role: "Product Design",
    img: assets.team_priya || "https://via.placeholder.com/150",
  },
];

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-24 transition-colors duration-300">

      {/* ================= HERO SECTION ================= */}
      <section className="relative rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-700 text-white px-8 py-20 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-indigo-200" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">The Future of Patient Care</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Healthcare management <br /> 
            <span className="text-indigo-200 underline decoration-indigo-400/50 underline-offset-8">reimagined.</span>
          </h1>

          <p className="mt-8 text-lg text-indigo-100 leading-relaxed max-w-2xl mx-auto">
            We provide a unified infrastructure for clinics to automate scheduling, 
            reduce administrative burden, and deliver a seamless patient experience.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/doctors" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
              Explore Network <ArrowRight size={18} />
            </a>
            <a href="/login" className="px-8 py-4 bg-indigo-500/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
              Create Provider Account
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= PROBLEM & SOLUTION ================= */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src={assets.about_image}
            alt="Healthcare Professional"
            className="rounded-[2rem] shadow-2xl border-8 border-white dark:border-slate-800 transition-colors"
          />
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border dark:border-slate-800 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Data Privacy</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">HIPAA Compliant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <header>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Eliminating the friction in <br /> medical scheduling.
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Traditional clinic systems are fragmented. Prescripto bridges the gap 
              between healthcare providers and patients with a modern, cloud-native platform.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Real-time Sync", desc: "No more double bookings." },
              { icon: Users, title: "Patient Portals", desc: "Self-service management." },
              { icon: Globe, title: "Clinic Network", desc: "Scale across locations." },
              { icon: CheckCircle, title: "Reminders", desc: "Automated SMS & Email." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                <item.icon size={20} className="text-indigo-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST & STATS ================= */}
      <section className="bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border dark:border-slate-800 transition-colors">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by clinics — built for people.</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We help clinics reduce no-shows by 35% while providing patients a fast, mobile-first experience.
            </p>
            
            <div className="flex gap-10 border-t dark:border-slate-800 pt-8">
              {TRUST_STATS.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{s.value}</div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border dark:border-slate-700 relative group">
                <Star className="absolute top-8 right-8 text-amber-400 opacity-20 group-hover:opacity-100 transition-opacity" size={24} />
                <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{t.who}</p>
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="text-center space-y-12">
        <div className="max-w-xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Our Leadership</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            A small team of dedicated professionals committed to making healthcare accessible.
          </p>
        </div>

        <div className="flex justify-center gap-12 flex-wrap">
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="w-56 group"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] rotate-6 group-hover:rotate-0 transition-transform duration-300 -z-10" />
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-64 object-cover rounded-[2rem] border-4 border-white dark:border-slate-800 shadow-xl"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{m.name}</h4>
              <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-slate-900 dark:bg-indigo-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">Ready to optimize your workflow?</h3>
          <p className="text-indigo-200 text-lg">Join 120+ providers and start your 14-day free trial today.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
              Start Free Trial
            </a>
            <a href="/contact" className="px-10 py-4 bg-white/10 border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">
              Schedule Demo
            </a>
          </div>
          
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] pt-4">No Credit Card Required • Trusted Secure HIPAA-Ready</p>
        </div>
      </section>

    </main>
  );
}

// Utility icon
function Sparkles({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}