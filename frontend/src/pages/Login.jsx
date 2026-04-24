import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, Clock, CheckCircle, ChevronRight, Loader2 } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const strengthLabels = ["Critical", "Weak", "Fair", "Strong", "Excellent"];
const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500", "bg-indigo-600"];

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("Login"); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const estimateStrength = (pw) => {
    let s = 0;
    if (pw.length > 7) s++;
    if (pw.length > 11) s++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const pwScore = estimateStrength(password);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const endpoint = mode === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = mode === 'Sign Up' ? { name, email, password } : { email, password };
      
      const { data } = await axios.post(backendUrl + endpoint, payload);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(mode === 'Sign Up' ? "Account created!" : "Welcome back");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-slate-800">
        
        {/* Left Side: Brand & Trust */}
        <div className="md:w-1/2 bg-indigo-600 dark:bg-indigo-700 p-10 md:p-16 text-white flex flex-col justify-between">
          <div>
            <div onClick={() => navigate('/')} className="flex items-center gap-2 mb-12 cursor-pointer group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">Prescripto</span>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Modern healthcare <br /> starts here.
            </h2>
            <p className="text-indigo-100 mb-10 max-w-sm leading-relaxed">
              Join thousands of patients managing their health with secure, real-time doctor appointments.
            </p>

            <div className="space-y-6">
              {[
                { icon: CheckCircle, title: "Verified Specialists", desc: "Access to top-tier medical professionals." },
                { icon: Clock, title: "Instant Booking", desc: "Skip the queue with real-time slot selection." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <item.icon className="w-6 h-6 text-indigo-300 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-indigo-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-indigo-500/50">
             <p className="text-indigo-200 text-sm">Need help? <span className="text-white font-medium cursor-pointer underline">Contact Support</span></p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <header className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {mode === "Login" ? "Sign In" : "Create Account"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                {mode === "Login" ? "Welcome back to your health portal." : "Start your medical journey with us today."}
              </p>
            </header>

            <form onSubmit={onSubmitHandler} className="space-y-5">
              <AnimatePresence mode="wait">
                {mode === "Sign Up" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Password</label>
                  {mode === "Login" && <span className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline">Forgot?</span>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {mode === "Sign Up" && password && (
                  <div className="pt-2 px-1">
                    <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 tracking-tighter">
                      <span className="text-slate-400">Security</span>
                      <span className={strengthColors[pwScore].replace('bg-', 'text-')}>{strengthLabels[pwScore]}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-full flex-1 rounded-full transition-all duration-500 ${i < pwScore ? strengthColors[pwScore] : 'bg-slate-200 dark:bg-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : mode}
                <ChevronRight size={18} />
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                {mode === "Login" ? "New to Prescripto?" : "Already have an account?"}{" "}
                <span 
                  onClick={() => setMode(mode === "Login" ? "Sign Up" : "Login")}
                  className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline"
                >
                  {mode === "Login" ? "Create one now" : "Sign In"}
                </span>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;