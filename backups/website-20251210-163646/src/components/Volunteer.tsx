import React from 'react';
import { ArrowRight } from 'lucide-react';

const Volunteer = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-cyan-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
            
            {/* Illustration placeholder - in production this would be an actual illustration */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto"></div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-400 rounded-full mx-auto"></div>
                    <div className="w-10 h-10 bg-purple-400 rounded-full mx-auto"></div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Volunteer Network</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empower Change Through Volunteering
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our global community of volunteers making a lasting impact. 
                Whether you have an hour a week or a month to spare, there's a way for you to contribute meaningfully.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">Local Community Projects</h4>
                <p className="text-gray-600">Work directly with communities in your area on poverty reduction initiatives.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">Skills-Based Volunteering</h4>
                <p className="text-gray-600">Use your professional skills to support our programs from anywhere in the world.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">International Placements</h4>
                <p className="text-gray-600">Join long-term projects in developing communities across the globe.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center group transition-all">
                Become a volunteer
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                Volunteer opportunities
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;