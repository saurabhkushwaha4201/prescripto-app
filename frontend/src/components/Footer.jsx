import React, { useState } from 'react';
import { 
  Stethoscope, Building2, Scale, ShieldCheck, CheckCircle2, 
  ArrowRight, Mail, Apple, PlayCircle, Globe, Eye,
  Twitter, Instagram, Linkedin, ChevronDown, Zap
} from 'lucide-react';

const FooterLink = ({ children, href = "#", description }) => (
  <li className="group/link">
    <a href={href} className="flex flex-col py-1.5 transition-all duration-300">
      <div className="text-slate-500 dark:text-slate-400 group-hover/link:text-indigo-600 dark:group-hover/link:text-indigo-400 text-[13px] font-bold flex items-center">
        {children}
        <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
      </div>
      {description && (
        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-tight max-w-40 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity">
          {description}
        </span>
      )}
    </a>
  </li>
);

const SectionHeader = ({ icon: Icon, title, isOpen, onClick }) => (
  <div 
    className="flex items-center justify-between w-full mb-4 lg:mb-6 cursor-pointer lg:cursor-default group"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors">
        <Icon size={18} />
      </div>
      <h4 className="text-[10px] uppercase tracking-[0.25em] font-black text-slate-900 dark:text-white">{title}</h4>
    </div>
    <ChevronDown 
      size={16} 
      className={`text-slate-400 transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180' : ''}`} 
    />
  </div>
);

const PrescriptoFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 px-4 py-12 lg:py-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] lg:rounded-[4rem] p-8 lg:p-16 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Branding & Apps */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 group cursor-pointer w-fit">
                  <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
                    <Zap className="text-white fill-white/20" size={20} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Prescripto</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                  Leading the digital transformation of healthcare with secure, cloud-native clinic management.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:opacity-90 transition-all active:scale-95 border border-transparent dark:border-slate-700">
                  <Apple size={16} />
                  <span className="text-[10px] uppercase font-black tracking-widest">App Store</span>
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl hover:opacity-90 transition-all active:scale-95 border border-transparent dark:border-slate-700">
                  <PlayCircle size={16} />
                  <span className="text-[10px] uppercase font-black tracking-widest">Play Store</span>
                </button>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-4">
              <div>
                <SectionHeader icon={Stethoscope} title="Product" isOpen={openSection === 'platform'} onClick={() => toggleSection('platform')} />
                <ul className={`${openSection === 'platform' ? 'block' : 'hidden'} lg:block space-y-1`}>
                  <FooterLink description="Unified doctor dashboard">Clinical Tools</FooterLink>
                  <FooterLink>Verified Specialist Network</FooterLink>
                  <FooterLink>Patient Booking App</FooterLink>
                  <FooterLink>Enterprise Pricing</FooterLink>
                </ul>
              </div>

              <div>
                <SectionHeader icon={Building2} title="Organization" isOpen={openSection === 'company'} onClick={() => toggleSection('company')} />
                <ul className={`${openSection === 'company' ? 'block' : 'hidden'} lg:block space-y-1`}>
                  <FooterLink>About Our Mission</FooterLink>
                  <FooterLink>Career Opportunities</FooterLink>
                  <FooterLink>Partner with Us</FooterLink>
                  <FooterLink>Contact Support</FooterLink>
                </ul>
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="lg:col-span-3">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 h-full transition-all">
                <h4 className="text-slate-900 dark:text-white font-bold mb-1">Weekly Insights</h4>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mb-6 font-medium">Healthcare trends and tech updates.</p>
                
                {!isSubscribed ? (
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubscribed(true); }} className="space-y-3">
                    <input 
                      required type="email" 
                      placeholder="work@email.com" 
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white"
                    />
                    <button className="w-full bg-indigo-600 text-white rounded-xl py-3 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                      Subscribe <ArrowRight size={14} />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-emerald-600 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 animate-in zoom-in duration-300">
                    <CheckCircle2 size={32} />
                    <p className="text-xs font-black uppercase tracking-widest">You're in!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row justify-between items-center gap-10">
            
            {/* Compliance Badges */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <ShieldCheck size={20} className="text-indigo-600" />
                <span className="text-[9px] font-black tracking-[0.2em] text-slate-900 dark:text-white uppercase">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <span className="text-[9px] font-black tracking-[0.2em] text-slate-900 dark:text-white uppercase">ISO 27001 Certified</span>
              </div>
            </div>

            {/* Accessibility & Socials */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="flex items-center gap-4">
                <Twitter size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Instagram size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Linkedin size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              </div>
              <p className="text-[11px] text-slate-400 font-bold tracking-tight">
                © 2026 Prescripto Inc. <span className="mx-2 opacity-30">•</span> Made for Medical Excellence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default PrescriptoFooter;