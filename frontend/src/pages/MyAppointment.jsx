import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("-");
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + '/api/user/getAppointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse()); // Show latest first
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const confirmDeletion = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancelAppointment`,
        { appointmentId: selectedAppointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success('Appointment cancelled');
        getUserAppointments();
        getDoctorsData();
        setShowModal(false);
      }
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const appointmentRazorpayPayment = async (appointmentId) => {
    try {
      const { data: order } = await axios.post(backendUrl + '/api/user/paymentAppointment', { appointmentId }, { headers: { Authorization: `Bearer ${token}` } });
      initPay(order);
    } catch (error) {
      toast.error("Payment initialization failed");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Prescripto",
      description: "Appointment Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyPayment', response, { headers: { Authorization: `Bearer ${token}` } });
          if (data.success) {
            toast.success("Payment successful");
            getUserAppointments();
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  if (loading) return <div className="flex justify-center items-center h-64 text-primary font-medium">Loading appointments...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b dark:border-slate-700 pb-4">
        My Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed dark:border-slate-700">
           <p className="text-gray-500 dark:text-slate-400">You have no upcoming appointments.</p>
           <button onClick={()=>navigate('/doctors')} className="mt-4 text-primary hover:underline font-medium">Book your first appointment</button>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-center gap-6 p-5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              
              {/* Doctor Image */}
              <div className="shrink-0 group overflow-hidden rounded-xl">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 object-cover bg-indigo-50 dark:bg-slate-700 group-hover:scale-105 transition-transform"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.docData.name}</p>
                <p className="text-primary font-semibold text-sm mb-3">{item.docData.specialization}</p>
                
                <div className="space-y-1.5 text-sm">
                  <p className="text-gray-500 dark:text-slate-400">
                    <span className="font-semibold text-gray-700 dark:text-slate-200">Address: </span>
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>
                  <p className="text-gray-500 dark:text-slate-400">
                    <span className="font-semibold text-gray-700 dark:text-slate-200">Date & Time: </span> 
                    {slotDateFormate(item.slotDate)} | <span className="text-primary dark:text-indigo-400 font-medium">{item.slotTime}</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 w-full md:w-52">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="w-full py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-lg border border-emerald-100 dark:border-emerald-800 cursor-default">
                    ✓ Paid
                  </button>
                )}
                
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button onClick={() => appointmentRazorpayPayment(item._id)} className="w-full py-2.5 bg-primary hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20">
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => handleOpenModal(item._id)}
                    className="w-full py-2.5 text-gray-500 dark:text-slate-400 font-medium border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="w-full py-2.5 bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/30 rounded-lg cursor-not-allowed">
                    Cancelled
                  </button>
                )}

                {item.isCompleted && (
                  <button className="w-full py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-100 dark:border-blue-800 rounded-lg cursor-default">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div onClick={() => setShowModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl border dark:border-slate-700">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">Cancel Appointment?</h2>
            <p className="text-gray-500 dark:text-slate-400 mt-2 text-center text-sm">This action cannot be undone. The slot will be released to other patients.</p>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 text-gray-600 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-all font-medium">
                Keep it
              </button>
              <button onClick={confirmDeletion} className="flex-1 py-2.5 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all font-bold">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;