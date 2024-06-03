import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function CheckIn({ onCheckInSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData);
  const [countryCode, setCountryCode] = useState('+46');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPhoneNumber = `${countryCode}${formData.phoneNumber}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    if (phoneNumber) {
      onCheckInSubmit({ ...formData, phoneNumber: phoneNumber.formatInternational() });
    } else {
      onCheckInSubmit({ ...formData, phoneNumber: fullPhoneNumber });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Event Check-In</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded-l w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="countryCode"
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              placeholder="+46"
            />
            <input
              className="shadow appearance-none border rounded-r w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Your phone number"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            placeholder="Your country"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Your city"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workTitle">
            Work Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="workTitle"
            type="text"
            value={formData.workTitle}
            onChange={handleChange}
            placeholder="Your work title"
          />
        </div>
        <div className="flex items-center justify-between col-span-1 md:col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckIn;