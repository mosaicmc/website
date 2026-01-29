"use client";

import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocationFinder = () => {
  const { t } = useTranslation();

  const locations = [
    {
      name: t('locations.finder.items.charlestown.name'),
      address: t('locations.finder.items.charlestown.address'),
      phone: t('locations.finder.items.charlestown.phone')
    },
    {
      name: t('locations.finder.items.centralCoast.name'),
      address: t('locations.finder.items.centralCoast.address'),
      phone: t('locations.finder.items.centralCoast.phone')
    },
    {
      name: t('locations.finder.items.tamworth.name'),
      address: t('locations.finder.items.tamworth.address'),
      phone: t('locations.finder.items.tamworth.phone')
    },
    {
      name: t('locations.finder.items.armidale.name'),
      address: t('locations.finder.items.armidale.address'),
      phone: t('locations.finder.items.armidale.phone')
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('locations.finder.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-white/70">{t('locations.finder.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-transparent dark:border-slate-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{location.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-white/70">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="hover:text-blue-600 dark:hover:text-sky">
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
