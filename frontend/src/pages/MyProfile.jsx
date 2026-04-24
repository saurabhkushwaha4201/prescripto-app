import React, { useState, useRef, useContext } from "react";
import {
  Camera, Mail, Phone, MapPin, User, Cake,
  ShieldCheck, HeartPulse, Edit3, Check, Loader2, Droplets, UserCircle
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { userData, setUserData, backendUrl, loadUserProfileData, token } = useContext(AppContext);

  const updateUserProfileData = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('bloodGroup', userData.bloodGroup);

      if (image) formData.append('image', image);

      const { data } = await axios.post(
        backendUrl + '/api/user/updateProfile',
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800">
          
          {/* Header Banner */}
          <div className="h-40 bg-gradient-to-r from-primary to-indigo-600 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute top-4 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full">
                <p className="text-white text-[10px] font-bold tracking-widest uppercase">
                  Patient ID: {userData._id ? userData._id.slice(-6).toUpperCase() : '---'}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-10">
            {/* Profile Avatar & Primary Info */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 relative z-10">
              <div className="relative shrink-0 group">
                <div className="w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-white dark:ring-slate-900 shadow-2xl bg-slate-200 dark:bg-slate-800">
                  <img src={userData.image} className="w-full h-full object-cover" alt="Profile" />
                </div>
                {isEdit && (
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Camera size={24} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Upload</span>
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>

              <div className="flex-1 text-center md:text-left pt-2">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  {isEdit ? (
                    <input 
                      className="text-2xl font-bold bg-slate-100 dark:bg-slate-800 dark:text-white border-b-2 border-primary outline-none px-2 py-1 rounded-t-lg w-full max-w-sm"
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
                    />
                  ) : (
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">{userData.name}</h1>
                  )}
                  <ShieldCheck size={22} className="text-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-primary font-semibold">
                  <HeartPulse size={16} />
                  <span className="text-sm">Verified Healthcare Account</span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => isEdit ? updateUserProfileData() : setIsEdit(true)}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${
                    isEdit 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200 dark:shadow-none' 
                    : 'bg-slate-900 dark:bg-primary text-white hover:opacity-90 shadow-slate-200 dark:shadow-none'
                  }`}
                >
                  {loading ? <Loader2 className="animate-spin" size={18}/> : isEdit ? <><Check size={18}/> Save</> : <><Edit3 size={18}/> Edit</>}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              
              {/* Contact Details */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b dark:border-slate-800 pb-3">
                  <UserCircle className="text-primary" size={20}/>
                  <h3 className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Contact Information</h3>
                </div>

                <div className="space-y-6">
                  <InfoItem label="Email" icon={<Mail size={14}/>} value={userData.email} isEdit={false} />
                  <InfoItem 
                    label="Phone" 
                    icon={<Phone size={14}/>} 
                    value={userData.phone} 
                    isEdit={isEdit} 
                    onChange={(val) => setUserData(prev => ({...prev, phone: val}))} 
                  />
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <MapPin size={12} className="text-primary"/> Address
                    </label>
                    {isEdit ? (
                      <div className="space-y-2">
                        <input className="input-style" value={userData.address.line1} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} />
                        <input className="input-style" value={userData.address.line2} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} />
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-5 leading-relaxed">
                        {userData.address.line1}<br/>{userData.address.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Health & Personal */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b dark:border-slate-800 pb-3">
                  <HeartPulse className="text-rose-500" size={20}/>
                  <h3 className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Medical & Personal</h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                      {isEdit ? (
                        <select className="input-style" value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="badge-style">{userData.gender}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Droplets size={10} className="text-rose-500"/> Blood Group
                      </label>
                      {isEdit ? (
                        <input className="input-style" value={userData.bloodGroup} onChange={(e) => setUserData(prev => ({...prev, bloodGroup: e.target.value}))} />
                      ) : (
                        <p className="badge-style text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30">
                          {userData.bloodGroup || '--'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t dark:border-slate-700">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Cake size={10} className="text-primary"/> Date of Birth
                    </label>
                    {isEdit ? (
                      <input type="date" className="input-style" value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} />
                    ) : (
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{userData.dob || 'Not Provided'}</p>
                    )}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                  <div className="p-2 bg-white dark:bg-emerald-500 rounded-lg shadow-sm">
                    <ShieldCheck className="text-emerald-500 dark:text-white" size={18}/>
                  </div>
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Secure Medical Record Access
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Tailwind Component Layering */}
      <style>{`
        .input-style {
          width: 100%;
          padding: 0.6rem 0.8rem;
          background: white;
          border-radius: 0.75rem;
          border: 1px solid #E2E8F0;
          font-weight: 700;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .dark .input-style {
          background: #1E293B;
          border-color: #334155;
          color: white;
        }
        .input-style:focus {
          border-color: #5F6FFF;
          ring: 2px;
          ring-color: #5F6FFF;
        }
        .badge-style {
          font-weight: 800;
          color: #334155;
          font-size: 0.75rem;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #F1F5F9;
          text-align: center;
          text-transform: uppercase;
        }
        .dark .badge-style {
          background: #0F172A;
          border-color: #1E293B;
          color: #94A3B8;
        }
      `}</style>
    </div>
  );
};

// Reusable Sub-component
const InfoItem = ({ label, icon, value, isEdit, onChange }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
      <span className="text-primary">{icon}</span> {label}
    </label>
    {isEdit ? (
      <input 
        className="input-style"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-5 truncate">
        {value || 'Not set'}
      </p>
    )}
  </div>
);

export default MyProfile;