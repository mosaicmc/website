import React from 'react';
import { useTranslation } from 'react-i18next';

const Partnership = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('partnership.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partnership.description')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              "{t('partnership.quote')}"
            </h3>
            <p className="text-gray-600">
              {t('partnership.subtext')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-60">
            {/* Partner logos - using placeholder colored blocks */}
            <div className="w-32 h-16 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t('partnership.partner1')}</span>
            </div>
            <div className="w-32 h-16 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t('partnership.partner2')}</span>
            </div>
            <div className="w-32 h-16 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t('partnership.partner3')}</span>
            </div>
            <div className="w-32 h-16 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">{t('partnership.partner4')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;