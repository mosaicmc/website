import React from 'react';
import { Users, Heart, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Glass morphism background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-sky animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">About Mosaic Multicultural Connections</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              For over 40 years, we've been dedicated to supporting diverse communities across NSW, 
              helping families build new lives while celebrating their cultural heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Premium Glass Design */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Mission</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To empower multicultural communities across NSW by providing culturally appropriate support services 
                  that promote independence, wellbeing, and social inclusion.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We believe that diversity strengthens our communities, and every person deserves the opportunity 
                  to thrive while maintaining their cultural identity.
                </p>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sky rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Cultural Respect</h4>
                    <p className="text-gray-600 dark:text-gray-300">Honoring and celebrating cultural diversity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-earth rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Empowerment</h4>
                    <p className="text-gray-600 dark:text-gray-300">Building capacity and independence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-leaf rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Inclusion</h4>
                    <p className="text-gray-600 dark:text-gray-300">Creating welcoming, accessible services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-sun rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Excellence</h4>
                    <p className="text-gray-600 dark:text-gray-300">Delivering high-quality, professional services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History - Enhanced Glass Timeline */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-earth animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Our Journey</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Four Decades of Service</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to regional leadership in multicultural support services.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                year: "1983",
                title: "Foundation",
                description: "Mosaic Multicultural Connections was established to support the growing multicultural communities in the Hunter Region, starting with basic settlement services.",
                color: "ocean"
              },
              {
                year: "1995",
                title: "Expansion",
                description: "Expanded services to include aged care and family support programs, recognizing the diverse needs of our growing community.",
                color: "sky"
              },
              {
                year: "2010",
                title: "Regional Growth",
                description: "Opened additional offices across Central Coast, Lake Macquarie, and broader Hunter Region to better serve communities.",
                color: "earth"
              },
              {
                year: "2024",
                title: "Innovation & Excellence",
                description: "Continuing to innovate our services with digital solutions, expanded language support, and community-led programs that address emerging needs.",
                color: "leaf"
              }
            ].map((milestone, index) => (
              <div key={index} className="flex items-center space-x-8">
                <div className={`w-24 h-24 ${milestone.color === 'ocean' ? 'bg-ocean' : milestone.color === 'sky' ? 'bg-sky' : milestone.color === 'earth' ? 'bg-earth' : 'bg-leaf'} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <span className="text-white font-bold text-xl">{milestone.year}</span>
                </div>
                <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-xl p-6 border border-white/50 dark:border-white/20 shadow-2xl flex-1 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Leadership - Premium Glass Cards */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className="mr-2 h-2 w-2 rounded-full bg-leaf animate-pulse"></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">Leadership</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced professionals committed to serving multicultural communities with passion and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Chief Executive Officer",
                background: "20+ years in multicultural services",
                image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Ahmed Hassan",
                role: "Director of Settlement Services",
                background: "Former refugee, community advocate",
                image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
              },
              {
                name: "Maria Santos",
                role: "Director of Aged Care",
                background: "Registered nurse, cultural competency expert",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
              }
            ].map((member, index) => (
              <div key={index} className="group backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-8 text-center border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-white/15">
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-6 border-4 border-white dark:border-slate-700 shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-sky font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.background}</p>
                </div>

                {/* Subtle top accent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r from-sky to-sky/80 opacity-60"></div>
                
                {/* Corner glow effect */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sky opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;