import React from 'react';
import { Heart, Phone, FileText, ArrowRight, CheckCircle, Users, Home, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Team05 from '../../components/ui/team-05';

const AgedCarePage = () => {
  const teamMembers = [
    {
      name: "Maria Santos",
      role: "Aged Care Director",
      qualifications: "Registered nurse, Cultural competency expert, Aged care management specialist",
      languages: ["English", "Spanish", "Tagalog"],
      phone: "(02) 4926 1401",
      email: "m.santos@mosaicmc.org.au"
    },
    {
      name: "Li Wei Chen",
      role: "Senior Care Coordinator",
      qualifications: "Bachelor's Nursing, Gerontology specialist, Multicultural aged care expert",
      languages: ["English", "Mandarin", "Cantonese"],
      phone: "(02) 4926 1402",
      email: "l.chen@mosaicmc.org.au"
    },
    {
      name: "Giuseppe Romano",
      role: "Cultural Care Worker",
      qualifications: "Certificate IV Aged Care, Italian cultural liaison, Family support specialist",
      languages: ["English", "Italian", "Sicilian"],
      phone: "(02) 4926 1403",
      email: "g.romano@mosaicmc.org.au"
    },
    {
      name: "Fatima Al-Zahra",
      role: "Home Care Coordinator",
      qualifications: "Community Services qualifications, Home care packages specialist",
      languages: ["English", "Arabic", "Farsi"],
      phone: "(02) 4926 1404",
      email: "f.alzahra@mosaicmc.org.au"
    },
    {
      name: "Elena Papadopoulos",
      role: "Family Liaison Officer",
      qualifications: "Social Work degree, Family counseling, Aged care advocacy",
      languages: ["English", "Greek", "Macedonian"],
      phone: "(02) 4926 1405",
      email: "e.papadopoulos@mosaicmc.org.au"
    },
    {
      name: "Raj Patel",
      role: "Cultural Activities Coordinator",
      qualifications: "Recreation therapy background, Cultural program development",
      languages: ["English", "Hindi", "Gujarati"],
      phone: "(02) 4926 1406",
      email: "r.patel@mosaicmc.org.au"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section with enhanced animations */}
      <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-colors duration-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl dark:bg-blue-500/20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6 animate-fade-in-down">
              <Heart className="mr-2 h-4 w-4 text-earth" />
              <span className="text-gray-700 dark:text-white/90 font-medium">Aged Care Services</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fade-in-up">Culturally Appropriate Aged Care</h1>
            <p className="text-xl text-gray-700 dark:text-gray-100 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Honoring traditions and providing comfort in familiar languages while delivering professional aged care services.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/50 to-indigo-100/30 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-indigo-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Aged Care Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Home Care Packages",
                  description: "Levels 1-4 home care packages tailored to individual needs",
                  icon: <Home className="h-6 w-6" />
                },
                {
                  title: "Personal Care",
                  description: "Assistance with daily living activities and personal hygiene",
                  icon: <Heart className="h-6 w-6" />
                },
                {
                  title: "Cultural Activities",
                  description: "Programs that celebrate and maintain cultural connections",
                  icon: <Users className="h-6 w-6" />
                },
                {
                  title: "Multilingual Staff",
                  description: "Care workers who speak your language and understand your culture",
                  icon: <CheckCircle className="h-6 w-6" />
                },
                {
                  title: "Family Support",
                  description: "Education and support for family members and caregivers",
                  icon: <Users className="h-6 w-6" />
                },
                {
                  title: "Respite Care",
                  description: "Temporary care services to give family caregivers a break",
                  icon: <Clock className="h-6 w-6" />
                }
              ].map((service, index) => (
                <div key={index} className="backdrop-blur-md bg-white/50 dark:bg-white/5 rounded-lg p-6 border border-white/30 dark:border-white/10 hover:shadow-lg transition-all duration-300 group hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-earth rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-earth transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-100">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Process with enhanced animations */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Who Can Access Our Services?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-earth mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Seniors from multicultural backgrounds requiring aged care support</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-earth mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">People with approved home care packages</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-earth mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Families seeking culturally appropriate care options</span>
                </div>
                <div className="flex items-start space-x-3 group">
                  <CheckCircle className="h-5 w-5 text-earth mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-700 dark:text-gray-100">Individuals requiring respite care services</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Getting Started</h2>
              <div className="space-y-6">
                {[
                  { step: "1", title: "Initial Consultation", description: "Discuss your needs and cultural preferences" },
                  { step: "2", title: "Care Assessment", description: "Comprehensive assessment of care requirements" },
                  { step: "3", title: "Care Plan Development", description: "Create a personalized, culturally appropriate care plan" },
                  { step: "4", title: "Service Delivery", description: "Begin receiving care from our trained multicultural staff" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-8 h-8 bg-earth rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-earth transition-colors">{item.title}</h3>
                      <p className="text-gray-700 dark:text-gray-100">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team05
        title="Meet Your Aged Care Team"
        description="Our aged care team combines professional nursing expertise with deep cultural understanding. Each team member is trained in culturally appropriate care delivery and speaks multiple languages to ensure your comfort and dignity are maintained throughout your care journey."
        teamMembers={teamMembers}
        accentColor="earth"
        bottomSection={{
          title: "Culturally Sensitive Care Approach",
          description: "Our team understands that quality aged care goes beyond medical needs. We honor cultural traditions, dietary requirements, religious practices, and family dynamics while delivering professional care services. Our multilingual staff and cultural competency training ensure every client receives care that respects their heritage and values."
        }}
      />

      {/* Contact CTA with enhanced animations */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-blue-500/20 dark:from-slate-900/50 dark:to-blue-900/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl dark:bg-purple-500/20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-white/10 rounded-2xl p-12 border border-white/50 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 group-hover:scale-105 transition-transform duration-300">Discuss Your Care Needs</h2>
            <p className="text-xl text-gray-700 dark:text-gray-100 mb-8 max-w-3xl mx-auto">
              Our experienced aged care team understands the importance of cultural sensitivity in care delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0249261300"
                className="bg-gradient-to-r from-earth to-earth/90 hover:from-earth/90 hover:to-earth text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg hover:shadow-earth/25"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (02) 4926 1300
              </a>
              <Link
                to="/contact"
                className="border-2 border-earth text-earth hover:bg-earth hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center hover:scale-105"
              >
                Contact Us Online
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgedCarePage;