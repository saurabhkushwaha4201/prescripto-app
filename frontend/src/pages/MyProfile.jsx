import React, { useState, useRef, useContext } from "react";
import {
  Camera, Mail, Phone, MapPin, User, Cake,
  ShieldCheck, HeartPulse, Edit3, Check, X, Loader2
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false); // Stores the actual File object
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { userData, setUserData, backendUrl, loadUserProfileData, token } = useContext(AppContext);

  // Profile Update Logic
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

      if (image) {
        formData.append('image', image);
      }

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
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Backend ke liye file save ki
      // UI Preview ke liye FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-white">
          
          {/* Top Banner */}
          <div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute top-6 right-8">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
                Patient ID: {userData._id ? userData._id.slice(-6).toUpperCase() : 'N/A'}
              </span>
            </div>
          </div>

          <div className="px-6 md:px-12 pb-12">
            <div className="flex flex-wrap flex-col md:flex-row items-center md:items-end gap-6 -mt-20 relative z-10">
              
              {/* Profile Image Section */}
              <div className="relative group shrink-0">
                <div className="w-40 h-40 rounded-3xl overflow-hidden ring-8 ring-white shadow-xl bg-white">
                  <img src={userData.image} className="w-full h-full object-cover" alt="Profile" />
                </div>
                {isEdit && (
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute inset-0 bg-blue-600/70 rounded-3xl flex flex-col items-center justify-center text-white transition-all duration-300"
                  >
                    <Camera size={28} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Change</span>
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
              </div>

              {/* Name Section */}
              <div className="flex-1 text-center md:text-left min-w-0">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  {isEdit ? (
                    <input 
                      className="text-2xl md:text-3xl font-black text-slate-800 border-b-2 border-blue-500 outline-none bg-blue-50/50 px-2 rounded-t-lg w-full max-w-sm"
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
                    />
                  ) : (
                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight truncate">{userData.name}</h1>
                  )}
                  <ShieldCheck size={24} className="text-emerald-500 shrink-0" />
                </div>
                <p className="text-blue-600 font-bold text-lg flex items-center justify-center md:justify-start gap-2 mt-1">
                  <HeartPulse size={18} /> Verified Patient
                </p>
              </div>

              {/* Action Button */}
              <div className="w-full md:w-auto flex justify-center md:justify-end mt-4 md:mt-0">
                <button 
                  disabled={loading}
                  onClick={() => isEdit ? updateUserProfileData() : setIsEdit(true)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 whitespace-nowrap ${
                    isEdit 
                    ? 'bg-emerald-500 text-white shadow-emerald-100 hover:bg-emerald-600' 
                    : 'bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800'
                  } disabled:opacity-70`}
                >
                  {loading ? <Loader2 className="animate-spin" size={18}/> : isEdit ? <><Check size={18} /> Save Changes</> : <><Edit3 size={18} /> Edit Profile</>}
                </button>
              </div>
            </div>

            <hr className="my-10 border-slate-100" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Contact Info */}
              <div className="space-y-6">
                <SectionTitle color="bg-blue-500" title="Contact Information" />
                <div className="space-y-5">
                  <EditableField label="Email Address" icon={<Mail size={16}/>} value={userData.email} isEdit={false} />
                  <EditableField label="Phone Number" icon={<Phone size={16}/>} value={userData.phone} isEdit={isEdit} 
                    onChange={(val) => setUserData(prev => ({...prev, phone: val}))} />
                  
                  <div className="space-y-2">
                    <FieldLabel icon={<MapPin size={14} className="text-blue-500" />} label="Address" />
                    {isEdit ? (
                      <div className="space-y-2">
                        <input className="edit-input" value={userData.address.line1} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} />
                        <input className="edit-input" value={userData.address.line2} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} />
                      </div>
                    ) : (
                      <p className="font-bold text-slate-700 text-sm pl-6 leading-relaxed">
                        {userData.address.line1}, <br/> {userData.address.line2}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-6">
                <SectionTitle color="bg-indigo-500" title="Basic Information" />
                <div className="p-6 bg-slate-50/50 rounded-4xl border border-slate-100 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <FieldLabel label="Gender" />
                      {isEdit ? (
                        <select className="edit-input py-2" value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="display-tag">{userData.gender}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <FieldLabel icon={<HeartPulse size={12} className="text-rose-500" />} label="Blood Group" />
                      {isEdit ? (
                        <input className="edit-input py-2" value={userData.bloodGroup} onChange={(e) => setUserData(prev => ({...prev, bloodGroup: e.target.value}))} />
                      ) : (
                        <p className="display-tag text-rose-600 bg-rose-50 border-rose-100">{userData.bloodGroup || 'N/A'}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/50">
                    <FieldLabel icon={<Cake size={12} className="text-blue-500" />} label="Birthday" />
                    {isEdit ? (
                      <input type="date" className="edit-input" value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} />
                    ) : (
                      <p className="font-bold text-slate-700 text-sm pt-1">{userData.dob || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                   <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm shrink-0"><ShieldCheck size={18}/></div>
                   <p className="text-[11px] font-bold text-blue-700 leading-tight">Your medical data is encrypted and secure with 256-bit SSL technology.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Global CSS for reusability */}
      <style dangerouslySetInnerHTML={{ __html: `
        .edit-input { width: 100%; padding: 0.75rem; background: white; border-radius: 0.75rem; border: 1px solid #E2E8F0; outline: none; font-weight: 700; font-size: 0.875rem; transition: all 0.2s; }
        .edit-input:focus { border-color: #3B82F6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        .display-tag { font-weight: 700; color: #334155; font-size: 0.875rem; background: white; display: inline-block; padding: 0.375rem 1rem; border-radius: 0.5rem; border: 1px solid #F1F5F9; box-shadow: 0 1px 2px rgba(0,0,0,0.05); width: 100%; text-align: center; }
      `}} />
    </div>
  );
};

// Helper Components
const SectionTitle = ({ color, title }) => (
  <div className="flex items-center gap-2 mb-2">
    <div className={`w-1.5 h-5 ${color} rounded-full`}></div>
    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{title}</h3>
  </div>
);

const FieldLabel = ({ icon, label }) => (
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-1">
    {icon} {label}
  </label>
);

const EditableField = ({ label, icon, value, isEdit, onChange }) => (
  <div className="space-y-2">
    <FieldLabel icon={<span className="text-blue-500">{icon}</span>} label={label} />
    {isEdit ? (
      <input 
        className="w-full p-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-blue-100 outline-none font-bold text-sm text-slate-700 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <p className="font-bold text-slate-700 text-sm pl-6 truncate">{value || 'N/A'}</p>
    )}
  </div>
);

export default MyProfile;