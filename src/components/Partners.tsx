import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('partners.title')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('partners.description')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{t('partners.features.globalReach')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{t('partners.features.transparency')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{t('partners.features.sustainable')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center group transition-all">
                {t('partners.cta.donate')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                {t('partners.cta.learnMore')}
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6995252/pexels-photo-6995252.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t('partners.imageAlt')}
              className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
            />
            
            {/* Floating Impact Badge */}
            <div className="absolute -top-6 -right-6 bg-white rounded-lg p-6 shadow-xl border">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{t('partners.impactBadge.value')}</div>
                <div className="text-sm text-gray-600 font-medium">{t('partners.impactBadge.label')}</div>
                <div className="text-xs text-gray-500 mt-1">{t('partners.impactBadge.sublabel')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;