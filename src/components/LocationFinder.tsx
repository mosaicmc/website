import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const LocationFinder = () => {
  const locations = [
    {
      name: "Central Coast",
      address: "123 Mann Street, Gosford NSW 2250",
      phone: "(02) 4323 7333"
    },
    {
      name: "Newcastle",
      address: "456 Hunter Street, Newcastle NSW 2300",
      phone: "(02) 4926 1300"
    },
    {
      name: "Lake Macquarie",
      address: "789 Pacific Highway, Charlestown NSW 2290",
      phone: "(02) 4943 8888"
    },
    {
      name: "Hunter Region",
      address: "321 High Street, Maitland NSW 2320",
      phone: "(02) 4933 6666"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
          <p className="text-lg text-gray-600">Find your nearest office</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">{location.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="hover:text-blue-600">
                    {location.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationFinder;