import React from 'react';

const Partnership = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working in partnership is the most effective way to take action. It's inclusive, sustainable, and cost-effective.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              "Working in partnership is the most effective way to take action. It's inclusive, sustainable, and cost-effective."
            </h3>
            <p className="text-gray-600">
              Together, we can achieve more than we ever could alone.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-60">
            {/* Partner logos - using placeholder colored blocks */}
            <div className="w-32 h-16 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Partner 1</span>
            </div>
            <div className="w-32 h-16 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Partner 2</span>
            </div>
            <div className="w-32 h-16 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Partner 3</span>
            </div>
            <div className="w-32 h-16 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">Partner 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;