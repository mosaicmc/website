import React from 'react';
import { useTranslation } from 'react-i18next';

const Impact = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6646789/pexels-photo-6646789.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Community impact"
              className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
            />
            
            {/* Floating Impact Card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-lg p-8 shadow-xl border">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{t('impact.floatingCard.title')}</h4>
                <p className="text-gray-600">{t('impact.floatingCard.subtitle')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('impact.mainTitle')}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('impact.description')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('impact.features.community.title')}</h4>
                  <p className="text-gray-600">{t('impact.features.community.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('impact.features.longTerm.title')}</h4>
                  <p className="text-gray-600">{t('impact.features.longTerm.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('impact.features.transparency.title')}</h4>
                  <p className="text-gray-600">{t('impact.features.transparency.description')}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                {t('impact.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;