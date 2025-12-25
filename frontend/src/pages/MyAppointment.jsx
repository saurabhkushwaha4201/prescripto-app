import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  // 1. Get the initial data from context, but store it in LOCAL state
  const { doctors } = useContext(AppContext);
  const [localAppointments, setLocalAppointments] = useState(doctors.slice(0, 3));

  // 2. States for Modal management
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState(null);

  // Triggered when user clicks "Cancel Appointment" button
  const handleOpenModal = (id) => {
    setTargetId(id);
    setShowModal(true);
  };

  // Triggered when user clicks "Yes, Cancel" inside the modal
  const confirmDeletion = () => {
    const updatedList = localAppointments.filter(item => item._id !== targetId);
    setLocalAppointments(updatedList);
    setShowModal(false);
    setTargetId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">My Appointments</h1>

      <div className="flex flex-col gap-6">
        {localAppointments.map((item, index) => (
          <div key={item._id || index} className="flex flex-col md:flex-row gap-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="shrink-0">
              <img className="w-40 h-40 object-cover rounded-xl bg-indigo-50" src={item.image} alt="" />
            </div>

            <div className="grow">
              <p className="text-xl font-bold text-gray-900">{item.name}</p>
              <p className="text-indigo-600 font-medium text-sm mb-3 uppercase tracking-wide">{item.speciality}</p>
              <div className="space-y-1">
                <p className="text-gray-700 font-semibold text-sm">Address:</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.address.line1}<br />{item.address.line2}</p>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-2 min-w-45">
              <button className="py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all">Pay Online</button>
              {/* BUTTON TO TRIGGER MODAL */}
              <button 
                onClick={() => handleOpenModal(item._id)}
                className="py-2.5 text-red-500 font-medium border border-red-100 rounded-lg hover:bg-red-50 transition-all"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL UI --- */}
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