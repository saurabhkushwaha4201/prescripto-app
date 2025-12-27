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
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const navigate = useNavigate();
  const slotDateFormate = (slotDate)=>{
    const dateArray = slotDate.split("-");
    return dateArray[0] + " " + months[Number(dateArray[1])-1] + ", " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { 
        headers: { token } 
      });
      if (data.success) {
        setAppointments(data.appointments);
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
        `${backendUrl}/api/user/appointments/${selectedAppointmentId}/cancel`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Appointment cancelled successfully');
        setAppointments(appointments.filter(a => a._id !== selectedAppointmentId));
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const cancelAppointment = async(appointmentId) => {
    try{
      console.log(appointmentId);
      const {data} = await axios.post(backendUrl + '/api/user/cancelAppointment',{appointmentId},{headers:{token}});
      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }
    }
    catch(error){
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Prescripto",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: function (response) {
        console.log(response);
        try {
          const {data} = axios.post(backendUrl + '/api/user/verifyPayment',response,{headers:{token}});
          if(data.success){
            toast.success("Payment successful");
            getUserAppointments();
            navigate('/myAppointments');  
          } else{
            toast.error("Payment verification failed");
          }

        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpayPayment = async(appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/paymentAppointment',{appointmentId},{headers:{token}});
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (appointments.length === 0) return <div className="text-center p-8 text-gray-500">No appointments found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">My Appointments</h1>

      <div className="flex flex-col gap-6">
        {appointments.map((item) => (
          <div key={item._id} className="flex flex-col md:flex-row gap-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="shrink-0">
              <img 
                className="w-40 h-40 object-cover rounded-xl bg-indigo-50" 
                src={item.docData.image} 
                alt={item.docData.name}
              />
            </div>

            <div className="grow">
              <p className="text-xl font-bold text-gray-900">{item.docData.name}</p>
              <p className="text-indigo-600 font-medium text-sm mb-3 uppercase tracking-wide">{item.docData.speciality}</p>
              <div className="space-y-1">
                <p className="text-gray-700 font-semibold text-sm">Address:</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.docData.address.line1}<br />{item.docData.address.line2}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-700">Date & Time:</span> {slotDateFormate(item.slotDate)} at {item.slotTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 min-w-45">
              {!item.cancelled && item.payment && (
                <button className='py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all'>
                  Payment Completed
                </button>
              )}
              { !item.cancelled && !item.payment && <button onClick={()=>appointmentRazorpayPayment(item._id)} className="py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all">
                Pay Online
              </button>}
              { !item.cancelled && <button 
                onClick={() => {handleOpenModal(item._id); cancelAppointment(item._id)}}
                className="py-2.5 text-red-500 font-medium border border-red-100 rounded-lg hover:bg-red-50 transition-all"
              >
                Cancel Appointment
              </button>}
              { item.cancelled && <span className=" sm:min-w-48 py-2 border border-red-500 rounded-text text-red-500 font-semibold">Appointment Cancelled</span>}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900">Are you sure?</h2>
            <p className="text-gray-500 mt-2">Do you really want to cancel this appointment? This cannot be undone.</p>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
              >
                No, Keep it
              </button>
              <button 
                onClick={confirmDeletion}
                className="flex-1 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
              >
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