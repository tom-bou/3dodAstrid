import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const categories = [
  "Your profession",
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
  const [formData, setFormData] = useState({ ...initialData, newsletter: false });
  const [countryCode, setCountryCode] = useState('+46');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value
    }));
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) {
      return 'Name must only contain letters and spaces.';
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      return 'Phone number must only contain numbers.';
    }
    if (!emailRegex.test(formData.email)) {
      return 'Email must be in a valid format.';
    }
    if (Object.values(formData).some(value => value === '')) {
      return 'All fields are required. Please fill out all questions.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const fullPhoneNumber = `${countryCode}${formData.phoneNumber}`;
    const formattedPhoneNumber = fullPhoneNumber;

    const dataToSubmit = { ...formData, phoneNumber: fullPhoneNumber };

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

    try {
      // Send email
      await emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
        emailData,
        process.env.REACT_APP_USER_ID
      );
      console.log('Email sent successfully');

      // Save to Firestore
      await addDoc(collection(db, 'checkins'), dataToSubmit);
      console.log('Data saved to Firestore');

      setSuccess('Check-in successful and email sent.');
      setError('');
      onCheckInSubmit(dataToSubmit);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error during check-in:', error);
      setError('Error during check-in. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Check-In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="md:col-span-2">
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
        <div className="md:col-span-2">
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
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="flex">
            <input
              className="shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="countryCode"
              type="text"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              placeholder="+46"
            />
            <input
              className="shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Your phone number"
            />
          </div>
        </div>
        <div className="md:col-span-2">
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
        <div>
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
        <div>
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
        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workTitle">
            Profession
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
        <div className="md:col-span-2">
          <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="newsletter">
            <input
              className="form-checkbox h-4 w-4 text-blue-600"
              id="newsletter"
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">I want to subscribe to the newsletter</span>
          </label>
        </div>
        <div className="md:col-span-2 flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="md:col-span-2 text-gray-600 text-xs mt-2">
          By submitting this form, you consent to us handling your data in accordance with GDPR regulations.
        </div>
      </form>
    </div>
  );
}

export default CheckIn;
