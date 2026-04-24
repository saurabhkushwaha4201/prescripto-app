import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false);
  const [userData, setUserData] = useState(false);

  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
  // Toggle Function
  const toggleDarkMode = () => setIsDark(prev => !prev);

  // Effect to apply classes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const getDoctorsData = async()=>{
    try {
      const {data}  = await axios.get(backendUrl + '/api/doctor/list')
      if(data.success){
        setDoctors(data.doctors);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  const loadUserProfileData = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/getProfile',{headers:{Authorization: `Bearer ${token}`}});
      if(data.success){
        setUserData(data.userData);

      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token,setToken,backendUrl,
    userData,setUserData,loadUserProfileData,
    isDark,
    setIsDark,toggleDarkMode,

  };


  
  useEffect(()=>{
    getDoctorsData();
  },[])

  useEffect(()=>{
    if(token){
      loadUserProfileData();
    }else{
      setUserData(false);
    }
  },[token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;