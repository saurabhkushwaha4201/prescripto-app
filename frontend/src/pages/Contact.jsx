import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Globe,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  X,
  Sparkles
} from "lucide-react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowToast(true);
    // Hide toast after 4 seconds
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-6 pb-0">

      {/* --- SONNER-STYLE TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-100 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-800"
          >
            <div className="bg-emerald-500 p-1 rounded-full">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Message received!</p>
              <p className="text-xs text-slate-400">We'll get back to you in ~12 mins.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 text-slate-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-200/20 blur-[120px] rounded-full -z-10" />

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Support Online</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            How can we <span className="text-indigo-600">help?</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Whether you're a clinic looking to scale or a patient with a question, our specialized teams are ready to assist.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* --- LEFT SIDE: INFO STACK --- */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 transition-all">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4">
                <Mail size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
              <div className="mt-2 space-y-1">
                <p className="text-indigo-600 text-sm font-medium cursor-pointer hover:underline">support@prescripto.com</p>
                <p className="text-slate-500 text-sm font-medium cursor-pointer hover:underline">sales@prescripto.com</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="relative overflow-hidden bg-linear-to-br from-indigo-900 via-slate-900 to-black p-6 rounded-4xl shadow-xl group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Fast Response</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Monitoring</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Our team ensures 99.9% uptime for your clinic.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full" />
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={18} className="text-slate-400" />
                <h3 className="font-bold text-slate-900 text-base">Global Presence</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-orange-50 rounded-lg text-xs font-semibold text-orange-700 border border-orange-100">🇮🇳 India</span>
                <span className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 border border-blue-100">🇺🇸 United States</span>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 relative p-px rounded-[2.5rem] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-[2.4rem] p-8 md:p-10 h-full relative">

              {/* Floating Response Badge */}
              <div className="absolute top-6 right-8 hidden md:flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                <Sparkles size={14} className="text-indigo-600" />
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tight">Avg response: 12 mins</span>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Full Name</label>
                        <input type="text" required placeholder="James Wilson" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm outline-none transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Work Email</label>
                        <input type="email" required placeholder="james@clinic.com" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Inquiry Type</label>
                      <select className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm outline-none transition-all appearance-none cursor-pointer">
                        <option>Patient support</option>
                        <option>Clinic onboarding</option>
                        <option>Sales & partnerships</option>
                        <option>Careers</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 ml-1">Message</label>
                      <textarea rows={4} placeholder="How can we help your team?" className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white rounded-xl px-5 py-3.5 text-sm outline-none transition-all resize-none" />
                    </div>
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
                      Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Message Sent!</h2>
                    <p className="text-slate-500 mt-3 max-w-xs mx-auto text-sm leading-relaxed">
                      We've received your request. A specialist will reach out to your work email shortly.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-8 text-indigo-600 font-bold text-sm hover:underline">Send another message</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- LOGO CLOUD SECTION (Professional Color Badges) --- */}
      <div className="w-full bg-white py-16 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">
            Trusted by leading healthcare providers
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {[
              { name: "MEDICARE", bg: "bg-blue-50", text: "text-blue-600", style: "italic font-black" },
              { name: "HEALTH-SYNC", bg: "bg-emerald-50", text: "text-emerald-600", style: "font-black" },
              { name: "CityClinic", bg: "bg-red-50", text: "text-red-600", style: "italic font-black tracking-tighter" },
              { name: "Apex", bg: "bg-indigo-50", text: "text-indigo-600", style: "font-black tracking-widest uppercase" },
              { name: "VITALITY", bg: "bg-orange-50", text: "text-orange-600", style: "font-black" }
            ].map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`px-6 py-3 rounded-2xl ${logo.bg} ${logo.text} ${logo.style} text-xl border border-transparent hover:border-white hover:shadow-md transition-all duration-300 cursor-default select-none shadow-sm flex items-center justify-center`}
              >
                {logo.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TRUST SECTION --- */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-24 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-slate-900">Built for real healthcare teams</h3>
            <p className="text-slate-500 mt-2 text-sm">Enterprise-grade security meets lightning-fast support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Users, color: "indigo", title: "Trusted by Clinics", desc: "Optimizing patient workflows globally." },
              { icon: ShieldCheck, color: "emerald", title: "Secure & Privacy-First", desc: "HIPAA-ready data encryption." },
              { icon: Zap, color: "purple", title: "Designed to Scale", desc: "Infrastructure that grows with your team." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className={`w-14 h-14 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300 shadow-sm border border-${item.color}-100`}>
                  <item.icon size={28} />
                </div>
                <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-62.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;