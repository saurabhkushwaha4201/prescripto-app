import React, { useState } from 'react';
import { 
  Stethoscope, Building2, Scale, ShieldCheck, CheckCircle2, 
  ArrowRight, Mail, Apple, PlayCircle, Globe, Eye,
  Twitter, Instagram, Linkedin, ChevronDown
} from 'lucide-react';

const FooterLink = ({ children, href = "#", description }) => (
  <li className="group/link">
    <a href={href} className="flex flex-col py-1.5 transition-all duration-300">
      <div className="text-slate-500 group-hover/link:text-indigo-600 text-[13px] font-medium flex items-center">
        {children}
        <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
      </div>
      {description && (
        <span className="text-[11px] text-slate-400 font-normal leading-tight max-w-40 mt-0.5">
          {description}
        </span>
      )}
    </a>
  </li>
);

// Standardized Header with fixed toggle icons and working functionality
const SectionHeader = ({ icon: Icon, title, isOpen, onClick }) => (
  <div 
    className="flex items-center justify-between w-full mb-4 lg:mb-6 cursor-pointer lg:cursor-default group"
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:text-indigo-500 transition-colors">
        <Icon size={18} />
      </div>
      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900">{title}</h4>
    </div>
    {/* Toggle icon now standardized and visible on mobile for ALL sections */}
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

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setIsSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#F8FAFC] px-4 py-8 lg:py-16 font-sans antialiased">
      <div className="max-w-360 mx-auto">
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] lg:rounded-[4rem] p-6 lg:p-16 shadow-xl shadow-slate-200/10">
          
          {/* Upper Grid - Items start ensures newsletter aligns with nav headers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-8 lg:mb-10">
            
            {/* Branding - col-span-3 pushes it to the far left */}
            <div className="lg:col-span-3 space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3 group cursor-pointer w-fit">
                  <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                    <div className="h-4 w-4 border-[2.5px] border-white rounded-md rotate-45" />
                  </div>
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900">Prescripto</span>
                </div>
                <p className="text-slate-500 text-[14px] lg:text-[15px] leading-relaxed w-full lg:max-w-70">
                  Advanced healthcare management for modern clinics. Secure, seamless, and patient-first.
                </p>
              </div>

              {/* App Buttons */}
              <div className="flex flex-row lg:flex-col xl:flex-row gap-3">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all active:scale-95">
                  <Apple size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">App Store</span>
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all active:scale-95">
                  <PlayCircle size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-tighter">Google Play</span>
                </button>
              </div>
            </div>

            {/* Navigation Grid - 6 columns wide for balanced spacing */}
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-4">
              
              {/* Platform Section - Toggle logic now working */}
              <div className="border-b border-slate-100 lg:border-none pb-4 lg:pb-0">
                <SectionHeader 
                  icon={Stethoscope} title="Platform" 
                  isOpen={openSection === 'platform'} 
                  onClick={() => toggleSection('platform')} 
                />
                <ul className={`${openSection === 'platform' ? 'block' : 'hidden'} lg:block space-y-0.5 animate-in fade-in slide-in-from-top-2`}>
                  <FooterLink description="Explore clinical dashboards">Platform Overview</FooterLink>
                  <FooterLink>Browse Verified Doctors</FooterLink>
                  <FooterLink>Pricing Plan</FooterLink>
                  <FooterLink>Help Center</FooterLink>
                </ul>
              </div>

              {/* Company Section */}
              <div className="border-b border-slate-100 lg:border-none pb-4 lg:pb-0">
                <SectionHeader 
                  icon={Building2} title="Company" 
                  isOpen={openSection === 'company'} 
                  onClick={() => toggleSection('company')} 
                />
                <ul className={`${openSection === 'company' ? 'block' : 'hidden'} lg:block space-y-0.5 animate-in fade-in slide-in-from-top-2`}>
                  <FooterLink>About us</FooterLink>
                  <FooterLink>Careers</FooterLink>
                  <FooterLink>Contact Us</FooterLink>
                  <FooterLink>support@prescripto.com</FooterLink>
                </ul>
              </div>

              {/* Legal Section */}
              <div className="border-b border-slate-100 lg:border-none pb-4 lg:pb-0">
                <SectionHeader 
                  icon={Scale} title="Legal" 
                  isOpen={openSection === 'legal'} 
                  onClick={() => toggleSection('legal')} 
                />
                <ul className={`${openSection === 'legal' ? 'block' : 'hidden'} lg:block space-y-0.5 animate-in fade-in slide-in-from-top-2`}>
                  <FooterLink>Terms of Service</FooterLink>
                  <FooterLink>Cookie Policy</FooterLink>
                  <FooterLink>Privacy & Security</FooterLink>
                  <FooterLink>Security Practices</FooterLink>
                </ul>
              </div>
            </div>

            {/* Newsletter Section - Distributed across width on mobile */}
            <div className="lg:col-span-3">
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 lg:p-8 transition-all hover:shadow-inner h-full">
                <h4 className="text-slate-900 font-bold mb-2">Stay Updated</h4>
                <p className="text-[13px] text-slate-500 mb-6">Latest clinical tools and SaaS updates.</p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <input 
                      required type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="work@email.com" 
                      className="flex-1 w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                    <button className="sm:w-auto lg:w-full bg-indigo-600 text-white rounded-xl py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 whitespace-nowrap">
                      Join Newsletter <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-row lg:flex-col items-center gap-3 text-emerald-600 bg-white p-4 lg:p-6 rounded-2xl border border-emerald-100 shadow-sm animate-in zoom-in duration-300">
                    <CheckCircle2 size={24} className="lg:size-8" />
                    <div className="text-left lg:text-center">
                      <p className="text-sm font-bold uppercase tracking-wide">Success!</p>
                      <p className="text-[11px] text-slate-500">Check your email to confirm.</p>
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 mt-4 text-center lg:text-left">We respect your inbox. No spam, ever.</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Gap reduced via pt-6 and border-t */}
          <div className="pt-6 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8">
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 opacity-70">
                <ShieldCheck size={18} className="text-indigo-600" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-slate-900">HIPAA COMPLIANT</span>
              </div>
              <div className="flex items-center gap-2 opacity-70">
                <CheckCircle2 size={18} className="text-indigo-600" />
                <span className="text-[10px] font-bold tracking-[0.15em] text-slate-900">ISO 27001 CERTIFIED</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
              <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-white rounded-full transition-all">
                <Globe size={14} /> EN
              </button>
              <div className="w-px h-3 bg-slate-200" />
              <button className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-white rounded-full transition-all">
                <Eye size={14} /> High Contrast
              </button>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-3">
              <div className="flex gap-4">
                <Twitter size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Instagram size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                <Linkedin size={18} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">© 2025 Prescripto. All rights reserved.</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default PrescriptoFooter;