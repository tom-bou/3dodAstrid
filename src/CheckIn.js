import React, { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import emailjs from 'emailjs-com';

const categories = [
  "Architect",
  "Priority Architect",
  "Store",
  "Designer/Scenographer/Set Designer/Artist",
  "Interior Studio",
  "Hotel",
  "Media",
  "Furniture Manufacturer",
  "Representative",
  "School",
  "Sewing Studio",
  "Upholsterer",
  "Sewing Procurement",
  "Interior Procurement",
  "Reseller",
  "Interior Studio Reseller",
  "Sewing Studio Reseller",
  "Upholsterer Reseller",
  "Other"
];

function CheckIn({ onCheckInSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData);
  const [countryCode, setCountryCode] = useState('+46');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log("Service ID:", process.env.REACT_APP_EMAIL_JS_SERVICE_ID);
    console.log("Template ID:", process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID);
    console.log("Public Key:", process.env.REACT_APP_API_PUBLIC_KEY);
    console.log("User ID:", process.env.REACT_APP_USER_ID);
  }, []);

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
    if (Object.values(formData).some(value => !value)) {
      setError('All fields are required. Please fill out all questions.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${formData.phoneNumber}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    const formattedPhoneNumber = phoneNumber ? phoneNumber.formatInternational() : fullPhoneNumber;

    const dataToSubmit = { ...formData, phoneNumber: formattedPhoneNumber };

    const emailData = {
      to_name: formData.name,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      country: formData.country,
      city: formData.city,
      workTitle: formData.workTitle,
      phoneNumber: formattedPhoneNumber
    };

    emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
      emailData,
      process.env.REACT_APP_USER_ID // The user ID (public key) is used here
    )
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setSuccess('Email sent successfully.');
        setError('');
        onCheckInSubmit(dataToSubmit);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setError('Error sending email. Please try again.');
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Event Check-In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4 md:col-span-1">
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
        <div className="mb-4 md:col-span-1">
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
        <div className="mb-4 md:col-span-2">
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
        <div className="mb-4 md:col-span-1">
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
        <div className="mb-4 md:col-span-1">
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
        <div className="mb-4 md:col-span-1">
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
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workTitle">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="workTitle"
            value={formData.workTitle}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between md:col-span-2">
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
