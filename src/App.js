import React, { useState } from 'react';
import Form from './Form';
import CheckIn from './CheckIn';
import Navbar from './Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('checkin');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    city: '',
    workTitle: '',
    email: '',
    phoneNumber: ''
  });

  const handleCheckInSubmit = (data) => {
    setFormData(data);
    setCurrentPage('registration');
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center relative">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="https://api.astrid.se/wp-content/uploads/2023/01/Astrid_Vittoria.mp4"
          autoPlay
          loop
          muted
          poster="https://api.astrid.se/wp-content/uploads/2023/01/Stillbild_film.jpg"
        />
        <div className="relative z-10 w-full max-w-md p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
          {currentPage === 'checkin' ? (
            <CheckIn onCheckInSubmit={handleCheckInSubmit} initialData={formData} />
          ) : (
            <Form formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;