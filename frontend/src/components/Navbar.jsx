import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken, userData, darkMode, toggleDarkMode } = useContext(AppContext);
  
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle sticky header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ALL DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-[100] w-full transition-all duration-300 backdrop-blur-md
      ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 shadow-sm border-b dark:border-slate-800' : 'bg-white dark:bg-slate-900 border-b border-transparent'}
    `}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        
        {/* --- Logo --- */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center cursor-pointer transition-transform hover:scale-[1.02] active:scale-100"
        >
          <img 
            className="w-36 md:w-40 dark:brightness-0 dark:invert transition-all" 
            src={assets.logo} 
            alt="Prescripto" 
          />
        </div>

        {/* --- Desktop Navigation --- */}
        <ul className="hidden lg:flex items-center gap-10 font-bold text-[13px] tracking-widest text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              to={link.path}
              className={({ isActive }) => `
                relative py-2 transition-all hover:text-primary dark:hover:text-primary
                ${isActive ? 'text-primary' : ''}
              `}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-primary/30 transition-all active:scale-90"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <div className="w-9 h-9 rounded-full ring-2 ring-primary/20 p-0.5 overflow-hidden">
                <img className="w-full h-full rounded-full object-cover" src={userData.image} alt="User" />
              </div>
              <img className="w-2.5 transition-transform group-hover:rotate-180 dark:invert" src={assets.dropdown_icon} alt="" />
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 pt-4 hidden group-hover:block z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="min-w-56 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-2 border border-slate-100 dark:border-slate-700">
                  <button onClick={() => navigate("/my-profile")} className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors font-semibold text-slate-700 dark:text-slate-200">
                    My Profile
                  </button>
                  <button onClick={() => navigate("/my-appointments")} className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors font-semibold text-slate-700 dark:text-slate-200">
                    Appointments
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-700 my-1 mx-2" />
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-bold">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hidden sm:block transition-all shadow-lg shadow-primary/25 active:scale-95"
            >
              Sign In
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(true)}
            className="p-2 lg:hidden dark:invert"
          >
            <img className="w-6" src={assets.menu_icon} alt="Menu" />
          </button>
        </div>
      </nav>

      {/* --- Responsive Mobile Drawer --- */}
      <div className={`
        fixed inset-0 z-[200] lg:hidden transition-all duration-500
        ${showMenu ? "visible" : "invisible"}
      `}>
        {/* Backdrop */}
        <div 
          onClick={() => setShowMenu(false)}
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${showMenu ? "opacity-100" : "opacity-0"}`} 
        />
        
        {/* Drawer Content */}
        <div className={`
          absolute right-0 top-0 bottom-0 w-[80%] max-w-xs bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500
          ${showMenu ? "translate-x-0" : "translate-x-full"}
        `}>
          <div className="flex items-center justify-between px-6 py-5 border-b dark:border-slate-800">
            <img className="w-32 dark:invert" src={assets.logo} alt="" />
            <button onClick={() => setShowMenu(false)} className="p-2 dark:invert">
              <img className="w-6" src={assets.cross_icon} alt="Close" />
            </button>
          </div>
          
          <nav className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => `
                  px-5 py-4 rounded-2xl font-bold tracking-widest transition-all
                  ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {!token && (
            <div className="px-10 mt-4">
              <button 
                onClick={() => navigate("/login")}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/25"
              >
                GET STARTED
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;