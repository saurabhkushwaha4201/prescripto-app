import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, UserCheck, Zap, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const strengthLabels = ["Critical", "Weak", "Fair", "Strong", "Excellent"];
const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-cyan-400", "bg-gradient-to-r from-cyan-500 to-violet-500"];

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Mode: "Sign Up" or "Login"
  const [mode, setMode] = useState("Sign Up"); 
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Password Strength Logic
  const estimateStrength = (pw) => {
    let s = 0;
    if (pw.length > 7) s++;
    if (pw.length > 11) s++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const pwScore = estimateStrength(password);

  const handleDemoLogin = () => {
    setMode("Login"); 
    setEmail("guest@example.com");
    setPassword("12345678");
    toast.info("Demo credentials loaded! Click Sign In.");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (mode === 'Sign Up') {
        // REGISTER LOGIC
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        // LOGIN LOGIC
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Redirect if logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
      
      {/* MESH BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-300/30 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-300/30 rounded-full blur-[120px] animate-blob animation-delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15)] border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[650px]"
      >
        {/* LEFT SIDE: INFO PANEL */}
        <div className="md:w-5/12 bg-gradient-to-br from-cyan-500 to-violet-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          
          <div className="relative z-10">
            <div onClick={() => navigate('/')} className="flex items-center gap-3 mb-16 cursor-pointer">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl shadow-inner-white">
                <Zap className="w-6 h-6 fill-white text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">Prescripto</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-8 tracking-tight">
              Healthcare <br />
              <span className="text-cyan-200 drop-shadow-sm">reimagined.</span>
            </h2>

            <div className="space-y-5">
              {[
                { icon: CheckCircle2, text: "Encrypted Cloud Health Data" },
                { icon: Globe, text: "24/7 Specialist Network" },
                { icon: Zap, text: "Real-time Appointment Sync" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors">
                     <item.icon className="w-5 h-5 text-cyan-100" />
                  </div>
                  <span className="text-white/90 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMode(mode === "Login" ? "Sign Up" : "Login")}
            className="relative z-10 w-fit mt-12 px-6 py-3 bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5"
          >
            {mode === "Login" ? "Create an account" : "Already a member?"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="md:w-7/12 p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10">
              <h3 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">
                {mode === "Login" ? "Welcome back!" : "Create account"}
              </h3>
              <p className="text-gray-500 font-medium">Simplify your medical journey today.</p>
            </header>

            <form className="space-y-5" onSubmit={onSubmitHandler}>
              <AnimatePresence mode="wait">
                {mode === "Sign Up" && (
                  <motion.div 
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2 block">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="John Doe" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        required={mode === "Sign Up"}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100/50 outline-none transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2 block">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="saurabh@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100/50 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2 block">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100/50 outline-none transition-all duration-300"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {password && (
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                      <span className="text-gray-400">Security Strength:</span>
                      <span className="text-cyan-600">{strengthLabels[pwScore]}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${i < pwScore ? strengthColors[pwScore] : 'bg-slate-200'}`} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {mode === "Login" ? "Sign In Now" : "Create Account"}
                  <Zap className="w-5 h-5 fill-white/20" />
                </motion.button>

                <div className="relative py-3 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                  <span className="relative px-4 bg-white text-xs font-bold text-gray-400 uppercase tracking-widest">or continue with</span>
                </div>
                
                <motion.button
                  type="button"
                  onClick={handleDemoLogin}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 border-2 border-cyan-100 text-cyan-600 font-bold rounded-2xl hover:bg-cyan-50/70 hover:border-cyan-300 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <UserCheck className="w-5 h-5" />
                  Try Demo Access
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .shadow-inner-white { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

export default Login;