import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { Calendar, Clock, Info, CheckCircle, ShieldCheck } from "lucide-react";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId);
    if (doc) setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    let allSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const isBooked = docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }
    if (!slotTime) return toast.warn("Please select a time slot");

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/bookAppointment",
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { if (doctors.length > 0) fetchDocInfo(); }, [doctors, docId]);
  useEffect(() => { if (docInfo) getAvailableSlots(); }, [docInfo]);
  useEffect(() => { setSlotTime(""); }, [docSlots]);

  if (!docInfo) return <div className="h-screen flex items-center justify-center dark:text-white">Loading professional profile...</div>;

  return (
    <div className="pb-20 transition-colors duration-300">
      {/* --- Doctor Header Card --- */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <div className="shrink-0">
          <img className="bg-primary w-full sm:max-w-72 rounded-2xl shadow-lg" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-20">
            <ShieldCheck size={120} className="text-primary" />
          </div>

          <div className="relative z-10">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900 dark:text-white">
              {docInfo.name}
              <img className="w-6" src={assets.verified_icon} alt="Verified" />
            </h1>
            
            <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-400 font-medium">
              <p>{docInfo.degree} — {docInfo.specialization}</p>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] rounded-full border dark:border-slate-700">
                {docInfo.experience} Experience
              </span>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider">
                <Info size={16} className="text-primary"/> Professional Bio
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{docInfo.about}</p>
            </div>

            <p className="mt-8 text-xl font-bold text-slate-900 dark:text-white">
              Consultation Fee: <span className="text-primary">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Booking Section --- */}
      <div className="sm:ml-80 mt-10">
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={20} className="text-primary" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Schedule Appointment</h3>
        </div>

        {/* Date Selector */}
        <div className="flex gap-4 items-center w-full overflow-x-auto pb-4 no-scrollbar">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`flex flex-col items-center justify-center min-w-[70px] py-5 rounded-2xl cursor-pointer transition-all border ${
                slotIndex === index 
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary"
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest mb-1">
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </p>
              <p className="text-lg font-bold">
                {item[0] && item[0].datetime.getDate()}
              </p>
            </div>
          ))}
        </div>

        {/* Time Selector */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-6 pb-2 no-scrollbar">
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all border whitespace-nowrap ${
                item.time === slotTime
                ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <Clock size={14} />
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-10 bg-primary hover:bg-indigo-700 text-white font-bold px-12 py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2"
        >
          <CheckCircle size={20} />
          Confirm Booking
        </button>
      </div>

      <div className="mt-20 border-t dark:border-slate-800 pt-10">
        <RelatedDoctors docId={docId} specialization={docInfo.specialization} />
      </div>
    </div>
  );
};

export default Appointment;