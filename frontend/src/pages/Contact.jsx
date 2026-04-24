import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Globe, Clock, ArrowRight, CheckCircle2,
  Users, ShieldCheck, Zap, X, Sparkles, MessageSquare
} from "lucide-react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* --- NOTIFICATION TOAST --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-800 dark:border-slate-200"
          >
            <div className="bg-emerald-500 p-1 rounded-full text-white">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-sm font-bold">Inquiry Sent</p>
              <p className="text-xs opacity-70">A specialist will reply shortly.</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-2 opacity-50 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO HEADER --- */}
      <section className="relative pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-200/20 dark:bg-indigo-900/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Support Center Online</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Help is just a <span className="text-indigo-600">click away.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            Connect with our healthcare optimization experts. We're here to assist with clinic onboarding, patient support, and technical inquiries.
          </p>
        </div>
      </section>

      {/* --- MAIN GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INFO SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Our specialized teams respond in real-time.</p>
              <div className="space-y-3 font-medium text-indigo-600 dark:text-indigo-400">
                <a href="mailto:support@prescripto.com" className="block hover:underline">support@prescripto.com</a>
                <a href="mailto:sales@prescripto.com" className="block hover:underline">sales@prescripto.com</a>
              </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2rem] text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Uptime 99.9%</div>
                <h3 className="text-xl font-bold mb-2">Technical Status</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">All systems operational. Our cloud infrastructure monitors clinic performance 24/7.</p>
              </div>
              <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
                        <input type="text" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white" placeholder="John Carter" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                        <input type="email" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white" placeholder="john@clinic.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Inquiry Category</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white appearance-none cursor-pointer">
                        <option>General Support</option>
                        <option>Clinic Partnership</option>
                        <option>Billing Inquiry</option>
                        <option>Security & Privacy</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Detailed Message</label>
                      <textarea rows={5} required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none" placeholder="Describe your request in detail..."></textarea>
                    </div>

                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-3 group">
                      Send Secure Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Success!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed">
                      Your message has been encrypted and sent. Our team will contact you at your work email shortly.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-8 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Send another request</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGO STRIP --- */}
      <section className="bg-white dark:bg-slate-950 py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mb-10">Trusted Global Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 dark:opacity-30 grayscale hover:grayscale-0 transition-all">
             <span className="text-2xl font-black italic tracking-tighter">MEDICARE</span>
             <span className="text-2xl font-bold tracking-widest uppercase">Apex</span>
             <span className="text-2xl font-black tracking-tighter">HEALTH-SYNC</span>
             <span className="text-2xl font-black">CityClinic</span>
             <span className="text-2xl font-bold tracking-tight">VITALITY</span>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <TrustCard 
            icon={<Users className="text-indigo-600" size={28}/>}
            title="Clinic Focused"
            desc="Tools designed specifically for growing clinics and hospitals."
          />
          <TrustCard 
            icon={<ShieldCheck className="text-emerald-600" size={28}/>}
            title="HIPAA Compliant"
            desc="Enterprise-grade security and end-to-end data encryption."
          />
          <TrustCard 
            icon={<Zap className="text-orange-600" size={28}/>}
            title="Fast Onboarding"
            desc="Integrate Prescripto into your workflow in under 24 hours."
          />
        </div>
      </section>
    </div>
  );
};

const TrustCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="w-16 h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
      {icon}
    </div>
    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-4">{desc}</p>
  </div>
);

export default Contact;