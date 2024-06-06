import React from 'react';
import Select from 'react-select';

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

// Sample data extracted from the Excel file
const samples = [
  'Sample Box ASTRID',
  'Sample Collection Alba*',
  'Sample Collection Ancona',
  'Sample Collection Antwerpen',
  'Sample Collection Arlon Recycled',
  'Sample Collection Aruba Mano Morbida',
  'Sample Collection Avena',
  'Sample Collection Axel',
  'Sample Collection Bellaria',
  'Sample Collection Benita',
  'Sample Collection Beta*',
  'Sample Collection Bouclé*',
  'Sample Collection Campiglia',
  'Sample Collection Cartina',
  'Sample Collection Casale',
  'Sample Collection Cascia',
  'Sample Collection Castello',
  'Sample Collection Chamois',
  'Sample Collection Cima Recycled',
  'Sample Collection Cirrus',
  'Sample Collection Cocoon',
  'Sample Collection Como',
  'Sample Collection Conero Recycled',
  'Sample Collection Costera',
  'Sample Collection Cross',
  'Sample Collection Crudo*',
  'Sample Collection Cyclone',
  'Sample Collection Domino*',
  'Sample Collection Donna',
  'Sample Collection Dry',
  'Sample Collection Egna',
  'Sample Collection Elevation',
  'Sample Collection Escape',
  'Sample Collection Etamine',
  'Sample Collection Fantasy*',
  'Sample Collection Firefly*',
  'Sample Collection Fusion',
  'Sample Collection Genua',
  'Sample Collection Gilda',
  'Sample Collection Grimaldi',
  'Sample Collection Lario',
  'Sample Collection Latina',
  'Sample Collection Linda',
  'Sample Collection Linen Look',
  'Sample Collection Loano',
  'Sample Collection Lora',
  'Sample Collection Lykka',
  'Sample Collection Maestro*',
  'Sample Collection Mana',
  'Sample Collection Memento',
  'Sample Collection Natura',
  'Sample Collection Nizza*',
  'Sample Collection Norma',
  'Sample Collection Nypon*',
  'Sample Collection Olimpia',
  'Sample Collection Orelle*',
  'Sample Collection Pacino',
  'Sample Collection Pienza',
  'Sample Collection Recycle wool',
  'Sample Collection Retro',
  'Sample Collection Rhytm',
  'Sample Collection Ria*',
  'Sample Collection Riva',
  'Sample Collection Rodeo',
  'Sample Collection Rovigo',
  'Sample Collection San Siro',
  'Sample Collection Stella*',
  'Sample Collection Surf',
  'Sample Collection Svezia',
  'Sample Collection Tellus*',
  'Sample Collection Verona',
  'Sample Collection Villa'
].map(sample => ({ label: sample, value: sample }));

function Form({ formData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Textile Fair Registration</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4 md:col-span-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={formData.name}
            placeholder="Your name"
            readOnly
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
            placeholder="Your email"
            readOnly
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
              value={formData.countryCode}
              placeholder="+46"
              readOnly
            />
            <input
              className="shadow appearance-none border rounded-r w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              placeholder="Your phone number"
              readOnly
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
            placeholder="Your company"
            readOnly
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
            placeholder="Your country"
            readOnly
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
            placeholder="Your city"
            readOnly
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
            readOnly
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sample">
            Select Sample
          </label>
          <Select
            id="sample"
            options={samples}
            isClearable
            placeholder="Select a sample..."
          />
        </div>
        <div className="mb-4 md:col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="flex items-center justify-between md:col-span-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
